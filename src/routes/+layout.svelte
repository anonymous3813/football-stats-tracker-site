<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

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
  <footer class="bg-gray-800 text-white py-4 text-center">
    <p>&copy; {new Date().getFullYear()} Football stats tracker site</p>
  </footer>
</div>
