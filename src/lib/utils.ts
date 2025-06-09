import { Player } from "./types";
import type { Play2 } from "./types";
import { Down, PlayOutcome, PATOption } from "./enums";

export function calculatePasserRating(player: Player) {
    if (player.passingAttempts === 0) return 0.0; // Prevent division by zero

    const a = ((player.completions / player.passingAttempts) - 0.3) * 5.0;
    const b = ((player.passingYards / player.passingAttempts) - 3.0) * 0.25;
    const c = (player.passingTd / player.passingAttempts) * 20.0;
    const d = 2.375 - ((player.interceptions / player.passingAttempts) * 25.0);

    const cap = (value: number) => Math.min(2.375, Math.max(0.0, value));

    const aCapped = cap(a);
    const bCapped = cap(b);
    const cCapped = cap(c);
    const dCapped = cap(d);

    return (((aCapped + bCapped + cCapped + dCapped) / 6.0) * 100.0).toFixed(2);
}

export function calculateScore(plays: Play2[]) {
    let scoreTeam1 = 0;
    let scoreTeam2 = 0;
    plays.forEach(play => {
        if (play.playOutcome === PlayOutcome.TD) {
            if (play.offense) {
                scoreTeam1 += 6; 
            } else {
                scoreTeam2 += 6; 
            }
        } 
        if (play.selectedPAT === PATOption.OnePAT) {
            if (play.offense) {
                scoreTeam1 += 1; 
            } else {
                scoreTeam2 += 1; 
            }
        } else if (play.selectedPAT === PATOption.TwoPAT) {
            if (play.offense) {
                scoreTeam1 += 2; 
            } else {
                scoreTeam2 += 2; 
            }
        } else if (play.selectedPAT === PATOption.PickTwo) {
            if (play.offense) {
                scoreTeam2 += 2; 
            } else {
                scoreTeam1 += 2; 
            }
        }
        if(play.playOutcome === PlayOutcome.SAFETY) {
            if (play.offense) {
                scoreTeam2 += 2; 
            } else {
                scoreTeam1 += 2; 
            }
        }
    });
    return { scoreTeam1, scoreTeam2 };
}

export const numberToDown: Record<number, Down> = {
	1: Down.First,
	2: Down.Second,
	3: Down.Third,
	4: Down.Fourth
};

export const downToNumber: Record<Down, number> = {
	[Down.First]: 1,
	[Down.Second]: 2,
	[Down.Third]: 3,
	[Down.Fourth]: 4
};

