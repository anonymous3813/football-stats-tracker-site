<script>
    let { label, value, placeholder = '' } = $props();
</script>

<div class="space-y-1">
	<label for="yards-input" class="block text-sm font-bold text-gray-700">{label}</label>
	<input
		id="yards-input"
		type="number"
		class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 font-medium"
		bind:value={value}
		min="-100"
		max="110"
		placeholder={placeholder}
	/>
</div>

<!--
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let { label, value, placeholder = '', type = 'text', id = '' } = $props();
</script>

<div class="space-y-1">
	<label for={id} class="block text-sm font-bold text-gray-700">{label}</label>
	<input
		id={id}
		type={type}
		class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 font-medium"
		value={value}
		placeholder={placeholder}
		on:input={(e) => {
			const val = type === 'number' ? +e.target.value : e.target.value;
			dispatch('input', val);
		}}
	/>
</div> -->
