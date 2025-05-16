<script lang="ts">
    import GameCard from "../../components/GameCard.svelte";

    let { data } = $props()

</script>

{#if data.gamesList === null}
    <p>Loading games...</p>
{:else}
    {#each data.gamesList as game}
        <GameCard gameId={game.id} opponent={game.opponent} score1={game.scoreTeam1} score2={game.scoreTeam2} />
    {/each}
{/if}