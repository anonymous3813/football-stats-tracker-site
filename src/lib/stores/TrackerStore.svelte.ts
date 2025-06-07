import type { Play2 } from '$lib/types';
import type { Game2 } from '$lib/types';
import { mockGames } from '$lib/stores/mockData';

export const gameStore = $state({
	allGames: mockGames as Game2[],
	currentPlayIndex: 0,
	currentQb: ''
});

//Getters for current game and play
export function getCurrentGame(gameId: string): Game2 | undefined {
	return gameStore.allGames.find((game) => game.id === gameId);
}

export function getCurrentPlay(gameId: string, playId: string): Play2 | undefined {
	const game = getCurrentGame(gameId);
	return game?.plays.find((play) => play.id === playId);
}

export function getAmountOfPlays(gameId: string): number {
	const game = getCurrentGame(gameId);
	return game ? game.plays.length : 0;
}

//Game mutation functions
export function updateGame(gameId: string, newData: Partial<Game2>) {
	const game = getCurrentGame(gameId);
	if (!game) return;

	Object.assign(game, newData);
}

export function addGame(newGame: Game2) {
	gameStore.allGames.push(newGame);
}

export function removeGame(gameId: string) {
	gameStore.allGames = gameStore.allGames.filter((game) => game.id !== gameId);
}

//Play mutation functions
export function updatePlay(gameId: string, playId: string, newData: Partial<Play2>) {
	const play = getCurrentPlay(gameId, playId);
	if (!play) return;

	Object.assign(play, newData);
}

export function addPlay(gameId: string, newPlay: Play2) {
	const game = getCurrentGame(gameId);
	if (!game) return;

	game.plays.push(newPlay);
}

export function removePlay(gameId: string, playId: string) {
	const game = getCurrentGame(gameId);
	if (!game) return;

	game.plays = game.plays.filter((play) => play.id !== playId);
}
