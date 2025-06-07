<script lang="ts">
	import { goto } from '$app/navigation';
	import { gameStore, getCurrentGame } from '$lib/stores/TrackerStore.svelte.js';
	import type { Game, Play } from '$lib/types.js';
	import { onMount } from 'svelte';

	const { data } = $props();
	const gameId = data.gameId;
	const game = getCurrentGame(gameId);

	onMount(() => {
		$inspect(gameStore.allGames);
		$inspect(game);
	});

	const plays = game?.plays || [];
</script>

<div class="max-w-3xl mx-auto mt-8">
	<button
		onclick={() => goto('/tracker')}
		class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded hover:scale-105 transition-transform mb-6"
	>
		← Back
	</button>
	<div class="text-3xl font-bold mb-8 text-gray-800 tracking-wide text-center">
		Game vs {game?.opponent} Plays
	</div>
	<div class="bg-white rounded-xl shadow-lg p-8">
		<table class="w-full border-separate border-spacing-0 text-base">
			<thead>
				<tr>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-tl-lg">Play #</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3">Team</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3">Play</th>
					<th class="bg-gray-100 text-gray-700 font-semibold px-4 py-3 rounded-tr-lg">Result</th>
				</tr>
			</thead>
			<tbody>
				{#each plays as play, i}
					<tr
						class="{i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition"
						onclick={() => goto(`/tracker/game/${gameId}/play/${play.id}`)}
					>
						<td class="px-4 py-3">{i + 1}</td>
						<td class="px-4 py-3 font-medium {play.offense ? 'text-blue-700' : 'text-red-700'}">
							{play.offense ? 'Us' : game?.opponent}
						</td>
						<td class="px-4 py-3">{play.selectedPlayType}</td>
						<td class="px-4 py-3">{play.playOutcome}</td>
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
