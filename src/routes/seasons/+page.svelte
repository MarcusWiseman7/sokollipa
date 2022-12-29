<script lang="ts">
    // types
    import type { ISeason } from '$lib/ts-interfaces';

    // components
    import Tabs from '$lib/components/tabs.svelte';
    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';

    // helpers
    import { activeTab } from '$lib/stores';

    /** @type {import('./$types').PageData} */
    export let data: { res: ISeason[] };

    // data
    $: seasons = data?.res;
</script>

<div class="page">
    <Tabs />

    {#if seasons?.length}
        <div class="seasons">
            {#each seasons as { _id, year, schedules } (_id)}
                {#if schedules?.length}
                    <div>
                        <h3 class="season__year">{year}</h3>

                        {#each schedules as { league, games }}
                            {#if league.name == $activeTab && games?.length}
                                <List>
                                    {#each games as game}
                                        <ListItem {game} clickable />
                                    {/each}
                                </List>
                            {:else if league.name == $activeTab}
                                <h4 class="season__no-games">No games found...</h4>
                            {/if}
                        {/each}
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .seasons {
        display: grid;
        gap: 40px;
    }

    .season {
        &__year {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 24px;
            line-height: 32px;
        }

        &__no-games {
            font-size: 20px;
            line-height: 28px;
        }
    }
</style>
