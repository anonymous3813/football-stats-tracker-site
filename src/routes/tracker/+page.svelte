<script>
	import { goto } from '$app/navigation';
	import { gameStore } from '$lib/stores/TrackerStore.svelte';

	let showModal = $state(false);
	let teamName = $state('');
	let newOpponent = $state('');

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		teamName = '';
		newOpponent = '';
	}
</script>

<main class="min-h-screen bg-gray-100 py-8">
	<div class="max-w-3xl mx-auto px-4">
		<button
			onclick={() => goto('/')}
			class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded hover:scale-105 transition-transform mb-6"
		>
			← Back
		</button>
		<h1 class="text-3xl font-bold mb-6 text-center">Football Tracker</h1>
		<div class="grid gap-6">
			{#each gameStore.allGames as game}
				<button
					type="button"
					class="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between w-full text-left transition-transform transform hover:scale-105 hover:shadow-xl active:scale-95"
					aria-label="View details for Us vs {game.opponent}"
					onclick={() => {
						goto(`/tracker/game/${game.id}`);
					}}
				>
					<div class="flex-1 flex flex-col md:flex-row items-center gap-4">
						<div class="text-lg font-semibold">Us</div>
						<div class="text-2xl font-bold text-blue-600">{game.scoreTeam1}</div>
						<span class="mx-2 text-gray-500">vs</span>
						<div class="text-2xl font-bold text-red-600">{game.opponent}</div>
						<div class="text-lg font-semibold">{game.scoreTeam2}</div>
					</div>
					<div class="mt-4 md:mt-0 flex flex-col items-end">
						<span class="text-sm text-gray-500">Some time</span>
						<span class="text-xs px-2 py-1 rounded bg-gray-200 mt-1">Nah</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<button
		onclick={openModal}
		class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
		aria-label="Add Game"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
		</svg>
	</button>

	{#if showModal}
		<div
			class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
			onclick={closeModal}
		>
			<div
				class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative animate-fadeIn"
				onclick={(e) => e.stopPropagation()}
			>
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add New Game</h2>

				<div class="space-y-4">
					<div>
						<label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Your Team Name</label
						>
						<input
							bind:value={teamName}
							type="text"
							class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
							placeholder="e.g., Seahawks"
						/>
					</div>

					<div>
						<label class="block text-sm text-gray-700 dark:text-gray-300 mb-1"
							>Opponent Team Name</label
						>
						<input
							bind:value={newOpponent}
							type="text"
							class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
							placeholder="e.g., 49ers"
						/>
					</div>
				</div>

				<div class="mt-6 flex justify-end gap-3">
					<button
						onclick={closeModal}
						class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						Cancel
					</button>
					<button
						onclick={() => {
							//gameStore.addGame(newGameId, newOpponent);
							alert('Game added! Team name: ' + teamName + ', Opponent: ' + newOpponent);
							closeModal();
						}}
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
					>
						Add Game
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>
