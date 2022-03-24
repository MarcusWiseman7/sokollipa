<script>
    import sanity from '$lib/sanity';

    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';

    const query = `
            *[_type == 'game']
            {
                _id,
                date, 
                description, 
                homeTeam->{name, logo}, 
                awayTeam->{name, logo}, 
                homeTeamScore, 
                awayTeamScore,
                image,
            }
        `;
    let games = [];
    (async () => (games = await sanity.fetch(query)))();
</script>

<List>
    {#each games as game}
        <ListItem {game} clickable={true} />
    {/each}
</List>
