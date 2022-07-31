<script>
    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';
    import Hero from '$lib/components/hero.svelte';

    import { currentOrUpcomingASchedule } from '$lib/stores';

    const getGames = () => {
        const dt = new Date();

        if ($currentOrUpcomingASchedule.year !== dt.getFullYear().toString()) {
            return $currentOrUpcomingASchedule.schedule?.games;
        }

        const games = $currentOrUpcomingASchedule.schedule?.games;

        if (games?.length) {
            let index = games.findIndex((g) => new Date(g.date).getTime() > dt.getTime());

            if (index >= 0 && games[index + 1]) {
                return games.slice(index + 1);
            }
        }
        return null;
    };

    $: upcomingGames = $currentOrUpcomingASchedule?.hasOwnProperty('schedule') ? getGames() : null;
</script>

<div class="min-h-[75vh]">
    <Hero />

    {#if upcomingGames?.length}
        <div class="mt-6">
            <div class="flex items-end">
                {#if $currentOrUpcomingASchedule?.hasOwnProperty('year')}
                    <h3 class="text-2xl font-semibold mr-2">{$currentOrUpcomingASchedule?.year}</h3>
                {/if}
                <h4 class="text-xl">Tym A</h4>
            </div>

            <List>
                {#each upcomingGames as game}
                    <ListItem {game} clickable />
                {/each}
            </List>
        </div>
    {/if}
</div>
