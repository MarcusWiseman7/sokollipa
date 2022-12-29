import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export interface IGame extends SanityDocument {
        homeTeam: {
            logo: SanityImageAssetDocument;
            name: string;
            players?: [];
        };
        awayTeam: {
            logo: SanityImageAssetDocument;
            name: string;
            players?: [];
        };
        homeTeamScore: number;
        awayTeamScore: number;
        date: Date;
        description?: string;
};

export interface ISchedule extends SanityDocument {
    league: {
        name: string;
    };
    games: IGame[];
}

export interface ISeason extends SanityDocument {
    year: number | string;
    schedules?: ISchedule[];
    schedule?: ISchedule;
}

export interface IPlayer extends SanityDocument {
    name: string;
    position?: string;
    number?: string;
    info?: string;
    profilePhoto?: SanityImageAssetDocument;
    avatar?: SanityImageAssetDocument;
}

export interface ITeam extends SanityDocument {
    players: IPlayer[];
    name: string;
    logo: SanityImageAssetDocument;
}

export interface IGallery extends SanityDocument {
    photoAlbums: {
        name?: string;
        photos?: SanityImageAssetDocument[];
    }[];
    teamName: string;
}
