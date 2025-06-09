<script lang="ts">
	let { offense, team1Name, team2Name, score1, score2 } = $props();
    
	let showScoreboard = $state(false);
</script>

<button
	class="fixed top-1/3 right-0 -translate-y-1/2 w-12 h-16 bg-indigo-600 text-white rounded-l-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
	class:opacity-0={showScoreboard}
	class:pointer-events-none={showScoreboard}
	class:translate-x-full={showScoreboard}
	class:duration-100={showScoreboard}
	class:ease-in-out={showScoreboard}
	onclick={() => (showScoreboard = !showScoreboard)}
	aria-label={showScoreboard ? 'Close Scoreboard' : 'Open Scoreboard'}
>
	{#if showScoreboard}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	{/if}
</button>

<div
	class="fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-sm shadow-xl p-6 transform transition-transform duration-300 ease-in-out z-40
    {showScoreboard ? 'translate-x-0' : 'translate-x-full'} lg:w-80"
>
	<div class="flex justify-end mb-4">
		<button
			class="text-gray-500 hover:text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
			onclick={() => (showScoreboard = false)}
			aria-label="Close Scoreboard"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>

	<h2 class="text-xl font-bold text-gray-800 mb-6 text-center">Current Score</h2>

	<!-- Mini Scoreboard Content -->
	<div
		class="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-md flex flex-col items-center justify-around gap-4"
	>
		<!-- Team 1 Side (Home) -->
		<div class="flex flex-col items-center gap-1 w-full">
			<span class="text-sm font-medium text-gray-600 truncate max-w-[100%]">{team1Name}</span>
			<div class="flex items-center justify-center w-full">
				<span
					class="text-4xl font-extrabold leading-none
                    {score1 > score2 ? 'text-blue-700' : 'text-gray-800'}
                    {score1 < score2 ? 'text-gray-500' : ''}
                ">{score1}</span
				>
				{#if offense}
					<span class="ml-2 text-green-500 text-xl leading-none">🏈</span>
				{/if}
			</div>
		</div>

		<span class="text-4xl font-bold text-gray-300 leading-none">VS</span>

		<div class="flex flex-col items-center gap-1 w-full">
			<span class="text-sm font-medium text-gray-600 truncate max-w-[100%]">{team2Name}</span>
			<div class="flex items-center justify-center w-full">
				<span
					class="text-4xl font-extrabold leading-none
                    {score2 > score1 ? 'text-red-700' : 'text-gray-800'}
                    {score2 < score1 ? 'text-gray-500' : ''}
                ">{score2}</span
				>
				{#if !offense}
					<span class="ml-2 text-green-500 text-xl leading-none">🏈</span>
				{/if}
			</div>
		</div>
	</div>
</div>
