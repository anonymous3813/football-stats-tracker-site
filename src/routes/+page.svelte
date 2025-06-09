<script lang="ts">
    import { goto } from '$app/navigation';
  
    function goToDashboard() {
      goto('/dashboard');
    }
  
    function goToTracker() {
      goto('/tracker');
    }
  
    function signIn() {
      goto('/login');
    }
  </script>
  
  <section class="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center px-4 py-10">
    <!-- Hero -->
    <div class="max-w-3xl text-center space-y-4">
      <h1 class="text-5xl font-extrabold leading-tight">
        Your Football Game, <span class="text-blue-600">Fully Tracked</span>
      </h1>
      <p class="text-lg text-gray-600">
        Record plays in real-time. View powerful stats later. One simple platform for football teams and fans.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onclick={goToDashboard}
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition hover:scale-105"
        >
          View Dashboard
        </button>
        <button
          onclick={goToTracker}
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition hover:scale-105"
        >
          Start Tracking
        </button>
      </div>
    </div>
  
    <!-- Features -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105">
        <h2 class="text-2xl font-bold mb-2">📈 Intuitive Dashboard</h2>
        <p class="text-gray-600">
          See top performers, trends, and stats from every match. Easy filters make analysis quick and enjoyable.
        </p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105">
        <h2 class="text-2xl font-bold mb-2">🏈 Live Game Tracker</h2>
        <p class="text-gray-600">
          Log actions as they happen — touchdowns, passes, interceptions and more. Built for speed and accuracy.
        </p>
      </div>
    </div>
  
    <!-- Sign In CTA -->
    <div class="mt-20 text-center">
      <p class="text-gray-500 mb-3">Want to share stats and see insights? You'll need to sign in.</p>
      <button
        onclick={signIn}
        class="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition hover:scale-105"
      >
        Sign In
      </button>
    </div>
  </section>
  