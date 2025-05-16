<script lang="ts">
	const { dropDownItems, selected, onclick } = $props();

	const dropDownEntries = Array.isArray(dropDownItems)
		? dropDownItems.map((item) => [item, '']) 
		: Object.keys(dropDownItems);

	let downExpanded = $state(false);
	let tabColor = $derived(dropDownItems[selected] || 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-300');
</script>

<button
	class={`w-full font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 shadow-sm flex items-center justify-between text-white ${tabColor} transition-all`}
	onclick={() => (downExpanded = !downExpanded)}
>
	<span>{selected}</span>
	<svg
		class="w-5 h-5 ml-2 fill-current text-white transition-transform"
		viewBox="0 0 20 20"
		class:rotate-180={downExpanded}
	>
		<path
			d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
		/>
	</svg>
</button>

{#if downExpanded}
	<ul
		class="absolute z-20 bg-white border border-gray-200 rounded-md w-full mt-1 shadow-lg overflow-hidden animate-slide-down"
	>
		{#each dropDownEntries as item}
			<li>
				<button
					class="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none transition-all font-medium"
					onclick={() => {
						onclick(item);
						downExpanded = false;
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							onclick(item);
						}
					}}
				>
					{item}
				</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.2s ease-out;
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-slide-down {
		animation: slide-down 0.2s ease-out;
	}

	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
