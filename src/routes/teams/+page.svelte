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
