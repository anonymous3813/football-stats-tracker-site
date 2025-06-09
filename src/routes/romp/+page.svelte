<script lang="ts">
    // Dummy values for game details and team names for UI demonstration
    const teamName = 'Packers';
    const opponent = 'Lions';
    const scoreTeam1 = Math.floor(Math.random() * 50); // Random score
    const scoreTeam2 = Math.floor(Math.random() * 50); // Random score
    const gameDate = new Date(2023, 10, 15); // Example date

    // Dummy values for insights (randomized for variety)

    // Overall & General Stats
    const totalOffensiveYards = Math.floor(Math.random() * 500) + 200; // 200-700
    const totalOpponentYards = Math.floor(Math.random() * 450) + 150; // 150-600 (yards allowed by our defense)
    const avgYardsPerPlay = (Math.random() * 5 + 3).toFixed(2); // 3.00-8.00 (Offensive)
    const avgYardsPerPlayAllowed = (Math.random() * 4 + 2).toFixed(2); // 2.00-6.00 (Defensive)

    // Offensive Passing Stats
    const offensivePassingYards = Math.floor(Math.random() * 350) + 100; // 100-450
    const offensivePassingAttempts = Math.floor(Math.random() * 40) + 15; // 15-55
    const offensiveCompletions = Math.floor(offensivePassingAttempts * (Math.random() * 0.3 + 0.6)); // 60-90% of attempts
    const offensiveCompletionPercentage = offensivePassingAttempts > 0 ? ((offensiveCompletions / offensivePassingAttempts) * 100).toFixed(2) + '%' : '0.00%';
    const offensiveAvgYardsPerPass = offensivePassingAttempts > 0 ? (offensivePassingYards / offensivePassingAttempts).toFixed(2) : '0.00';
    const offensivePassingTDs = Math.floor(Math.random() * 4); // 0-3 passing TDs
    const offensiveInterceptions = Math.floor(Math.random() * 3); // 0-2 offensive interceptions

    // Offensive Rushing Stats
    const offensiveRushingYards = Math.floor(Math.random() * 200) + 50; // 50-250
    const offensiveRushAttempts = Math.floor(Math.random() * 30) + 10; // 10-40
    const offensiveAvgYardsPerRush = offensiveRushAttempts > 0 ? (offensiveRushingYards / offensiveRushAttempts).toFixed(2) : '0.00';
    const offensiveRushingTDs = Math.floor(Math.random() * 3); // 0-2 rushing TDs

    // Defensive/Opponent's Offensive Stats (framed as allowed)
    const opponentPassingYardsAllowed = Math.floor(Math.random() * 300) + 80; // 80-380
    const opponentPassingAttempts = Math.floor(Math.random() * 35) + 10; // 10-45
    const opponentCompletionsAllowed = Math.floor(opponentPassingAttempts * (Math.random() * 0.3 + 0.5)); // 50-80% of attempts
    const opponentCompletionPercentageAllowed = opponentPassingAttempts > 0 ? ((opponentCompletionsAllowed / opponentPassingAttempts) * 100).toFixed(2) + '%' : '0.00%';
    const opponentAvgYardsPerPassAllowed = opponentPassingAttempts > 0 ? (opponentPassingYardsAllowed / opponentPassingAttempts).toFixed(2) : '0.00';
    const opponentPassingTDsAllowed = Math.floor(Math.random() * 3); // 0-2 passing TDs allowed
    const opponentInterceptionsForced = Math.floor(Math.random() * 3); // 0-2 interceptions forced by our defense

    const opponentRushingYardsAllowed = Math.floor(Math.random() * 180) + 40; // 40-220
    const opponentRushAttempts = Math.floor(Math.random() * 25) + 8; // 8-33
    const opponentAvgYardsPerRushAllowed = opponentRushAttempts > 0 ? (opponentRushingYardsAllowed / opponentRushAttempts).toFixed(2) : '0.00';
    const opponentRushingTDsAllowed = Math.floor(Math.random() * 2); // 0-1 rushing TDs allowed

    // Other General Game Stats
    const firstDownsOffense = Math.floor(Math.random() * 25) + 10; // 10-35 offensive first downs
    const firstDownsDefense = Math.floor(Math.random() * 20) + 8; // 8-28 opponent first downs allowed
    const puntsOffense = Math.floor(Math.random() * 8); // 0-7 punts by our team
    const puntsDefense = Math.floor(Math.random() * 7); // 0-6 punts forced on opponent

    // Turnovers
    const offensiveFumblesLost = Math.floor(Math.random() * 2); // 0-1 fumbles lost
    const defensiveFumblesRecovered = Math.floor(Math.random() * 2); // 0-1 fumbles recovered

    // Combined TDs
    const offensiveTDs = offensivePassingTDs + offensiveRushingTDs;
    const opponentTDs = opponentPassingTDsAllowed + opponentRushingTDsAllowed;

    // Play Selection by Down (Offense) - counts for Pass, Run, Punt
    type PlaySelection = { Pass: number; Run: number; Punt: number };
    const offensivePlaySelectionByDown: Record<number, PlaySelection> = {
        1: { Pass: Math.floor(Math.random() * 10) + 5, Run: Math.floor(Math.random() * 10) + 5, Punt: 0 },
        2: { Pass: Math.floor(Math.random() * 8) + 4, Run: Math.floor(Math.random() * 8) + 4, Punt: 0 },
        3: { Pass: Math.floor(Math.random() * 7) + 3, Run: Math.floor(Math.random() * 7) + 3, Punt: Math.floor(Math.random() * 2) },
        4: { Pass: Math.floor(Math.random() * 3) + 1, Run: Math.floor(Math.random() * 3) + 1, Punt: Math.floor(Math.random() * 5) + 1 },
    };

    // Play Selection by Down (Defense / Opponent) - counts for Pass, Run, Punt
    const defensivePlaySelectionByDown: Record<number, PlaySelection> = {
        1: { Pass: Math.floor(Math.random() * 9) + 4, Run: Math.floor(Math.random() * 9) + 4, Punt: 0 },
        2: { Pass: Math.floor(Math.random() * 7) + 3, Run: Math.floor(Math.random() * 7) + 3, Punt: 0 },
        3: { Pass: Math.floor(Math.random() * 6) + 2, Run: Math.floor(Math.random() * 6) + 2, Punt: Math.floor(Math.random() * 2) },
        4: { Pass: Math.floor(Math.random() * 3) + 1, Run: Math.floor(Math.random() * 3) + 1, Punt: Math.floor(Math.random() * 5) + 1 },
    };


    // Helper for simple bar visualization (percentage based)
    function getBarWidth(value: number, max: number): string {
        if (max === 0) return '0%';
        return `${(value / max) * 100}%`;
    }

    // State to toggle between Offensive and Defensive insights
    let showOffensiveInsights = true; // true for offense, false for defense

    // Dummy or calculated average yards per down (offense)
    // Replace these with real calculations if available
    const yardsPerDown: Record<number, { avg: string }> = {
        1: { avg: (Math.random() * 6 + 2).toFixed(2) }, // 2-8 yards
        2: { avg: (Math.random() * 5 + 1).toFixed(2) }, // 1-6 yards
        3: { avg: (Math.random() * 7).toFixed(2) },     // 0-7 yards
        4: { avg: (Math.random() * 4).toFixed(2) },     // 0-4 yards
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8 sm:p-12 font-inter">
    <div class="max-w-6xl mx-auto space-y-10">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 leading-tight">
            Game Insights: {teamName} vs {opponent}
        </h1>
        <p class="text-lg text-center text-gray-600">
            Final Score: <span class="font-bold text-blue-700">{scoreTeam1}</span> - <span class="font-bold text-red-700">{scoreTeam2}</span>
            <span class="block text-sm text-gray-500">({gameDate.toLocaleDateString()})</span>
        </p>

        <!-- Big Card: Offensive/Defensive Insights Toggle -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 col-span-full">
            <!-- Toggle Buttons -->
            <div class="flex justify-center mb-6">
                <button
                    class={`px-6 py-3 rounded-l-lg font-bold text-lg transition-colors duration-200 ${showOffensiveInsights ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onclick={() => (showOffensiveInsights = true)}
                >
                    Offensive Insights
                </button>
                <button
                    class={`px-6 py-3 rounded-r-lg font-bold text-lg transition-colors duration-200 ${!showOffensiveInsights ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onclick={() => (showOffensiveInsights = false)}
                >
                    Defensive Insights
                </button>
            </div>

            {#if showOffensiveInsights}
                <!-- Offensive Insights Content -->
                <h2 class="text-3xl font-bold text-center text-green-700 mb-8">{teamName} Offense Summary</h2>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <!-- Section: Overall Offensive Summary -->
                    <div class="lg:col-span-1 bg-green-50 p-5 rounded-lg border border-green-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-green-800 mb-4">Overall</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Total Yards: <span class="font-bold text-green-600">{totalOffensiveYards}</span></p>
                            <p class="text-lg text-gray-700">Avg. Yards/Play: <span class="font-bold">{avgYardsPerPlay}</span></p>
                            <p class="text-lg text-gray-700">First Downs: <span class="font-bold">{firstDownsOffense}</span></p>
                            <p class="text-lg text-gray-700">Total TDs: <span class="font-bold text-yellow-600">{offensiveTDs}</span></p>
                        </div>
                    </div>

                    <!-- Section: Offensive Passing Stats -->
                    <div class="lg:col-span-1 bg-blue-50 p-5 rounded-lg border border-blue-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-blue-800 mb-4">Passing</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Yards: <span class="font-bold">{offensivePassingYards}</span></p>
                            <p class="text-lg text-gray-700">Comp: <span class="font-bold">{offensiveCompletions}/{offensivePassingAttempts}</span></p>
                            <p class="text-lg text-gray-700">Comp. %: <span class="font-bold">{offensiveCompletionPercentage}</span></p>
                            <p class="text-lg text-gray-700">Avg/Att: <span class="font-bold">{offensiveAvgYardsPerPass}</span></p>
                            <p class="text-lg text-gray-700">Passing TDs: <span class="font-bold text-yellow-600">{offensivePassingTDs}</span></p>
                        </div>
                    </div>

                    <!-- Section: Offensive Rushing Stats -->
                    <div class="lg:col-span-1 bg-orange-50 p-5 rounded-lg border border-orange-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-orange-800 mb-4">Rushing</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Yards: <span class="font-bold">{offensiveRushingYards}</span></p>
                            <p class="text-lg text-gray-700">Attempts: <span class="font-bold">{offensiveRushAttempts}</span></p>
                            <p class="text-lg text-gray-700">Avg/Rush: <span class="font-bold">{offensiveAvgYardsPerRush}</span></p>
                            <p class="text-lg text-gray-700">Rushing TDs: <span class="font-bold text-yellow-600">{offensiveRushingTDs}</span></p>
                        </div>
                    </div>

                    <!-- Section: Offensive Turnovers -->
                    <div class="lg:col-span-1 bg-red-50 p-5 rounded-lg border border-red-200">
                        <h3 class="text-xl font-semibold text-red-800 mb-4">Turnovers</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Interceptions: <span class="font-bold">{offensiveInterceptions}</span></p>
                            <p class="text-lg text-gray-700">Fumbles Lost: <span class="font-bold">{offensiveFumblesLost}</span></p>
                            <p class="text-lg text-gray-700">Total Turnovers: <span class="font-bold text-red-600">{offensiveInterceptions + offensiveFumblesLost}</span></p>
                        </div>
                    </div>

                    <!-- Section: Offensive Play Selection By Down -->
                    <div class="lg:col-span-2 bg-purple-50 p-5 rounded-lg border border-purple-200">
                        <h3 class="text-xl font-semibold text-purple-800 mb-4">Play Selection by Down</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {#each [1, 2, 3, 4] as down (down)}
                                {@const downStats = offensivePlaySelectionByDown[down]}
                                {@const totalPlaysInDown = downStats.Pass + downStats.Run + downStats.Punt}
                                <div class="bg-purple-100 p-3 rounded-lg shadow-sm">
                                    <h4 class="text-md font-bold text-purple-900 mb-2">{down}{down === 1 ? 'st' : down === 2 ? 'nd' : down === 3 ? 'rd' : 'th'} Down</h4>
                                    <p class="text-sm text-gray-700">Pass: <span class="font-bold">{downStats.Pass}</span> ({totalPlaysInDown > 0 ? ((downStats.Pass / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    <p class="text-sm text-gray-700">Run: <span class="font-bold">{downStats.Run}</span> ({totalPlaysInDown > 0 ? ((downStats.Run / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    {#if downStats.Punt > 0}
                                        <p class="text-sm text-gray-700">Punt: <span class="font-bold">{downStats.Punt}</span> ({totalPlaysInDown > 0 ? ((downStats.Punt / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                        <p class="text-sm text-gray-500 mt-4">Frequency of offensive play types on each down.</p>
                    </div>
                </div>

            {:else}
                <!-- Defensive Insights Content (Opponent's Offense) -->
                <h2 class="text-3xl font-bold text-center text-red-700 mb-8">{teamName} Defense vs {opponent} Offense Summary</h2>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <!-- Section: Overall Defensive Summary -->
                    <div class="lg:col-span-1 bg-red-50 p-5 rounded-lg border border-red-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-red-800 mb-4">Overall Allowed</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Total Yards Allowed: <span class="font-bold text-red-600">{totalOpponentYards}</span></p>
                            <p class="text-lg text-gray-700">Avg. Yards/Play Allowed: <span class="font-bold">{avgYardsPerPlayAllowed}</span></p>
                            <p class="text-lg text-gray-700">First Downs Allowed: <span class="font-bold">{firstDownsDefense}</span></p>
                            <p class="text-lg text-gray-700">Total TDs Allowed: <span class="font-bold text-yellow-600">{opponentTDs}</span></p>
                        </div>
                    </div>

                    <!-- Section: Opponent Passing (Allowed) -->
                    <div class="lg:col-span-1 bg-blue-50 p-5 rounded-lg border border-blue-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-blue-800 mb-4">Opponent Passing</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Yards Allowed: <span class="font-bold">{opponentPassingYardsAllowed}</span></p>
                            <p class="text-lg text-gray-700">Comp: <span class="font-bold">{opponentCompletionsAllowed}/{opponentPassingAttempts}</span></p>
                            <p class="text-lg text-gray-700">Comp. %: <span class="font-bold">{opponentCompletionPercentageAllowed}</span></p>
                            <p class="text-lg text-gray-700">Avg/Att: <span class="font-bold">{opponentAvgYardsPerPassAllowed}</span></p>
                            <p class="text-lg text-gray-700">Passing TDs Allowed: <span class="font-bold text-yellow-600">{opponentPassingTDsAllowed}</span></p>
                        </div>
                    </div>

                    <!-- Section: Opponent Rushing (Allowed) -->
                    <div class="lg:col-span-1 bg-orange-50 p-5 rounded-lg border border-orange-200 flex flex-col justify-between">
                        <h3 class="text-xl font-semibold text-orange-800 mb-4">Opponent Rushing</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Yards Allowed: <span class="font-bold">{opponentRushingYardsAllowed}</span></p>
                            <p class="text-lg text-gray-700">Attempts: <span class="font-bold">{opponentRushAttempts}</span></p>
                            <p class="text-lg text-gray-700">Avg/Rush: <span class="font-bold">{opponentAvgYardsPerRushAllowed}</span></p>
                            <p class="text-lg text-gray-700">Rushing TDs Allowed: <span class="font-bold text-yellow-600">{opponentRushingTDsAllowed}</span></p>
                        </div>
                    </div>

                    <!-- Section: Defensive Turnovers -->
                    <div class="lg:col-span-1 bg-green-50 p-5 rounded-lg border border-green-200">
                        <h3 class="text-xl font-semibold text-green-800 mb-4">Turnovers Forced</h3>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-700">Interceptions: <span class="font-bold">{opponentInterceptionsForced}</span></p>
                            <p class="text-lg text-gray-700">Fumbles Recovered: <span class="font-bold">{defensiveFumblesRecovered}</span></p>
                            <p class="text-lg text-gray-700">Total Takeaways: <span class="font-bold text-green-600">{opponentInterceptionsForced + defensiveFumblesRecovered}</span></p>
                        </div>
                    </div>

                     <!-- Section: Defensive Play Selection (Opponent's Play Selection By Down) -->
                    <div class="lg:col-span-2 bg-purple-50 p-5 rounded-lg border border-purple-200">
                        <h3 class="text-xl font-semibold text-purple-800 mb-4">Opponent Play Selection by Down</h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {#each [1, 2, 3, 4] as down (down)}
                                {@const downStats = defensivePlaySelectionByDown[down]}
                                {@const totalPlaysInDown = downStats.Pass + downStats.Run + downStats.Punt}
                                <div class="bg-purple-100 p-3 rounded-lg shadow-sm">
                                    <h4 class="text-md font-bold text-purple-900 mb-2">{down}{down === 1 ? 'st' : down === 2 ? 'nd' : down === 3 ? 'rd' : 'th'} Down</h4>
                                    <p class="text-sm text-gray-700">Pass: <span class="font-bold">{downStats.Pass}</span> ({totalPlaysInDown > 0 ? ((downStats.Pass / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    <p class="text-sm text-gray-700">Run: <span class="font-bold">{downStats.Run}</span> ({totalPlaysInDown > 0 ? ((downStats.Run / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    {#if downStats.Punt > 0}
                                        <p class="text-sm text-gray-700">Punt: <span class="font-bold">{downStats.Punt}</span> ({totalPlaysInDown > 0 ? ((downStats.Punt / totalPlaysInDown) * 100).toFixed(0) : 0}%)</p>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                        <p class="text-sm text-gray-500 mt-4">Frequency of opponent's play types on each down.</p>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Remaining smaller cards (now outside the main toggle) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Card: Average Yards Per Down (Offense) - Moved here to be a consistent display regardless of main toggle -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 col-span-1 md:col-span-2 lg:col-span-1">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Average Yards Per Down (Offense)</h2>
                <div class="space-y-4">
                    {#each [1, 2, 3, 4] as down (down)}
                        <div class="flex items-center space-x-4">
                            <span class="w-16 text-right font-medium text-gray-700">{down}{down === 1 ? 'st' : down === 2 ? 'nd' : down === 3 ? 'rd' : 'th'} Down:</span>
                            <div class="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                                <div
                                    class="bg-blue-500 h-full rounded-full transition-all duration-500"
                                    style="width: {getBarWidth(parseFloat(yardsPerDown[down].avg), 15)};"
                                ></div>
                                <span class="absolute inset-0 flex items-center pl-3 text-sm font-bold text-blue-900">
                                    {yardsPerDown[down].avg} Yds
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
                <p class="text-sm text-gray-500 mt-4">Average offensive yards gained on each down.</p>
            </div>

            <!-- Card: Key Play Indicators (General) -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Game Indicators</h2>
                <div class="space-y-3">
                    <p class="text-lg text-gray-700">{teamName} Punts: <span class="font-bold">{puntsOffense}</span></p>
                    <p class="text-lg text-gray-700">{opponent} Punts: <span class="font-bold">{puntsDefense}</span></p>
                </div>
            </div>

        </div>
    </div>
</div>
