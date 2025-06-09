<script lang="ts">
	import DropDown from '$lib/components/DropDown.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import PulloutScore from '$lib/components/PulloutScore.svelte';
	import TextBox from '$lib/components/TextBox.svelte';
	import { calculateScore } from '$lib/utils.js';
	import {
		gameStore,
		getCurrentGame,
		getCurrentPlay,
		getAmountOfPlays,
		addPlay,
		updatePlay
	} from '$lib/stores/TrackerStore.svelte.js';
	import {
		playTypes,
		passResults,
		patOptions,
		downs,
		playOutcomes,
		IncompleteOutcomes
	} from '$lib/constants.js';
	import { goto } from '$app/navigation';
	import { QueryOrderByConstraint } from 'firebase/firestore';
	import { numberToDown, downToNumber } from '$lib/utils.js';
	import { Down } from '$lib/enums.js';
	import { gameInfoStore } from '$lib/stores/GameInfoStore.svelte.js';

	const { data } = $props();
	let playId = $derived(data.playId);
	let gameId = $derived(data.gameId);
	let playLength = $derived(data.playLength || 0);

	let isNewPlay = $state(false);

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
		qbNum: 0,
		yards: 0,
		lastPlayOfHalf: false
	});

	let isEndOfHalf = $state(false);

	$effect(() => {
		const fetchedPlay = getCurrentPlay(data.gameId, data.playId);

		if (fetchedPlay) {
			Object.assign(play, fetchedPlay);
			isNewPlay = false;
		} else {
			isNewPlay = true;
		}

		$inspect(play);
	});

	function savePlay() {
		updatePlay(gameId, playId, play);
	}

	function handleNext() {
		savePlay();
		let nextPlayId = getCurrentGame(gameId)?.plays[gameStore.currentPlayIndex + 1]?.id;
		if (!nextPlayId) {
			// If no next play, add it
			nextPlayId = crypto.randomUUID();
			addPlay(gameId, {
				id: nextPlayId,
				down: 1,
				offense: true,
				selectedPlayType: 'Pass',
				selectedPassResult: 'Incomplete',
				selectedPAT: 'Failed PAT',
				intercepted: 'No Int',
				playOutcome: 'Neither',
				targetedPlayer: 0,
				qbNum: gameInfoStore.qbNum || 0,
				yards: 0,
				lastPlayOfHalf: false
			});
		}

		gameStore.currentPlayIndex += 1;
		goto(`/tracker/game/${gameId}/play/${nextPlayId}`);
	}

	function handlePrevious() {
		savePlay();
		let prevPlayId = getCurrentGame(gameId)?.plays[gameStore.currentPlayIndex - 1]?.id;
		if (prevPlayId) {
			gameStore.currentPlayIndex -= 1;
			goto(`/tracker/game/${gameId}/play/${prevPlayId}`);
		} else {
			alert('No previous play available.');
		}
	}
</script>

<PulloutScore
	offense={play.offense}
	team1Name={getCurrentGame(gameId)?.teamName || 'Team 1'}
	team2Name={getCurrentGame(gameId)?.opponent || 'Team 2'}
	score1={data.scoreTeam1}
	score2={data.scoreTeam2}
/>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10"
>
	<div class="p-8 max-w-2xl w-full space-y-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
		<div class="flex justify-between items-center mb-4">
			<button
				class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
				onclick={() => {
					savePlay();
					goto(`/tracker/game/${gameId}`);
				}}>← Back</button
			>

			<button
				class={`px-5 py-3 rounded-lg shadow-sm transition font-medium
        ${isEndOfHalf ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
				onclick={() => (isEndOfHalf = !isEndOfHalf)}
				aria-pressed={isEndOfHalf}
			>
				{isEndOfHalf ? 'Last Play of Half (Active)' : 'Last Play of Half?'}
			</button>

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
					selected={numberToDown[play.down]}
					onclick={(item: string) => {
						play.down = downToNumber[item as Down];
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
			<TextBox label="Targeted Player" bind:value={play.targetedPlayer} placeholder="Enter #"
			></TextBox>
			<TextBox label="QB" bind:value={play.qbNum} placeholder="Enter QB #"></TextBox>
		</div>

		<TextBox label="Yards Gained" bind:value={play.yards} placeholder="e.g., 15"></TextBox>

		<div class="flex gap-4 justify-between pt-4">
			<button
				class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-102 transition font-medium"
				disabled={gameStore.currentPlayIndex === 0}
				onclick={handlePrevious}
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
