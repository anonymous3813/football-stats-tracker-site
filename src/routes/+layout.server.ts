import { db, collection, getDocs } from '$lib/firebase';
import type { Game } from '$lib/types';
import { writeFileSync } from 'fs';


export const load = async () => {
    let gamesList: Game[] = [];  

    try {
        const gamesCollection = collection(db, 'games');
        const gamesSnapshot = await getDocs(gamesCollection);
        gamesList = gamesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Omit<Game, 'id'>
        }));
        writeFileSync('static/gameIds.json', JSON.stringify(gamesList.map(game => game.id), null, 2));
    } catch (error) {
        console.error('Error fetching games:', error);
    }

    return {
        gamesList: gamesList
    };
};