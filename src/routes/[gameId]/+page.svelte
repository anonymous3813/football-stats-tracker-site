<script lang="ts">
	import type { BoxScore, Play, Player } from "$lib/types";
    import PlayCard from "../../components/PlayCard.svelte";
    import type { PageProps } from './$types';
    import TeamStat from "../../components/TeamStat.svelte";
	import { calculatePasserRating } from "$lib/utils";

    let selectedTab = $state(1);
    let { data }: PageProps = $props();
    let gamePlays: Play[] | undefined = $state([]);
    let boxScore: BoxScore | undefined;

    let boxScoreList: { label: string; players: Player[] }[] = $state([]);
    // svelte-ignore non_reactive_update
        let teamStatList: { label: string; offValue: number, defValue: number }[];
    let playerDetail: Player | undefined = $state(undefined);
    let playerDetailsOpen = $state(false);
    let sortBy = $state("name");
    let sortOrder = $state("asc");
    
    function onclick(newTab: number) {
        selectedTab = newTab;
    }

   
    if(data.game && data.boxScore) {
        gamePlays = data.game.plays;
        boxScore = data.boxScore;
        boxScoreList = [
            { label: "Passing", players: boxScore.passingPlayers },
            { label: "Rushing", players: boxScore.rushingPlayers },
            { label: "Receiving", players: boxScore.receivingPlayers },
            { label: "Tacklers", players: boxScore.tacklers },
            { label: "Defensive Backs", players: boxScore.dbs }
        ]
        teamStatList = [
            { label: "Passes", offValue: boxScore.teamStats.passes, defValue: boxScore.teamStats.defPassPlays },
            { label: "Passing Yards", offValue: boxScore.teamStats.passingYards, defValue: boxScore.teamStats.passingYardsAllowed },
            { label: "Rushing Yards", offValue: boxScore.teamStats.rushingYards, defValue: boxScore.teamStats.rushingYardsAllowed },
            { label: "Rushes", offValue: boxScore.teamStats.rushes, defValue: boxScore.teamStats.defRushPlays },
            { label: "Turnovers Committed", offValue: boxScore.teamStats.turnoversCommitted, defValue: boxScore.teamStats.turnoversForced },
        ]
    }
</script>

<div class="relative flex items-center justify-center bg-gray-100">
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 flex space-x-4 font-bold">
        <button 
            class="px-4 py-2 rounded-lg transition-all duration-300"
            class:bg-blue-500={selectedTab === 1}
            class:text-white={selectedTab === 1}
            class:text-blue-500={selectedTab !== 1} 
            onclick={() => onclick(1)}
        >
            Plays
        </button>
        <button 
            class="px-4 py-2 rounded-lg transition-all duration-300 font-bold"
            class:bg-blue-500={selectedTab === 2}
            class:text-white={selectedTab === 2}
            class:text-blue-500={selectedTab !== 2}  
            onclick={() => onclick(2)}
        >
            Player Stats
        </button>
        <button 
            class="px-4 py-2 rounded-lg transition-all duration-300 fond-bold"
            class:bg-blue-500={selectedTab === 3}
            class:text-white={selectedTab === 3} 
            class:text-blue-500={selectedTab !== 3} 
            onclick={() => onclick(3)}
        >
            Team Stats
        </button>
    </div>
</div>

{#if selectedTab === 1}
    {#if gamePlays && gamePlays.length > 0}
        {#each gamePlays as play, index}
            <PlayCard {play} {index} />
        {/each}
    {:else}
        <p>No games available.</p>
    {/if}
{:else if selectedTab === 2}
    {#if boxScoreList}
        <div class="flex flex-wrap justify-evenly gap-4">
            {#if boxScoreList}
            {#each boxScoreList as group}
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-xl p-4">
                <h2 class="text-xl font-bold mb-4 text-center">{group.label}</h2>
                {#if group.players && group.players.length > 0}
                    <div class="overflow-x-auto">
                    <table class="min-w-full text-sm bg-white rounded-lg">
                        <thead>
                        <tr class="bg-gray-200">
                            <th class="py-2 px-4">Player</th>
                            {#if group.label === "Rushing"}
                            <th class="py-2 px-4">Rushes</th>
                            <th class="py-2 px-4">Yards</th>
                            <th class="py-2 px-4">TD</th>
                            {:else if group.label === "Receiving"}
                            <th class="py-2 px-4">Catches</th>
                            <th class="py-2 px-4">Yards</th>
                            <th class="py-2 px-4">TD</th>
                            {:else if group.label === "Passing"}
                            <th class="py-2 px-4">Comp/Att</th>
                            <th class="py-2 px-4">Avg</th>
                            <th class="py-2 px-4">Yards</th>
                            <th class="py-2 px-4">TD</th>
                            <th class="py-2 px-4">INT</th>
                            <th class="py-2 px-4">Sack</th>
                            <th class="py-2 px-4">RTG</th>
                            {:else if group.label === "Tacklers"}
                            <th class="py-2 px-4">Flag Pulls</th>
                            {:else if group.label === "Defensive Backs"}
                            <th class="py-2 px-4">Interceptions</th>
                            <th class="py-2 px-4">Pass Breakups</th>
                            {/if}
                        </tr>
                        </thead>
                        <tbody>
                        {#each group.players.filter(p => p.id) as player}
                            <tr class="hover:bg-gray-100 transition duration-200" onclick={() => {
                                playerDetailsOpen = true
                                playerDetail = player
                            }}>
                            <td class="py-2 px-4">#{player.id}</td>
                            {#if group.label === "Rushing"}
                                <td class="py-2 px-4">{player.rushingAttempts}</td>
                                <td class="py-2 px-4">{player.rushingYards}</td>
                                <td class="py-2 px-4">{player.rushingTd}</td>
                            {:else if group.label === "Receiving"}
                                <td class="py-2 px-4">{player.catches}</td>
                                <td class="py-2 px-4">{player.receivingYards}</td>
                                <td class="py-2 px-4">{player.receivingTd}</td>
                            {:else if group.label === "Passing"}
                                <td class="py-2 px-4">{player.completions}/{player.passingAttempts}</td>
                                <td class="py-2 px-4">{(player.passingYards/player.passingAttempts).toFixed(2)}</td>
                                <td class="py-2 px-4">{player.passingYards}</td>
                                <td class="py-2 px-4">{player.passingTd}</td>
                                <td class="py-2 px-4">{player.interceptions}</td>
                                <td class="py-2 px-4">{player.sacked}</td>
                                <td class="py-2 px-4">{calculatePasserRating(player)}</td>
                            {:else if group.label === "Tacklers"}
                                <td class="py-2 px-4">{player.flagPulls}</td>
                            {:else if group.label === "Defensive Backs"}
                                <td class="py-2 px-4">{player.defInterceptions}</td>
                                <td class="py-2 px-4">{player.pbu}</td>
                            {/if}
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                    </div>
                {:else}
                    <p class="text-center py-4 text-gray-500">No players available.</p>
                {/if}
                </div>
            {/each}
            {/if}
      </div>    
    {/if}
{:else}
      {#if teamStatList}
        {#each teamStatList as teamStat}
            <TeamStat opponentName={data.game?.opponent} statName={teamStat.label} teamAValue={teamStat.offValue} teamBValue={teamStat.defValue}/>
        {/each}
      {/if}
{/if}

{#if playerDetailsOpen && playerDetail}
<div
  id="small-modal"
  tabindex="-1"
  class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
>
  <div class="relative w-full max-w-md max-h-full">
    <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">
          Player #{playerDetail.id}
        </h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onclick={() => playerDetailsOpen = false}
        >
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal Body -->
      <div class="p-4 md:p-5 space-y-4">
        <!-- Row 1: Passing & Receiving -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Passing Stats -->
          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Passing</h4>
            <ul class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li><span class="font-medium">Comp/Att:</span> {playerDetail.completions}/{playerDetail.passingAttempts}</li>
              <li><span class="font-medium">Yards:</span> {playerDetail.passingYards}</li>
              <li><span class="font-medium">Touchdowns:</span> {playerDetail.passingTd}</li>
              <li><span class="font-medium">Interceptions:</span> {playerDetail.interceptions}</li>
              <li><span class="font-medium">Sacked:</span> {playerDetail.sacked}</li>
            </ul>
          </div>
          <!-- Receiving Stats -->
          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Receiving</h4>
            <ul class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li><span class="font-medium">Catches:</span> {playerDetail.catches}</li>
              <li><span class="font-medium">Yards:</span> {playerDetail.receivingYards}</li>
              <li><span class="font-medium">Touchdowns:</span> {playerDetail.receivingTd}</li>
            </ul>
          </div>
        </div>

        <!-- Row 2: Rushing & Defense -->
        <div class="grid grid-cols-2 gap-4">
          <!-- Rushing Stats -->
          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Rushing</h4>
            <ul class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li><span class="font-medium">Attempts:</span> {playerDetail.rushingAttempts}</li>
              <li><span class="font-medium">Yards:</span> {playerDetail.rushingYards}</li>
              <li><span class="font-medium">Touchdowns:</span> {playerDetail.rushingTd}</li>
            </ul>
          </div>
          <!-- Defense Stats -->
          <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Defense</h4>
            <ul class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
              <li><span class="font-medium">Defensive INTs:</span> {playerDetail.defInterceptions}</li>
              <li><span class="font-medium">PBU:</span> {playerDetail.pbu}</li>
              <li><span class="font-medium">Flag Pulls:</span> {playerDetail.flagPulls}</li>
            </ul>
          </div>
        </div>

        <!-- Row 3: Total Stats -->
        <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
          <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-2">Total</h4>
          <ul class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
            <li><span class="font-medium">Touches:</span> {playerDetail.catches + playerDetail.passingAttempts + playerDetail.rushingAttempts}</li>
            <li><span class="font-medium">Yards:</span> {playerDetail.passingYards + playerDetail.rushingYards + playerDetail.receivingYards}</li>
            <li><span class="font-medium">TDs:</span> {playerDetail.passingTd + playerDetail.rushingTd + playerDetail.receivingTd}</li>
            <li><span class="font-medium">First downs (Not passing):</span> {playerDetail.firstDowns}</li>
          </ul>
        </div>
      </div>
      <!-- Modal Footer -->
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onclick={() => playerDetailsOpen = false}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

{/if}
