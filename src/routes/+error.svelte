<script>
    let { error, status } = $props();
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
	<h1 class="text-6xl font-extrabold mb-4">{status}</h1>
	<h2 class="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
	<p class="mb-6 text-center max-w-lg">
		{error?.message || 'An unexpected error occurred.'}
	</p>

	<a
		href="/"
		class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
	>
		Go Back Home
	</a>
</div>
