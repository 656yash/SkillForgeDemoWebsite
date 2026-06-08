import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore';

// Course Enrollment Interface
export interface CourseEnrollment {
  id?: string;
  userId: string;
  userEmail: string;
  courseId: string;
  courseName: string;
  price: number;
  enrolledAt: Timestamp | Date;
  status: 'active' | 'completed' | 'cancelled';
}

// Check if user is already enrolled in a course
export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return false;
  }

  try {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId),
      where('courseId', '==', courseId),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('[v0] Error checking enrollment:', error);
    return false;
  }
}

// Create course enrollment
export async function enrollCourse(
  userId: string,
  userEmail: string,
  courseId: string,
  courseName: string,
  price: number
): Promise<string | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    // Check for duplicate enrollment
    const alreadyEnrolled = await isUserEnrolled(userId, courseId);
    if (alreadyEnrolled) {
      throw new Error('User is already enrolled in this course');
    }

    // Create enrollment record
    const enrollment: CourseEnrollment = {
      userId,
      userEmail,
      courseId,
      courseName,
      price,
      enrolledAt: serverTimestamp() as any,
      status: 'active',
    };

    const docRef = await addDoc(collection(db, 'enrollments'), enrollment);
    console.log('[v0] Course enrollment created:', docRef.id);

    // Update user's enrolled courses count and total spent
    await updateDoc(doc(db, 'users', userId), {
      enrolledCourses: increment(1),
      totalSpent: increment(price),
    });

    return docRef.id;
  } catch (error) {
    console.error('[v0] Error enrolling course:', error);
    throw error;
  }
}

// Get user's enrolled courses
export async function getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return [];
  }

  try {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    const enrollments: CourseEnrollment[] = [];
    
    querySnapshot.forEach((doc) => {
      enrollments.push({
        id: doc.id,
        ...doc.data(),
      } as CourseEnrollment);
    });

    return enrollments;
  } catch (error) {
    console.error('[v0] Error fetching user enrollments:', error);
    return [];
  }
}

// Get course enrollment count (total students enrolled)
export async function getCourseEnrollmentCount(courseId: string): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'enrollments'),
      where('courseId', '==', courseId),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching enrollment count:', error);
    return 0;
  }
}
