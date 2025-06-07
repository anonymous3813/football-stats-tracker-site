<script lang="ts">
    let drives = [
        {
            id: 1,
            title: "Drive 1 – 75 yards, 6 plays",
            result: "Touchdown",
            plays: [
                "1st & 10: Run left for 7 yards",
                "2nd & 3: Pass complete for 12 yards",
                "1st & 10: Sack for -5 yards",
                "2nd & 15: Deep pass TD",
            ],
        },
        {
            id: 2,
            title: "Drive 2 – 45 yards, 4 plays",
            result: "Field Goal",
            plays: [
                "1st & 10: Incomplete pass",
                "2nd & 10: Draw play for 15 yards",
                "1st & 10: Run for 8 yards",
                "2nd & 2: FG Attempt Good",
            ],
        },
    ];

    let openDrive: number | null = null;

    function toggleDrive(id: number) {
        openDrive = openDrive === id ? null : id;
    }
</script>

<div class="max-w-xl mx-auto space-y-4 px-4 py-6 font-sans">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Game Drives</h2>

    {#each drives as drive}
        <div class="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            <button
                class="w-full flex items-center justify-between p-5 text-left transition-all duration-300 ease-in-out
                       {openDrive === drive.id ? 'bg-indigo-50 text-indigo-700 rounded-t-xl' : 'hover:bg-gray-50'}"
                onclick={() => toggleDrive(drive.id)}
            >
                <div>
                    <p class="text-lg font-semibold">{drive.title}</p>
                    <p class="text-sm {openDrive === drive.id ? 'text-indigo-600' : 'text-gray-500'}">
                        Result: <span class="font-medium">{drive.result}</span>
                    </p>
                </div>
                <span class="text-2xl transition-transform duration-300 ease-in-out transform
                             {openDrive === drive.id ? 'rotate-180 text-indigo-500' : 'text-gray-400'}">
                    {openDrive === drive.id ? '−' : '+'}
                </span>
            </button>

            {#if openDrive === drive.id}
                <div class="border-t border-gray-200 bg-gray-50 px-5 py-4 animate-fade-in-down">
                    <p class="text-base font-medium text-gray-700 mb-3">Plays:</p>
                    <ul class="space-y-3">
                        {#each drive.plays as play}
                            <li class="flex items-start text-sm text-gray-800 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                {play}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    /* Custom animation for play details */
    .animate-fade-in-down {
        animation: fadeInDown 0.3s ease-out;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>