import type { Play2 } from '$lib/types';
import type { Game2 } from '$lib/types';
import { mockGames } from '$lib/stores/mockData';

export const gameStore = $state({
	allGames: mockGames as Game2[],
	allGameIds: mockGames.map((game) => game.id),
	currentPlayIndex: 0,
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
	gameStore.allGameIds.push(newGame.id);
}

export function removeGame(gameId: string) {
	gameStore.allGames = gameStore.allGames.filter((game) => game.id !== gameId);
	gameStore.allGameIds = gameStore.allGameIds.filter((id) => id !== gameId);
}

export function checkGameExists(gameId: string): boolean {
	return gameStore.allGameIds.includes(gameId);
}

//Play mutation functions
export function updatePlay(gameId: string, playId: string, newData: Partial<Play2>) {
	const game = getCurrentGame(gameId);
	if (!game) return;

	const index = game.plays.findIndex((p) => p.id === playId);
	if (index === -1) return;

	game.plays[index] = { ...game.plays[index], ...newData };
	game.plays = [...game.plays]; 
}


export function addPlay(gameId: string, newPlay: Play2) {
	const game = getCurrentGame(gameId);
	if (!game) return;

	game.plays = [...game.plays, { ...newPlay }];
}

export function removePlay(gameId: string, playId: string) {
	const gameIndex = gameStore.allGames.findIndex((g) => g.id === gameId);
	if (gameIndex === -1) return;

	// Filter the play list
	const updatedGame = {
		...gameStore.allGames[gameIndex],
		plays: gameStore.allGames[gameIndex].plays.filter((play) => play.id !== playId)
	};

	// Replace the game in allGames to trigger reactivity
	gameStore.allGames[gameIndex] = updatedGame;
}
