<script lang="ts">
	import DropDown from '$lib/components/DropDown.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import {
		gameStore,
		getCurrentGame,
		getCurrentPlay,
		getAmountOfPlays
	} from '$lib/stores/TrackerStore.svelte.js';
	import { onMount } from 'svelte';
	import {
		playTypes,
		passResults,
		patOptions,
		downs,
		playOutcomes,
		IncompleteOutcomes
	} from '$lib/constants.js';
	import { goto } from '$app/navigation';

	/*
	interface TrackerPageProps {
		gameId: string;
		playId: string;
		playLength: number;
		playIndex: string;
	}*/

	const { data } = $props();
	const playId = data.playId;
	const gameId = data.gameId;
	const playLength = data.playLength || 0;

	const play = $state({
		id: playId,
		down: 1,
		offense: true,

		selectedPlayType: 'Pass',
		selectedPassResult: 'Incomplete',
		selectedPAT: 'Failed PAT',

		intercepted: 'No Int',
		playOutcome: 'Neither',

		targetedPlayer: 0,
		yards: 0
	});

	const score1 = $state(0);
	const score2 = $state(0);

	onMount(() => {
		console.log('Game ID:', gameId);
		const fetchedPlay = getCurrentPlay(gameId, playId);
		console.log('Fetched Play:', fetchedPlay);
		if (fetchedPlay) {
			Object.assign(play, fetchedPlay);
		}

		$inspect(play);
	});

	function handleNext() {
		if (gameStore.currentPlayIndex < playLength - 1) {
			gameStore.currentPlayIndex += 1;
		} else {
			// Add new play logic here
		}
	}

	function handlePrevious() {
		if (gameStore.currentPlayIndex > 0) {
			gameStore.currentPlayIndex -= 1;
		}
	}
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10"
>
	<div class="p-8 max-w-2xl w-full space-y-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
		<div class="flex justify-between items-center mb-4">
			<button
				class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
				onclick={() => {
					goto(`/tracker/game/${gameId}`);
				}}>← Back</button
			>

			<h1 class="text-2xl font-semibold text-center text-gray-800 flex-1">{score1} - {score2}</h1>

			<button
				class={`px-4 py-2 rounded-lg shadow-sm font-medium transition text-white ${play.offense ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400' : 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400'}`}
				onclick={() => (play.offense = !play.offense)}
			>
				{play.offense ? 'Offense' : 'Defense'}
			</button>
		</div>

		<div class="bg-gray-100 p-4 rounded-md shadow-inner flex items-center justify-between gap-4">
			<h2 class="text-xl font-semibold text-gray-700">Play {gameStore.currentPlayIndex + 1}</h2>

			<div class="relative w-1/2">
				<DropDown
					dropDownItems={downs}
					selected={play.down}
					onclick={(item: string) => {

						switch (item) {
							case '1st down':
								play.down = 1;
								break;
							case '2nd down':
								play.down = 2;
								break;
							case '3rd down':
								play.down = 3;
								break;
							case '4th down':
								play.down = 4;
								break;
						}
					}}
				></DropDown>
			</div>
		</div>

		<div class="bg-gray-100 p-4 rounded-md shadow-inner space-y-2">
			<p class="text-lg font-medium text-gray-700">Play Type</p>

			<ButtonGroup
				buttonItems={playTypes}
				selectedButton={play.selectedPlayType}
				onclick={(item: string) => (play.selectedPlayType = item)}
			></ButtonGroup>
		</div>

		{#if play.selectedPlayType !== 'Punt'}
			<div class="bg-gray-100 p-4 rounded-md shadow-inner space-y-2">
				<p class="text-lg font-medium text-gray-700">Play Outcome</p>

				{#if play.selectedPlayType === 'Pass'}
					<ButtonGroup
						buttonItems={passResults}
						selectedButton={play.selectedPassResult}
						onclick={(item: string) => (play.selectedPassResult = item)}
					></ButtonGroup>
				{/if}

				<div class="flex gap-2">
					{#if play.selectedPassResult === 'Complete' || play.selectedPlayType === 'Run'}
						<DropDown
							dropDownItems={playOutcomes}
							selected={play.playOutcome}
							onclick={(item: string) => {
								play.playOutcome = item;
							}}
						></DropDown>
						{#if play.playOutcome === 'TD'}
							<DropDown
								dropDownItems={patOptions}
								selected={play.selectedPAT}
								onclick={(item: string) => {
									play.selectedPAT = item;
								}}
							></DropDown>
						{/if}
					{:else}
						<DropDown
							dropDownItems={IncompleteOutcomes}
							selected={play.intercepted}
							onclick={(item: string) => {
								play.intercepted = item;
							}}
						></DropDown>
					{/if}
				</div>
			</div>
		{/if}

		<div class="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-inner">
			<TextBox label="Targeted Player" value={play.targetedPlayer} placeholder="Enter #"></TextBox>
			<TextBox label="QB" value={play.targetedPlayer} placeholder="Enter QB #"></TextBox>
		</div>

		<TextBox label="Yards Gained" value={play.yards} placeholder="e.g., 15"></TextBox>

		<div class="flex gap-4 justify-between pt-4">
			<button
				class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-102 transition font-medium"
				disabled={gameStore.currentPlayIndex === 0}
				onclick={() => handlePrevious}
			>
				← Previous
			</button>

			{#if gameStore.currentPlayIndex < playLength - 1}
				<button
					class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-102 transition font-medium"
					onclick={handleNext}
				>
					Next →
				</button>
			{:else}
				<button
					class="bg-emerald-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-emerald-600 hover:scale-102 transition font-medium"
					onclick={handleNext}
				>
					➕ New Play
				</button>
			{/if}
		</div>
	</div>
</div>

<svelte:window
	on:beforeunload={(event) => {
		event.preventDefault();
		return '';
	}}
/>
