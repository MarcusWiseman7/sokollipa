<script lang="ts">
    // types
    import type { ITeam } from '$lib/ts-interfaces';

    // components
    import Player from '$lib/components/player.svelte';

    /** @type {import('./$types').PageData} */
    export let data: { res: ITeam };

    // data
    $: team = data?.res;
</script>

<svelte:head>
    <title>Sokol Lípa | Týmy</title>
    <meta property="og:title" content="Sokol Lípa | Týmy" />
    <meta property="og:url" content="https://sokollipa.cz/teams/" />
</svelte:head>

<div class="page">
    {#if team?.players?.length}
        <div class="players grid grid-cols-1 gap-7 my-10">
            {#each team.players as player}
                <Player {player} />
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .players {
        display: grid;
        gap: 40px;
    }
</style>
