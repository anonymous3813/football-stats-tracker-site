import type { PageServerLoad } from './$types';
import type { Play } from '$lib/types';
import { Player } from '$lib/types';
import { TeamStats } from '$lib/types';
import { BoxScore } from '$lib/types';
import type { Game } from '$lib/types';
import type { EntryGenerator } from './$types';
import { readFileSync } from 'fs';

export const entries: EntryGenerator = () => {
    const data = readFileSync('static/gameIds.json', 'utf8');
    const games = JSON.parse(data);

    return games.map((game: { id: string }) => ({ gameId: game.id }));
};

export const prerender = true;

export const load: PageServerLoad = async ({ params, parent }) => {
    const { gamesList } = await parent()
    const gameId = params.gameId.replace(/[[\]']+/g, ''); 
    const game = gamesList.find((game: Game) => game.id === gameId);
    let boxScore;
    if(game) {
        boxScore = await runAnalysis(game);
    }
    return {
        game: game,
        boxScore: structuredClone(boxScore)
    };
};

async function runAnalysis(game: Game): Promise<BoxScore> {
    if (!game) throw new Error("Can't find game to analyze");

    const playerStats: Map<string, Player> = new Map<string, Player>();
    const teamStats = new TeamStats();

    // Process offense
    const offensivePlays = game.plays.filter((play: Play) => play.onOffense === true);

    // Process passing plays
    fetchOffensiveStats(offensivePlays.filter((play: Play) => play.pass), playerStats, teamStats, true);

    // Process rushing plays
    fetchOffensiveStats(offensivePlays.filter((play: Play) => !play.pass), playerStats, teamStats, false);

    // Process defense
    const defensivePlays = game.plays.filter((play: Play) => play.onOffense === false);
    
    fetchDefensiveStats(defensivePlays, playerStats);
    fetchTeamDefensiveStats(defensivePlays, teamStats);

    //console.log("playerStats after fetch:", playerStats); // Inspect playerStats

    const playerStatsList: Player[] = Array.from(playerStats.values());

    
    const passingPlayers = playerStatsList.filter((p: Player) => p.passingAttempts > 0).sort((a, b) => b.passingYards - a.passingYards);
    const receivingPlayers = playerStatsList.filter((p: Player) => p.receivingYards > 0).sort((a, b) => b.receivingYards - a.receivingYards);
    const rushingPlayers = playerStatsList.filter((p: Player) => p.rushingAttempts > 0).sort((a, b) => b.rushingYards - a.rushingYards);

    const tacklers = playerStatsList.filter((p: Player) => p.flagPulls > 0).sort((a, b) => b.flagPulls - a.flagPulls);
    const dbs = playerStatsList.filter((p: Player) => p.defInterceptions > 0 || p.pbu > 0).sort((a, b) => b.defInterceptions - a.defInterceptions || b.pbu - a.pbu);

    /*
    console.log("passingPlayers length:", passingPlayers.length);
    console.log("rushingPlayers length:", rushingPlayers.length);
    console.log("receivingPlayers length:", receivingPlayers.length);
    console.log("tacklers length:", tacklers.length);
    console.log("dbs length:", dbs.length);*/
    
    
    return new BoxScore(passingPlayers, rushingPlayers, receivingPlayers, tacklers, dbs, teamStats);
}

function fetchOffensiveStats(plays: Play[], playerStats: Map<string, Player>, teamStats: TeamStats, isPassing: boolean): void {
    plays.forEach((play: Play) => {
        const qbId = play.qbNum;
        const playerId = play.targetedPlayerNum;
        let player = playerStats.get(playerId);
        if (!player) {
            player = new Player(playerId);
            playerStats.set(playerId, player);
        }
        
        let qb = playerStats.get(qbId);
        if (!qb) {
            qb = new Player(qbId);
            playerStats.set(qbId, qb);
        }

        if (isPassing) {
            teamStats.passes++;
            if (play.sacked) {
                qb.sacked++;
            } else {
                qb.passingAttempts++;
                if (play.complete) {
                    qb.completions++;
                    player.receivingYards += play.yards || 0;
                    player.catches++;
                    qb.passingYards += play.yards || 0;
                    teamStats.passingYards += play.yards || 0;

                    if (play.firstDown) {
                        player.firstDowns++;
                    }

                    if (play.td) {
                        qb.passingTd++;
                        player.receivingTd++;
                    }
                }
                if (play.intercepted) {
                    qb.interceptions++;
                    teamStats.turnoversCommitted++;
                }
            }
        } else {
            teamStats.rushes++;
            if (play.td) {
                player.rushingTd++;
            }
            if (play.firstDown) {
                player.firstDowns++;
            }
            player.rushingAttempts++;
            player.rushingYards += play.yards || 0;
            teamStats.rushingYards += play.yards || 0;
        }
    });
}

function fetchDefensiveStats(plays: Play[], playerStats: Map<string, Player>): void {
    plays.forEach((play: Play) => {
        const playerId = play.targetedPlayerNum;
        if (!playerId) return;

        let player = playerStats.get(playerId)
        if(!player) {
            player = new Player(playerId);
            playerStats.set(playerId, player)
        } 

        if (play.pass) {
            if (play.intercepted) {
                player.defInterceptions++;
            } else if (!play.complete) {
                player.pbu++;
            } else {
                player.flagPulls++;
            }
        } else {
            player.flagPulls++;
        }
    });
}

function fetchTeamDefensiveStats(plays: Play[], teamStats: TeamStats): void {
    plays.forEach((play: Play) => {
        if (play.pass) {
            teamStats.defPassPlays++;
            if (play.intercepted) {
                teamStats.turnoversForced++;
            } else if (play.complete) {
                teamStats.passingYardsAllowed += play.yards || 0;
            }
        } else {
            teamStats.defRushPlays++;
            teamStats.rushingYardsAllowed += play.yards || 0;
        }
    });
}
