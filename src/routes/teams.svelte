<script lang="ts">
    import Tabs from '$lib/components/tabs.svelte';
    import { lipaA, activeTab } from '$lib/stores';
    import Player from '$lib/components/player.svelte';
</script>

<Tabs />

{#if $lipaA && $activeTab === 'Tym A'}
    {#each $lipaA.players as player}
        <Player {player} />
    {/each}
{/if}
