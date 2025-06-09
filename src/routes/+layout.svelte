<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { signOutUser } from '$lib/auth_utils'; // your custom sign-out function

	const auth = getAuth();
	let { children } = $props();
	let user = $state(auth.currentUser);
	let showMenu = $state(false);

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (u) => {
			user = u;
		});
		return () => unsubscribe();
	});

	function handleSignOut() {
		signOutUser()
			.then(() => {
				showMenu = false;
			})
			.catch((error) => {
				console.error('Sign-out failed:', error);
			});
	}
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
				
				{#if user}
					<!-- Profile Button -->
					<div class="relative">
						<button
							class="flex items-center gap-2 hover:bg-blue-700 px-3 py-1 rounded"
							onclick={() => showMenu = !showMenu}
						>
							<img
								src="https://ui-avatars.com/api/?name={user.displayName || user.email}&background=fff&color=000&size=32"
								alt="Avatar"
								class="rounded-full w-8 h-8"
							/>
							<span class="text-sm hidden sm:inline">{user.displayName || user.email}</span>
						</button>

						{#if showMenu}
							<div
								class="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50"
							>
								<button
									class="w-full text-left px-4 py-2 hover:bg-gray-100"
									onclick={handleSignOut}
								>
									Sign Out
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<a href="/login" class="hover:text-gray-200 text-sm">Sign In</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<main class="flex-grow">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-gray-900 text-gray-300 py-6 mt-12">
		<div
			class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
		>
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
