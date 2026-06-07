import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgg_1TULq0dZFe6M-QQ200CE7nwOzGeb8",
  authDomain: "skillforgedemowebsite.firebaseapp.com",
  projectId: "skillforgedemowebsite",
  storageBucket: "skillforgedemowebsite.firebasestorage.app",
  messagingSenderId: "957822862900",
  appId: "1:957822862900:web:d8813de7b31a0b3f8aec61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createTestUser() {
  try {
    const email = `liveuser${Date.now()}@skillforge.demo`;
    const password = "Firebase@Pass123";
    const displayName = "Live Firebase User";

    console.log(`Creating user with email: ${email}`);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log(`User created with UID: ${user.uid}`);

    // Update profile
    await updateProfile(user, { displayName });
    console.log(`Profile updated with displayName: ${displayName}`);

    // Create Firestore document
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      coursesCompleted: 0,
      learningHours: 0,
      certifications: 0,
      skillProgress: 0,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    console.log(`Firestore document created for user: ${user.uid}`);
    console.log(`User successfully created! Email: ${email}, Password: ${password}`);
    console.log('You can now login with these credentials!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating user:', error.message);
    process.exit(1);
  }
}

createTestUser();
