<script lang="ts">
	const { buttonItems, selectedButton, onclick } = $props();
</script>

<div class="flex gap-2">
	{#each buttonItems as item}
		<button
			class={`flex-1 px-4 py-2 rounded-md shadow-sm transition font-medium ${
				item === selectedButton
					? 'bg-indigo-500 text-white'
					: 'bg-white text-gray-800 border border-gray-300'
			} hover:scale-102`}
			onclick={() => {
				onclick(item);
			}}
		>
			{item}
		</button>
	{/each}
</div>
