<script lang="ts">
    // types
    import type { IGame, ISeason } from '$lib/ts-interfaces';
    import type { SanityImageAssetDocument } from '@sanity/client';
    interface IGetGames {
        games: IGame[];
        year: string;
    }

    // components
    import List from '$lib/components/list.svelte';
    import ListItem from '$lib/components/listItem.svelte';
    import Hero from '$lib/components/hero.svelte';

    /** @type {import('./$types').PageData} */
    export let data: {
        hero: SanityImageAssetDocument;
        nextGame?: IGame;
        currentOrUpcomingASeason?: ISeason;
        lastASeason?: ISeason;
    };

    const getGames = (): IGetGames | null => {
        if (data) {
            const { currentOrUpcomingASeason, lastASeason } = data;
            if (currentOrUpcomingASeason?.schedule) {
                const { year, schedule } = currentOrUpcomingASeason;
                const dt = new Date();

                // next season
                if (year !== dt.getFullYear().toString())
                    return { games: schedule?.games || [], year: year.toString() };

                // this season
                const games = schedule?.games;

                if (games?.length) {
                    let index = games.findIndex((g) => new Date(g.date).getTime() > dt.getTime());

                    if (index >= 0 && games[index + 1]) {
                        return { games: games.slice(index + 1) || [], year: year.toString() };
                    } else {
                        return { games, year };
                    }
                }
            } else if (lastASeason?.year && lastASeason.schedule) {
                // last season
                return { games: lastASeason.schedule.games || [], year: lastASeason.year.toString() };
            }
        }

        return null;
    };

    $: season = data ? getGames() : null;
</script>

<svelte:head>
    <title>Sokol Lípa</title>
    <meta property="og:title" content="Sokol Lípa" />
    <meta property="og:url" content="https://sokollipa.cz/" />
</svelte:head>

<div class="page">
    {#if data?.hero}
        <Hero hero={data.hero} nextGame={data.nextGame} />
    {/if}

    {#if season}
        <div class="games">
            <div class="games__title">
                {#if season.year}
                    <h3 class="games__year">{season.year}</h3>
                {/if}
                <h4 class="games__team">Tym A</h4>
            </div>

            <List>
                {#each season.games as game}
                    <ListItem {game} clickable />
                {/each}
            </List>
        </div>
    {/if}
</div>

<style lang="scss">
    .games {
        &__title {
            display: flex;
            justify-content: center;
            font-size: 32px;
            line-height: 36px;
            padding: 40px 0 20px;

            @media (min-width: 1024px) {
                font-size: 42px;
                line-height: 1;
                padding: 50px 0 30px;
            }
        }

        &__year {
            margin-right: 6px;
        }
    }
</style>
