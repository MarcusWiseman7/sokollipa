// types
import type { IGame, ISeason } from '$lib/ts-interfaces';
import type { SanityImageAssetDocument } from '@sanity/client';

import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const heroQuery: string = `*[_type == 'hero'][0]{image}`;
    const hero: SanityImageAssetDocument = await sanity.fetch(heroQuery);

    const seasonsQuery: string = `
        *[_type == 'season']{
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
    const seasons: ISeason[] = await sanity.fetch(seasonsQuery);

    const dt = new Date();
    const currentYear = dt.getFullYear();
    const currentTime = dt.getTime();

    // get last lipa a season
    const lastSeason: ISeason = seasons
        ?.filter(s => s.year < currentYear)
        ?.sort((a, b) => parseInt(a.year.toString()) - parseInt(b.year.toString()))[0];
    const lastASeason: ISeason = { ...lastSeason };
    lastASeason.schedule = lastSeason?.schedules?.find(s => s.league?.name === 'Tym A');
    delete lastASeason.schedules;

    // get current or next lipa a season
    const currentOrUpcomingSeason: ISeason = seasons
        ?.filter(s => s.year >= currentYear)
        ?.sort((a, b) => parseInt(a.year.toString()) - parseInt(b.year.toString()))[0];
    const currentOrUpcomingASeason: ISeason = { ...currentOrUpcomingSeason };
    currentOrUpcomingASeason.schedule = currentOrUpcomingSeason?.schedules?.find(s => s.league?.name === 'Tym A');
    delete currentOrUpcomingASeason.schedules;

    // get next lipa a game
    const nextGame: IGame | undefined = currentOrUpcomingASeason?.schedule?.games?.find(g => new Date(g.date).getTime() > currentTime);

    return { hero: hero.image, currentOrUpcomingASeason, nextGame, lastASeason };
}
