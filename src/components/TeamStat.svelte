<script>
    let { opponentName, statName, teamAValue, teamBValue } = $props();

    // Compute bar widths
    const totalStat = teamAValue + teamBValue;
    let teamAPercentage = $state(0);
    let teamBPercentage = $state(0);

    if (totalStat > 0) { // Check for division by zero
        teamAPercentage = (teamAValue / totalStat) * 100;
        teamBPercentage = (teamBValue / totalStat) * 100;
        
    } 
</script>

<div class="bg-gray-500 rounded-lg p-4 m-4 text-white"> 
    <div class="flex items-center justify-between mb-2">
        <span class="text-lg font-semibold">{teamAValue}</span>
        <span class="text-lg font-semibold">{statName}</span>
        <span class="text-lg font-semibold">{teamBValue}</span>
    </div>

    
    <div class="w-full bg-red-600 h-2.5 dark:bg-gray-700">
        <div class="bg-blue-600 h-2.5" style="width: {teamAPercentage}%"></div>
    </div>
  
</div>