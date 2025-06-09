import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY || process.env.API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN || process.env.AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID || process.env.PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET || process.env.STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || process.env.MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID || process.env.APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID || process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const fetchGameIds = async () => {
	const gameIds: string[] = [];

	try {
		const gamesCollection = collection(db, 'games');
		const gamesSnapshot = await getDocs(gamesCollection);
		gamesSnapshot.docs.forEach((doc) => {
			gameIds.push(doc.id); // Collect the game IDs
		});
	} catch (error) {
		console.error('Error fetching game IDs:', error);
	}

	return gameIds;
};

export {
	app,
	auth,
	db,
	collection,
	getDocs,
	addDoc,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	fetchGameIds
};
