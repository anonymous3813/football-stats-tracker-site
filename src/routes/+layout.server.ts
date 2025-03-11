import { db, collection, getDocs } from '$lib/firebase';
import type { Game } from '$lib/types';
import type { ServerLoad } from '@sveltejs/kit'; 


export const load: ServerLoad = async () => {
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