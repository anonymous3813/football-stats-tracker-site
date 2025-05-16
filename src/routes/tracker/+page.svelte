<script lang="ts">
	import DropDown from '../../components/DropDown.svelte';
	import ButtonGroup from '../../components/ButtonGroup.svelte';

	let down = $state('First down');
	let playIndex = $state(0);
	let offense = $state(true);
	let score1 = $state(1);
	let score2 = $state(1);

	let selectedPlayType = $state('Pass');
	let selectedPassResult = $state('Incomplete');
	let selectedPAT = $state('0 PAT');

	let intercepted = $state('');
	let playOutcome = $state('Neither');

	let targetedPlayer = $state('');
	let yards = $state('');

	const playTypes = ['Run', 'Pass', 'Punt'];
	const passResults = ['Complete', 'Incomplete', 'Sacked'];
	const interceptions = ['Intercepted', 'Pick 6', 'No Int'];

	const patOptions = {
		'Pick 2': 'bg-red-500 hover:bg-red-600 focus:ring-red-400',
		'Failed PAT': 'bg-red-500 hover:bg-red-600 focus:ring-red-400',
		'1 PAT': 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
		'2 PAT': 'bg-green-500 hover:bg-green-600 focus:ring-green-400'
	};

	const downs = {
		'First down': 'bg-green-500 hover:bg-green-600 focus:ring-green-400',
		'Second down': 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400', //'bg-green-700 hover:bg-green-800 focus:ring-green-600';
		'Third down': 'bg-orange-400 hover:bg-orange-500 focus:ring-orange-300',
		'Fourth down': 'bg-red-600 hover:bg-red-700 focus:ring-red-300'
	};

	const playOutcomes = {
		'TD': 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400',
		'1st Down': 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
		'Neither': 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
	};
</script>

<div
	class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10"
>
	<div class="p-8 max-w-2xl w-full space-y-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
		<div class="flex justify-between items-center mb-4">
			<button
				class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition font-medium"
				>← Back</button
			>

			<h1 class="text-2xl font-semibold text-center text-gray-800 flex-1">{score1} - {score2}</h1>

			<button
				class={`px-4 py-2 rounded-lg shadow-sm font-medium transition text-white ${offense ? 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400' : 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-400'}`}
				onclick={() => (offense = !offense)}
			>
				{offense ? 'Offense' : 'Defense'}
			</button>
		</div>

		<div class="bg-gray-100 p-4 rounded-md shadow-inner flex items-center justify-between gap-4">
			<h2 class="text-xl font-semibold text-gray-700">Play {playIndex + 1}</h2>

			<div class="relative w-1/2">
				<DropDown
					dropDownItems={downs}
					selected={down}
					onclick={(item: string) => {
						down = item;
					}}
				></DropDown>
			</div>
		</div>

		<div class="bg-gray-100 p-4 rounded-md shadow-inner space-y-2">
			<p class="text-lg font-medium text-gray-700">Play Type</p>

			<ButtonGroup
				buttonItems={playTypes}
				selectedButton={selectedPlayType}
				onclick={(item: string) => (selectedPlayType = item)}
			></ButtonGroup>
		</div>

		{#if selectedPlayType !== 'Punt'}
			<div class="bg-gray-100 p-4 rounded-md shadow-inner space-y-2">
				<p class="text-lg font-medium text-gray-700">Play Outcome</p>

				{#if selectedPlayType === 'Pass'}
					<ButtonGroup
						buttonItems={passResults}
						selectedButton={selectedPassResult}
						onclick={(item: string) => (selectedPassResult = item)}
					></ButtonGroup>
				{/if}

				<div class="flex gap-2">
					<DropDown
						dropDownItems={playOutcomes}
						selected={playOutcome}
						onclick={(item: string) => {
							playOutcome = item;
						}}
					></DropDown>
					{#if playOutcome === 'TD'}
						<DropDown
							dropDownItems={patOptions}
							selected={selectedPAT}
							onclick={(item: string) => {
								selectedPAT = item;
							}}
						></DropDown>
					{/if}
				</div>
			</div>
		{/if}

		<div class="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-inner">
			<div class="space-y-1">
				<label for="targeted-player-input" class="block font-bold text-gray-700"
					>Targeted Player</label
				>
				<input
					id="targeted-player-input"
					type="number"
					class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 font-medium"
					bind:value={targetedPlayer}
					placeholder="Enter #"
				/>
			</div>
			<div class="space-y-1">
				<label for="targeted-player-input" class="block font-bold text-gray-700">QB</label>
				<input
					id="targeted-player-input"
					type="number"
					class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 font-medium"
					bind:value={targetedPlayer}
					placeholder="Enter #"
				/>
			</div>
		</div>

		<div class="space-y-1">
			<label for="yards-input" class="block text-sm font-medium text-gray-700">Yards Gained</label>
			<input
				id="yards-input"
				type="number"
				class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 font-medium"
				bind:value={yards}
				placeholder="e.g., 15"
			/>
		</div>

		<div class="flex gap-4 justify-between pt-4">
			<button
				class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-102 transition font-medium"
				disabled={playIndex === 0}
				onclick={() => (playIndex -= 1)}
			>
				← Previous
			</button>

			{#if playIndex === 2}
				<button
					class="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-102 transition font-medium"
					onclick={() => (playIndex += 1)}
				>
					Next →
				</button>
			{:else}
				<button
					class="bg-emerald-500 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-emerald-600 hover:scale-102 transition font-medium"
					onclick={() => console.log('New Play')}
				>
					➕ New Play
				</button>
			{/if}
		</div>
	</div>
</div>
