<script lang="ts">
	let showModal = false;

	let gameId = '';
	let opponent = '';

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		gameId = '';
		opponent = '';
	}

	function submitForm() {
		if (!gameId || !opponent) {
			alert('Please fill out all fields');
			return;
		}

		// Replace this with actual logic
		console.log('New Game:', { gameId, opponent });

		closeModal();
	}
</script>

<!-- Floating Action Button -->
<button
	onclick={openModal}
	class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
	aria-label="Add Game"
>
	<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
	</svg>
</button>

<!-- Modal Overlay -->
{#if showModal}
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
		onclick={closeModal}
	>
		<!-- Stop propagation to prevent closing when clicking inside -->
		<div
			class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative animate-fadeIn"
			onclick={(e) => e.stopPropagation()}
		>
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add New Game</h2>

			<div class="space-y-4">
				<div>
					<label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Game ID</label>
					<input
						bind:value={gameId}
						type="text"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
						placeholder="e.g., game123"
					/>
				</div>

				<div>
					<label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Opponent</label>
					<input
						bind:value={opponent}
						type="text"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
						placeholder="e.g., Wildcats"
					/>
				</div>
			</div>

			<div class="mt-6 flex justify-end gap-3">
				<button onclick={closeModal} class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
					Cancel
				</button>
				<button
					onclick={submitForm}
					class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
				>
					Add Game
				</button>
			</div>
		</div>
	</div>
{/if}


<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.2s ease-out;
	}
</style>
