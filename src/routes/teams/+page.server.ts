import sanity from '$lib/sanity';
import type { ITeam } from '$lib/ts-interfaces';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
    const teamQuery: string = `*[_type == 'team' && name == 'Lípa'][0]`;
    const res: ITeam = await sanity.fetch(teamQuery);

    return { res };
}
