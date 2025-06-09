export interface Play {
    id: string;
    complete: boolean;
    down: number;
    firstDown: boolean;
    intercepted: boolean;
    onOffense: boolean;
    pass: boolean;
    punt: boolean;
    qbNum: string;
    sacked: boolean;
    targetedPlayerNum: string;
    td: boolean;
    yards: number;
}

export interface Play2 {
    id: string,
    down: number,
	offense: boolean,

	selectedPlayType: string,
	selectedPassResult: string,
	selectedPAT: string,

	intercepted: string,
	playOutcome: string,

	targetedPlayer: number,
    qbNum: number,
	yards: number;

    lastPlayOfHalf: boolean;
}

export interface Game {
    id: string;
    opponent: string;
    scoreTeam1: number;
    scoreTeam2: number;
    plays: Play[]; 
}

export interface Game2 {
    id: string;
    teamName: string;
    opponent: string;
    scoreTeam1: number;
    scoreTeam2: number;
    date: Date;
    plays: Play2[];
}

export class Player {
    id: string;
    sacked: number = 0;

    passingAttempts: number = 0;
    completions: number = 0;
    passingYards: number = 0;
    passingTd: number = 0;
    interceptions: number = 0;

    receivingYards: number = 0;
    catches: number = 0;
    
    rushingAttempts: number = 0;
    rushingYards: number = 0;
    
    rushingTd: number = 0;
    receivingTd: number = 0;
    firstDowns: number = 0;
    defInterceptions: number = 0;
    pbu: number = 0;
    flagPulls: number = 0;

    constructor(id: string) {
        this.id = id;
    }
    
}

export class TeamStats {
    passes: number = 0;
    passingYards: number = 0;

    rushingYards: number = 0;
    rushes: number = 0;

    turnoversCommitted: number = 0;
    rushingYardsAllowed: number = 0;
    passingYardsAllowed: number = 0;
    defPassPlays: number = 0;
    defRushPlays: number = 0;
    turnoversForced: number = 0;
}

export class BoxScore {
    constructor(
        public passingPlayers: Player[],
        public rushingPlayers: Player[],
        public receivingPlayers: Player[],
        public tacklers: Player[],
        public dbs: Player[],
        public teamStats: TeamStats
    ) {}
}

