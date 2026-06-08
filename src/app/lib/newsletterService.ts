import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Newsletter Subscriber Interface
export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt: Timestamp | Date;
  status: 'active' | 'unsubscribed';
}

// Contact Form Submission Interface
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp | Date;
  status: 'new' | 'read' | 'resolved';
}

// Subscribe to newsletter
export async function subscribeToNewsletter(email: string): Promise<string | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    // Check if email already exists
    const q = query(
      collection(db, 'newsletter_subscribers'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Email already subscribed
      console.log('[v0] Email already subscribed to newsletter');
      return null;
    }

    const subscriber: NewsletterSubscriber = {
      email,
      subscribedAt: serverTimestamp() as any,
      status: 'active',
    };

    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), subscriber);
    console.log('[v0] Newsletter subscription created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error subscribing to newsletter:', error);
    throw error;
  }
}

// Get total newsletter subscribers
export async function getTotalNewsletterSubscribers(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'newsletter_subscribers'),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching newsletter subscriber count:', error);
    return 0;
  }
}

// Submit contact form
export async function submitContactForm(
  name: string,
  email: string,
  message: string
): Promise<string | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    const submission: ContactSubmission = {
      name,
      email,
      message,
      createdAt: serverTimestamp() as any,
      status: 'new',
    };

    const docRef = await addDoc(collection(db, 'contact_submissions'), submission);
    console.log('[v0] Contact form submission created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error submitting contact form:', error);
    throw error;
  }
}

// Get all contact submissions (for admin)
export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(db, 'contact_submissions'));
    const submissions: ContactSubmission[] = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
      } as ContactSubmission);
    });

    return submissions;
  } catch (error) {
    console.error('[v0] Error fetching contact submissions:', error);
    return [];
  }
}

// Get unread contact submissions count (for admin dashboard KPIs)
export async function getUnreadContactCount(): Promise<number> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return 0;
  }

  try {
    const q = query(
      collection(db, 'contact_submissions'),
      where('status', '==', 'new')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('[v0] Error fetching unread contact count:', error);
    return 0;
  }
}
