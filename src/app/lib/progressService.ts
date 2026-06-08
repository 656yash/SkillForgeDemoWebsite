import { db } from './firebase';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Course Progress Interface
export interface CourseProgress {
  id?: string;
  userId: string;
  courseId: string;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: Timestamp | Date;
  completed: boolean;
  completedAt?: Timestamp | Date;
}

// Initialize or get course progress
export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress | null> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return null;
  }

  try {
    const progressId = `${userId}_${courseId}`;
    const progressDoc = await getDoc(doc(db, 'progress', progressId));
    
    if (progressDoc.exists()) {
      return {
        id: progressDoc.id,
        ...progressDoc.data(),
      } as CourseProgress;
    }
    
    return null;
  } catch (error) {
    console.error('[v0] Error fetching course progress:', error);
    return null;
  }
}

// Create or update course progress
export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progressPercentage: number,
  completedLessons: number = 0,
  totalLessons: number = 0
): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    const progressId = `${userId}_${courseId}`;
    const isCompleted = progressPercentage >= 100;

    const progressData: Partial<CourseProgress> = {
      userId,
      courseId,
      progressPercentage,
      completedLessons,
      totalLessons: totalLessons || completedLessons,
      lastAccessed: serverTimestamp() as any,
      completed: isCompleted,
    };

    if (isCompleted) {
      progressData.completedAt = serverTimestamp() as any;
    }

    // Use setDoc with merge to create or update
    await setDoc(doc(db, 'progress', progressId), progressData, { merge: true });
    console.log('[v0] Course progress updated:', progressId);
  } catch (error) {
    console.error('[v0] Error updating course progress:', error);
    throw error;
  }
}

// Get all courses progress for a user
export async function getUserAllCourseProgress(userId: string): Promise<CourseProgress[]> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return [];
  }

  try {
    const q = query(
      collection(db, 'progress'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const progressList: CourseProgress[] = [];
    
    querySnapshot.forEach((doc) => {
      progressList.push({
        id: doc.id,
        ...doc.data(),
      } as CourseProgress);
    });

    return progressList;
  } catch (error) {
    console.error('[v0] Error fetching user progress:', error);
    return [];
  }
}

// Get completed courses for a user
export async function getUserCompletedCourses(userId: string): Promise<CourseProgress[]> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return [];
  }

  try {
    const q = query(
      collection(db, 'progress'),
      where('userId', '==', userId),
      where('completed', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const completedCourses: CourseProgress[] = [];
    
    querySnapshot.forEach((doc) => {
      completedCourses.push({
        id: doc.id,
        ...doc.data(),
      } as CourseProgress);
    });

    return completedCourses;
  } catch (error) {
    console.error('[v0] Error fetching completed courses:', error);
    return [];
  }
}

// Calculate average progress for a user
export async function getUserAverageProgress(userId: string): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const progressList = await getUserAllCourseProgress(userId);
    if (progressList.length === 0) return 0;
    
    const totalProgress = progressList.reduce((sum, p) => sum + p.progressPercentage, 0);
    return Math.round(totalProgress / progressList.length);
  } catch (error) {
    console.error('[v0] Error calculating average progress:', error);
    return 0;
  }
}
