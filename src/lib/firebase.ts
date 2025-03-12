import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const fetchGameIds = async () => {
    const gameIds: string[] = [];
    
    try {
      const gamesCollection = collection(db, 'games');
      const gamesSnapshot = await getDocs(gamesCollection);
      gamesSnapshot.docs.forEach(doc => {
        gameIds.push(doc.id); // Collect the game IDs
      });
      
    } catch (error) {
      console.error('Error fetching game IDs:', error);
    }
  
    return gameIds;
  };

  export { app, db, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, fetchGameIds};