import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// Validate that we have required Firebase config
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'] as const;
const missingFields = requiredFields.filter((field) => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error(
    '[v0] Firebase configuration is incomplete. Missing fields:',
    missingFields.join(', ')
  );
  console.error(
    '[v0] Please add the following environment variables in v0 Settings > Vars:\n' +
    'VITE_FIREBASE_API_KEY\n' +
    'VITE_FIREBASE_AUTH_DOMAIN\n' +
    'VITE_FIREBASE_PROJECT_ID\n' +
    'VITE_FIREBASE_STORAGE_BUCKET\n' +
    'VITE_FIREBASE_MESSAGING_SENDER_ID\n' +
    'VITE_FIREBASE_APP_ID'
  );
}

// Initialize Firebase
let app: any;
let auth: any;
let db: any;
let analytics: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Set persistence
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn('[v0] Failed to set auth persistence:', err);
  });
  
  // Initialize Firebase Analytics
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn('[v0] Analytics not available:', err);
  }
} catch (err) {
  console.error('[v0] Failed to initialize Firebase:', err);
}

// User Profile Interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  coursesCompleted: number;
  learningHours: number;
  certifications: number;
  skillProgress: number;
}

// Export with fallbacks to prevent runtime errors
export { auth, db, analytics };

// Auth functions with error handling
export async function registerUser(email: string, password: string, displayName?: string) {
  if (!auth || !db) {
    throw new Error('Firebase is not initialized. Please check your environment variables.');
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: displayName || 'User',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      coursesCompleted: 0,
      learningHours: 0,
      certifications: 0,
      skillProgress: 0,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    console.log('[v0] User profile created in Firestore');

    return user;
  } catch (error: any) {
    console.error('[v0] Registration error:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  if (!auth || !db) {
    throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login time
    await updateDoc(doc(db, 'users', user.uid), {
      lastLoginAt: new Date(),
    });

    return userCredential;
  } catch (error: any) {
    console.error('[v0] Login error:', error);
    throw error;
  }
}

export async function logoutUser() {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized.');
  }
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) {
    console.warn('[v0] Firebase Auth is not initialized');
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return null;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      // Convert Firestore timestamps to Date objects
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        lastLoginAt: data.lastLoginAt?.toDate?.() || new Date(data.lastLoginAt),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('[v0] Error fetching user profile:', error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    await updateDoc(doc(db, 'users', uid), updates);
    console.log('[v0] User profile updated');
  } catch (error) {
    console.error('[v0] Error updating user profile:', error);
    throw error;
  }
}

// Analytics functions with safe error handling
export function logAnalyticsEvent(eventName: string, eventParams?: Record<string, any>) {
  if (!analytics) {
    console.warn('[v0] Firebase Analytics is not available');
    return;
  }
  try {
    logEvent(analytics, eventName, eventParams);
  } catch (err) {
    console.warn('[v0] Failed to log analytics event:', err);
  }
}

export function trackPageView(pageName: string) {
  logAnalyticsEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href,
  });
}

export function trackUserSignup(method: string) {
  logAnalyticsEvent('sign_up', {
    method: method,
    timestamp: new Date().toISOString(),
  });
}

export function trackUserLogin(method: string) {
  logAnalyticsEvent('login', {
    method: method,
    timestamp: new Date().toISOString(),
  });
}

export function trackCourseView(courseId: string, courseName: string) {
  logAnalyticsEvent('view_course', {
    course_id: courseId,
    course_name: courseName,
  });
}

export function trackCourseEnrollment(courseId: string, courseName: string) {
  logAnalyticsEvent('enroll_course', {
    course_id: courseId,
    course_name: courseName,
  });
}

export function trackCourseCompletion(courseId: string, title: string) {
  logAnalyticsEvent('course_completed', {
    course_id: courseId,
    course_title: title,
    timestamp: new Date().toISOString(),
  });
}

export function trackLearningTime(minutes: number) {
  logAnalyticsEvent('learning_session', {
    duration_minutes: minutes,
    timestamp: new Date().toISOString(),
  });
}

// Initialize user data if they don't exist
export async function initializeUserData(uid: string): Promise<void> {
  try {
    const userProfile = await getUserProfile(uid);
    if (!userProfile) {
      const user = auth.currentUser;
      const newProfile: UserProfile = {
        uid,
        email: user?.email || '',
        displayName: user?.displayName || 'User',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        coursesCompleted: 0,
        learningHours: 0,
        certifications: 0,
        skillProgress: 0,
      };
      await setDoc(doc(db, 'users', uid), newProfile);
      console.log('[v0] User data initialized');
    }
  } catch (error) {
    console.error('[v0] Error initializing user data:', error);
  }
}
