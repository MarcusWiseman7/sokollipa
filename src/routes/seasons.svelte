<script>
    import Tabs from '$lib/components/tabs.svelte';
    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';

    import { activeTab, seasons } from '$lib/stores';
</script>

<Tabs />

{#if $seasons}
    {#each $seasons as { _id, year, schedules } (_id)}
        {#if schedules?.length}
            <div class="mt-6">
                <h3 class="text-2xl font-semibold mb-2">{year}</h3>

                {#each schedules as { league, games }}
                    {#if league.name == $activeTab && games?.length}
                        <List>
                            {#each games as game}
                                <ListItem {game} clickable />
                            {/each}
                        </List>
                    {:else if league.name == $activeTab}
                        <h4 class="text-xl">No games found...</h4>
                    {/if}
                {/each}
            </div>
        {/if}
    {/each}
{/if}
