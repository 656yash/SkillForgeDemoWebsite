import { db } from './firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Payment Interface
export interface Payment {
  id?: string;
  userId: string;
  courseId: string;
  courseName: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'mock' | 'stripe' | 'card';
  transactionId?: string;
  createdAt: Timestamp | Date;
  completedAt?: Timestamp | Date;
}

// Create payment record
export async function createPayment(
  userId: string,
  courseId: string,
  courseName: string,
  amount: number
): Promise<string | null> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    const payment: Payment = {
      userId,
      courseId,
      courseName,
      amount,
      paymentStatus: 'pending',
      paymentMethod: 'mock',
      createdAt: serverTimestamp() as any,
    };

    const docRef = await addDoc(collection(db, 'payments'), payment);
    console.log('[v0] Payment record created:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[v0] Error creating payment:', error);
    throw error;
  }
}

// Complete payment (mock payment)
export async function completePayment(
  paymentId: string,
  transactionId: string = `mock_${Date.now()}`
): Promise<void> {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }

  try {
    await (await import('firebase/firestore')).updateDoc(
      doc(db, 'payments', paymentId),
      {
        paymentStatus: 'completed',
        transactionId,
        completedAt: serverTimestamp(),
      }
    );
    console.log('[v0] Payment completed:', paymentId);
  } catch (error) {
    console.error('[v0] Error completing payment:', error);
    throw error;
  }
}

// Get user's payment history
export async function getUserPaymentHistory(userId: string): Promise<Payment[]> {
  if (!db) {
    console.error('[v0] Firestore is not initialized');
    return [];
  }

  try {
    const q = query(
      collection(db, 'payments'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const payments: Payment[] = [];
    
    querySnapshot.forEach((doc) => {
      payments.push({
        id: doc.id,
        ...doc.data(),
      } as Payment);
    });

    return payments;
  } catch (error) {
    console.error('[v0] Error fetching payment history:', error);
    return [];
  }
}

// Get total revenue (mock implementation)
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
    console.error('[v0] Error calculating total revenue:', error);
    return 0;
  }
}
