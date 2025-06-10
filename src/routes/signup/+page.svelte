<script lang="ts">
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { signUp } from '$lib/auth_utils';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let fullName = $state('');

	function onGoogleClick() {
		alert('Google sign-in is not implemented yet');
	}

	async function handleSignup(e: Event) {
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		e.preventDefault();
		try {
			const user = await signUp(email, password);
			await updateProfile(user, {
				displayName: fullName,
			})
				
			alert('Signed up as: ' + user.email);
			goto('/');
		} catch (error) {
			console.error('Signup error:', error);
			alert(`Error: ${(error as any).message}`);
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
	<div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
		<h1 class="text-2xl font-bold mb-6 text-gray-800 text-center">Create an account</h1>

		<button
			onclick={onGoogleClick}
			class="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-xl shadow-sm hover:shadow-md transition"
		>
			<img
				src="https://www.svgrepo.com/show/475656/google-color.svg"
				alt="Google"
				class="h-5 w-5"
			/>
			Continue with Google
		</button>

		<div class="flex items-center my-6">
			<hr class="flex-grow border-t border-gray-300" />
			<span class="mx-4 text-gray-400 text-sm">OR</span>
			<hr class="flex-grow border-t border-gray-300" />
		</div>

		<form onsubmit={handleSignup} class="space-y-4">
			<input
				type="text"
				placeholder="Full Name"
				bind:value={fullName}
				class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>

			<input
				type="email"
				placeholder="Email"
				bind:value={email}
				class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>

			<input
				type="password"
				placeholder="Password"
				bind:value={password}
				class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>

			<input
				type="password"
				placeholder="Confirm Password"
				bind:value={confirmPassword}
				class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				required
			/>

			<button
				type="submit"
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
			>
				Sign Up
			</button>
		</form>

		<p class="mt-4 text-sm text-center text-gray-500">
			Already have an account?
			<a href="/login" class="text-blue-600 hover:underline">Log in</a>
		</p>
	</div>
</div>
