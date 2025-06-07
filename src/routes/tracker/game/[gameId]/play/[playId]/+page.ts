import { getCurrentGame } from '$lib/stores/TrackerStore.svelte.js';

export const load = async ({ params }) => {
    const playId = params.playId;
    const gameId = params.gameId;
    const game = getCurrentGame(gameId);
    if (!game) {
        return { status: 404 };
    }
    const playLength = game.plays.length;

    if (!playId) {
        throw new Error("Missing parameter 'gameId' in route");
    }
    return {
        playId: playId,
        gameId: gameId,
        playLength: playLength,
        playIndex: game.plays.findIndex((play) => play.id === playId)
    };
}

/*
import { getCurrentGame } from '$lib/stores/TrackerStore.svelte.js';

export async function load({ params }) {
	const { gameId, playId } = params;
	const game = getCurrentGame(gameId);

	if (!game) {
		return { status: 404 };
	}

    const playLength = game.plays.length;

	const playIndex = game.plays.findIndex((play) => play.id === playId);

	if (playIndex === -1) {
		return { status: 404 };
	}

	return {
		gameId: gameId,
		playId: playIndex,
        playLength: playLength,
        playIndex: playIndex
	};
} 
*/