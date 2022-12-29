// types
import type { ISeason } from '$lib/ts-interfaces';

import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
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
    const res: ISeason[] = await sanity.fetch(seasonsQuery);

    return { res };
}
