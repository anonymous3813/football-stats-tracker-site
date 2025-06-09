<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
  import { signIn } from '$lib/auth_utils';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');

	async function handleSignIn(event: Event) {
		event.preventDefault();

		try {
			const user = await signIn(email, password);
			alert('Logged in as: ' + user.email);
      goto('/'); 
		} catch (error) {
			console.error('Sign-in error:', error);
			alert('Failed to sign in. Please check your credentials.');
		}
	}
</script>

<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			class="relative px-4 py-10 bg-white shadow-xl sm:rounded-3xl sm:p-20 transform transition-all duration-300"
		>
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-3xl font-semibold text-center text-gray-800">Login</h1>
				</div>
				<div class="divide-y divide-gray-200">
					<form
						onsubmit={handleSignIn}
						class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
					>
						<!-- Email Field -->
						<div class="relative">
							<input
								id="email"
								name="email"
								type="text"
								autocomplete="off"
								bind:value={email}
								class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
								placeholder="Email address"
							/>
							<label
								for="email"
								class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
							>
								Email Address
							</label>
						</div>

						<!-- Password Field -->
						<div class="relative">
							<input
								id="password"
								name="password"
								type="password"
								autocomplete="off"
								bind:value={password}
								class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
								placeholder="Password"
							/>
							<label
								for="password"
								class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
							>
								Password
							</label>
						</div>

						<!-- Submit Button -->
						<div class="relative">
							<button
								type="submit"
								class="bg-blue-600 text-white rounded-md px-2 py-2 w-full mt-6 transform transition-all duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
							>
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Sign Up Redirect -->
			<p class="text-center text-sm text-gray-600 dark:text-gray-400">
				Don't have an account? <a href="/signup" class="text-blue-600 hover:text-blue-700"
					>Sign Up</a
				>
			</p>

			<!-- Google Sign-In Button -->
			<div class="w-full flex justify-center mt-8">
				<button
					class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					<svg
						class="h-6 w-6 mr-2"
						xmlns="http://www.w3.org/2000/svg"
						width="800px"
						height="800px"
						viewBox="-0.5 0 48 48"
					>
						<path d="M9.82727273,24..." fill="#FBBC05"></path>
						<path d="M23.7136364,10.13..." fill="#EB4335"></path>
						<path d="M23.7136364,37.86..." fill="#34A853"></path>
						<path d="M46.1454545,24..." fill="#4285F4"></path>
					</svg>
					<span>Continue with Google</span>
				</button>
			</div>
		</div>
	</div>
</div>
