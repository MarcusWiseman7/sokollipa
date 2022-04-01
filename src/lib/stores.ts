import { derived, readable, writable } from 'svelte/store';
import sanity from '$lib/sanity';

/**
 * INTERFACES
 */
interface game {
    date: Date;
    awayTeam: {
        name: String;
        logo: {};
    };
    homeTeam: {
        name: String;
        logo: {};
    };
    awayTeamScore: Number;
    homeTeamScore: Number;
}

interface schedule {
    _id: String;
    league: {
        name: String;
    };
    games: [game];
}

interface season {
    _id: String;
    year: Number;
    schedules: [schedule];
}


/**
 * WRITABLE EXPORTS
 */
export let activeTab = writable('Tym A');
export let scorecardObj = writable(null);
export let appLoading = writable(false);


/**
 * HELPER FUNCTIONS
 */
const getHeroImage = async () => {
    const heroQuery = `*[_type == 'hero']`;
    return await sanity.fetch(heroQuery);
};

const getSeasons = async () => {
    const seasonsQuery = `
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


/**
 * DERIVED EXPORTS
 */
export const currentOrUpcomingASchedule = derived(seasons, ($seasons: [season]) => {
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
