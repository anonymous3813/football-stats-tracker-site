<script lang="ts">
  let openIndex: number | null = $state(null);

  let { items } = $props();

  const toggle = (i: number) => {
    openIndex = openIndex === i ? null : i;
  };
</script>

<div class="max-w-xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
  {#each items as item, i}
    <div>
      <button
        onclick={() => toggle(i)}
        class="flex items-center justify-between w-full py-5 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <span>{item.title}</span>
        <svg
          class="w-3 h-3 transition-transform duration-200"
          class:rotate-180={openIndex === i}
          fill="none"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L5 1 1 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      {#if openIndex === i}
        <div class="py-5 text-gray-500 dark:text-gray-400">
          {item.content}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
