<script>
    import sanity from '$lib/sanity';

    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';

    const query = `
            *[_type == 'season']
            {
                _id,
                year,
                "schedules": schedules[]{
                    _id,
                    league->{name},
                    "games": games[]{
                        awayTeam->{name, logo},
                        homeTeam->{name, logo},
                        awayTeamScore,
                        homeTeamScore,
                        date,
                    },
                },
            }
        `;
    let seasons = [];
    (async () => (seasons = await sanity.fetch(query)))();
</script>

<div>
    {#each seasons as { _id, year, schedules } (_id)}
        <div class="mt-6">
            <h3 class="text-2xl font-semibold mb-2">{year}</h3>

            {#if schedules?.length}
                {#each schedules as { _id, league, games }}
                    <li>{league.name}</li>

                    {#if games?.length}
                        <List>
                            {#each games as game}
                                <ListItem {game} clickable={true} />
                            {/each}
                        </List>
                    {/if}
                {/each}
            {/if}
        </div>
    {/each}
</div>
