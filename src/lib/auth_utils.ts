import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '$lib/firebase';

export async function signUp(email: string, password: string) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		console.error('Signup error:', error);
		throw error;
	}
}

export async function signIn(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		console.error('Signin error:', error);
		throw error;
	}
}

export async function signOutUser() {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Sign-out error:', error);
		throw error;
	}
}
