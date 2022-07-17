import type { SanityAssetDocument } from '@sanity/client';

export interface Game {
        homeTeam: {
            logo: SanityAssetDocument;
            name: string;
            players?: [];
        };
        awayTeam: {
            logo: SanityAssetDocument;
            name: string;
            players?: [];
        };
        homeTeamScore: number;
        awayTeamScore: number;
        date: Date;
        description?: string;
};

export interface Schedule {
    league: {
        name: string;
    };
    games: [Game];
}

export interface Season {
    year: number;
    schedules: [Schedule];
}

export interface Player {
    name: string;
    position?: string;
    number?: string;
    info?: string;
    profilePhoto?: SanityAssetDocument;
    avatar?: SanityAssetDocument;
}
export interface Team {
    players: [Player];
    name: string;
    logo: SanityAssetDocument;
}
