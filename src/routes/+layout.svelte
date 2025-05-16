<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
  <title>Football Stats Tracker</title>
  <meta name="description" content="Track football stats for the 2025 season" />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <div class="bg-blue-600 text-white p-4 shadow-md">
    <div class="flex justify-between items-center">
      <div class="text-lg font-bold">Football Stats Tracker</div>
      <div class="space-x-4">
        <a href="/" class="hover:text-gray-200">Home</a>
        <a href="/about" class="hover:text-gray-200">About</a>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <main class="flex-grow">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-300 py-6 mt-12">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      
      <div class="text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Football Stats Tracker</p>
      </div>
      
      <div class="text-center md:text-right">
        <a 
          href="https://www.flaticon.com/free-icons/american-football" 
          title="American football icons" 
          class="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Icon created by Flaticon
        </a>
      </div>
  
    </div>
  </footer>
  
</div>
