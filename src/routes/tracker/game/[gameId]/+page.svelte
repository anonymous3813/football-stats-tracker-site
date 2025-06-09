<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		addPlay,
		removePlay,
		gameStore,
		getCurrentGame
	} from '$lib/stores/TrackerStore.svelte.js';
	import { gameInfoStore } from '$lib/stores/GameInfoStore.svelte.js';
	import type { Game, Play } from '$lib/types.js';
	import { onMount } from 'svelte';

	const { data } = $props();
	const gameId = data.gameId;
	const game = $derived(getCurrentGame(gameId));

	let plays = $derived(game?.plays || []);
</script>

<div class="max-w-3xl mx-auto mt-8">
	<button
		onclick={() => goto('/tracker')}
		class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded hover:scale-105 transition-transform mb-6"
	>
		← Back
	</button>
	<div class="text-3xl font-bold mb-8 text-gray-800 tracking-wide text-center">
		Game {game?.teamName} vs {game?.opponent} Plays
	</div>
	<div class="bg-white rounded-xl shadow-lg p-8">
		<table class="w-full border-separate border-spacing-0 text-base">
			<thead>
				<tr>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-tl-lg">Play #</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3">Team</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3">Play</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-tr-lg">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each plays as play, i}
					<tr
						class="{i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition"
						onclick={() => {
							goto(`/tracker/game/${gameId}/play/${play.id}`);
							gameStore.currentPlayIndex = i;
						}}
					>
						<td class="px-4 py-3">{i + 1}</td>
						<td class="px-4 py-3 font-medium {play.offense ? 'text-blue-700' : 'text-red-700'}">
							{play.offense ? game?.teamName : game?.opponent}
						</td>
						<td class="px-4 py-3">{play.selectedPlayType}</td>
						<td class="px-4 py-3 text-center">
							<button
								type="button"
								class="rounded-full p-1 text-gray-400 transition-colors duration-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
								onclick={(e) => {
									console.log('Removing play:', play.id);
									e.stopPropagation();
									removePlay(gameId, play.id);
								}}
								aria-label="Delete play"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.924a2.25 2.25 0 01-2.244-2.077L5.094 5.94a2.25 2.25 0 011.022-.165ZM16.5 6V4.75A2.75 2.75 0 0013.75 2h-3.5A2.75 2.75 0 007.5 4.75V6m7.5 0H9"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/each}
				{#if plays.length === 0}
					<tr>
						<td colspan="4" class="text-center text-gray-400 py-8"
							>No plays recorded for this game.</td
						>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

<button
	onclick={() => {
		addPlay(gameId, {
			id: crypto.randomUUID(),
			down: 1,
			offense: true,

			selectedPlayType: 'Pass',
			selectedPassResult: 'Incomplete',
			selectedPAT: 'Failed PAT',

			intercepted: 'No Int',
			playOutcome: 'Neither',

			targetedPlayer: 0,
			qbNum: 0,
			yards: 0,
			lastPlayOfHalf: false
		});
	}}
	class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
	aria-label="Add Play"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
	</svg>
</button>
