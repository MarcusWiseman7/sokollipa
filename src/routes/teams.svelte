<script lang="ts">
    import Tabs from '$lib/components/tabs.svelte';
    import { lipaA, activeTab } from '$lib/stores';
    import Player from '$lib/components/player.svelte';
</script>

<Tabs />

{#if $lipaA?.players?.length && $activeTab === 'Tym A'}
    <div class="grid grid-cols-1 gap-7 mt-10">
        {#each $lipaA.players as player}
            <Player {player} />
        {/each}
    </div>
{/if}
