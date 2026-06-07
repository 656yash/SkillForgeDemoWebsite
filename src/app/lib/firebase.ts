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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence
setPersistence(auth, browserLocalPersistence);

// Initialize Firebase Analytics
export const analytics = getAnalytics(app);

// Auth functions
export async function registerUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Analytics functions
export function logAnalyticsEvent(eventName: string, eventParams?: Record<string, any>) {
  logEvent(analytics, eventName, eventParams);
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
