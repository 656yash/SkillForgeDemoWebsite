import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  QueryConstraint,
} from 'firebase/firestore';

// Admin KPI Data Interface
export interface AdminKPIData {
  totalUsers: number;
  totalEnrollments: number;
  totalRevenue: number;
  totalCourses: number;
  mostViewedCourse: { courseId: string; courseName: string; views: number } | null;
  mostPurchasedCourse: { courseId: string; courseName: string; purchases: number } | null;
  monthlyRevenue: number;
  monthlyEnrollments: number;
  averageStudentProgress: number;
  completedCourses: number;
}

// Get total unique users count
export async function getTotalUsers(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching total users:', error);
    return 0;
  }
}

// Get total enrollments
export async function getTotalEnrollments(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'enrollments'),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching total enrollments:', error);
    return 0;
  }
}

// Get total revenue (all completed payments)
export async function getTotalRevenue(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'payments'),
      where('paymentStatus', '==', 'completed')
    );
    const querySnapshot = await getDocs(q);
    let totalRevenue = 0;
    
    querySnapshot.forEach((doc) => {
      totalRevenue += doc.data().amount || 0;
    });

    return totalRevenue;
  } catch (error) {
    console.error('[v0] Error fetching total revenue:', error);
    return 0;
  }
}

// Get monthly revenue
export async function getMonthlyRevenue(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const querySnapshot = await getDocs(collection(db, 'payments'));
    let monthlyRevenue = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.paymentStatus === 'completed') {
        const createdAt = data.createdAt?.toDate?.() || new Date(data.createdAt);
        if (createdAt >= monthStart) {
          monthlyRevenue += data.amount || 0;
        }
      }
    });

    return monthlyRevenue;
  } catch (error) {
    console.error('[v0] Error fetching monthly revenue:', error);
    return 0;
  }
}

// Get monthly enrollments
export async function getMonthlyEnrollments(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const querySnapshot = await getDocs(collection(db, 'enrollments'));
    let monthlyEnrollments = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'active') {
        const enrolledAt = data.enrolledAt?.toDate?.() || new Date(data.enrolledAt);
        if (enrolledAt >= monthStart) {
          monthlyEnrollments += 1;
        }
      }
    });

    return monthlyEnrollments;
  } catch (error) {
    console.error('[v0] Error fetching monthly enrollments:', error);
    return 0;
  }
}

// Get most viewed course
export async function getMostViewedCourse(): Promise<{ courseId: string; courseName: string; views: number } | null> {
  // This would typically be tracked via analytics
  // For now, return the course with the most enrollments
  try {
    const querySnapshot = await getDocs(collection(db, 'enrollments'));
    const courseViews: Record<string, { courseId: string; courseName: string; count: number }> = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!courseViews[data.courseId]) {
        courseViews[data.courseId] = {
          courseId: data.courseId,
          courseName: data.courseName,
          count: 0,
        };
      }
      courseViews[data.courseId].count += 1;
    });

    let mostViewed: { courseId: string; courseName: string; views: number } | null = null;
    let maxViews = 0;
    
    Object.values(courseViews).forEach((course) => {
      if (course.count > maxViews) {
        maxViews = course.count;
        mostViewed = {
          courseId: course.courseId,
          courseName: course.courseName,
          views: course.count,
        };
      }
    });

    return mostViewed;
  } catch (error) {
    console.error('[v0] Error fetching most viewed course:', error);
    return null;
  }
}

// Get most purchased course
export async function getMostPurchasedCourse(): Promise<{ courseId: string; courseName: string; purchases: number } | null> {
  try {
    const q = query(
      collection(db, 'payments'),
      where('paymentStatus', '==', 'completed')
    );
    const querySnapshot = await getDocs(q);
    const coursePurchases: Record<string, { courseId: string; courseName: string; count: number }> = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!coursePurchases[data.courseId]) {
        coursePurchases[data.courseId] = {
          courseId: data.courseId,
          courseName: data.courseName,
          count: 0,
        };
      }
      coursePurchases[data.courseId].count += 1;
    });

    let mostPurchased: { courseId: string; courseName: string; purchases: number } | null = null;
    let maxPurchases = 0;
    
    Object.values(coursePurchases).forEach((course) => {
      if (course.count > maxPurchases) {
        maxPurchases = course.count;
        mostPurchased = {
          courseId: course.courseId,
          courseName: course.courseName,
          purchases: course.count,
        };
      }
    });

    return mostPurchased;
  } catch (error) {
    console.error('[v0] Error fetching most purchased course:', error);
    return null;
  }
}

// Get average student progress
export async function getAverageStudentProgress(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'progress'));
    if (querySnapshot.size === 0) return 0;
    
    let totalProgress = 0;
    querySnapshot.forEach((doc) => {
      totalProgress += doc.data().progressPercentage || 0;
    });

    return Math.round(totalProgress / querySnapshot.size);
  } catch (error) {
    console.error('[v0] Error calculating average student progress:', error);
    return 0;
  }
}

// Get completed courses count
export async function getTotalCompletedCourses(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'progress'),
      where('completed', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching completed courses count:', error);
    return 0;
  }
}

// Get all KPI data at once
export async function getAllKPIData(): Promise<AdminKPIData> {
  return {
    totalUsers: await getTotalUsers(),
    totalEnrollments: await getTotalEnrollments(),
    totalRevenue: await getTotalRevenue(),
    totalCourses: 0, // This would be fetched from a courses collection if it exists
    mostViewedCourse: await getMostViewedCourse(),
    mostPurchasedCourse: await getMostPurchasedCourse(),
    monthlyRevenue: await getMonthlyRevenue(),
    monthlyEnrollments: await getMonthlyEnrollments(),
    averageStudentProgress: await getAverageStudentProgress(),
    completedCourses: await getTotalCompletedCourses(),
  };
}
