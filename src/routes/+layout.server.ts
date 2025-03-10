import { db, collection, getDocs } from '$lib/firebase';
import type { Game } from '$lib/types';


export const load = async () => {
    let gamesList: Game[] = [];  

    try {
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        gamesList = gamesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<Game, 'id'>
        }));
    } catch (error) {
        console.error('Error fetching games:', error);
    }

    return {
        gamesList: gamesList
    };
};