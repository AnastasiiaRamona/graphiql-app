import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2juZJAlgcLjPNB7XijhH9e5ueIbnnukE',
  authDomain: 'graphiql-app-e0837.firebaseapp.com',
  projectId: 'graphiql-app-e0837',
  storageBucket: 'graphiql-app-e0837.appspot.com',
  messagingSenderId: '843573515901',
  appId: '1:843573515901:web:f4219e18e26acd1ec60314',
  measurementId: 'G-CBJZFH0Y66',
};

async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out user:', error);
  }
}

async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}
// onAuthStateChanged - он вызывается, когда пользователь входит или выходит из системы, может пригдодиться потом.
export { registerUser, logoutUser, loginUser };
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
