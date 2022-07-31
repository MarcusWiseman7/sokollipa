import { derived, readable, writable } from 'svelte/store';
import sanity from '$lib/sanity';
import type { SanityDocument } from '@sanity/client';
import type { Season, Team } from './ts-interfaces';

/**
 * WRITABLE EXPORTS
 */
export let activeTab = writable('Tym A');
export let scorecardObj = writable(null);
export let appLoading = writable(false);


/**
 * SANITY FETCH FUNCTIONS
 */
const getHeroImage = async (): Promise<SanityDocument[]> => {
    const heroQuery: string = `*[_type == 'hero']`;
    return await sanity.fetch(heroQuery);
};

const getGallery = async (): Promise<SanityDocument[]> => {
    const galleryQuery: string = `*[_type == 'photoGallery']`;
    return await sanity.fetch(galleryQuery);
};

const getTeams = async (): Promise<SanityDocument[]> => {
    const teamQuery: string = `*[_type == 'team']`;
    return await sanity.fetch(teamQuery);
}

const getSeasons = async (): Promise<SanityDocument[]> => {
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
    return await sanity.fetch(seasonsQuery);
};


/**
 * READABLE EXPORTS
 */
export const heroImage = readable(null, set => {
    getHeroImage().then(set).catch(err => console.error(err));
});

export const seasons = readable([], set => {
    getSeasons().then(set).catch(err => console.error(err));
});

export const teams = readable([], set => {
    getTeams().then(set).catch(err => console.error(err));
});

export const galleries = readable([], set => {
    getGallery().then(set).catch(err => console.error(err));
});


/**
 * DERIVED EXPORTS
 */
export const lipaA = derived(teams, ($teams: [Team]) => {
    if (!$teams) return null;
    const lipaA = $teams.find(t => t.name === 'Lípa');
    if (lipaA) return lipaA;
});

export const currentOrUpcomingASchedule = derived(seasons, ($seasons: [Season]) => {
    if (!$seasons) return null;
    const dt = new Date();
    const currentYear = dt.getFullYear();
    let schedule;
    let year;

    const possibleSeasons = $seasons.filter(s => s.year >= currentYear);
    if (possibleSeasons?.length) {
        for (let i = 0, j = possibleSeasons.length; i < j; i++) {
            schedule = possibleSeasons[i].schedules?.find(s => s.league?.name === 'Tym A');
            if (schedule) {
                year = possibleSeasons[i].year;
                break;
            }
        }
    }

    if (!schedule || !year) return null;
    return { year, schedule };
});

export const nextAGame = derived(currentOrUpcomingASchedule, ($currentOrUpcomingASchedule) => {
    if (!$currentOrUpcomingASchedule) return null;
    const dt = new Date();
    const currentTime = dt.getTime();
    let nextGame;

    if ($currentOrUpcomingASchedule?.schedule?.games?.length) {
        nextGame = $currentOrUpcomingASchedule.schedule.games.find(g => new Date(g.date).getTime() > currentTime);
    }

    return nextGame;
});
