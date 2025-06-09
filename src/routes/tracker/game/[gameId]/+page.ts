import { checkGameExists } from '$lib/stores/TrackerStore.svelte.js';

export const load = async ({ params }) => {
    const gameId = params.gameId;

    if (!gameId || checkGameExists(gameId) === false) {
        throw new Error(404, {
            message: `Game with ID ${gameId} not found`
        });
    }
    return {
        gameId: gameId
    };
}