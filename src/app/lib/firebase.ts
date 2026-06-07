import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
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
let analytics: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
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

// Export with fallbacks to prevent runtime errors
export { auth, analytics };

// Auth functions with error handling
export async function registerUser(email: string, password: string) {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
  }
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please check your environment variables.');
  }
  return signInWithEmailAndPassword(auth, email, password);
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
  });
}

export function trackUserLogin(method: string) {
  logAnalyticsEvent('login', {
    method: method,
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
