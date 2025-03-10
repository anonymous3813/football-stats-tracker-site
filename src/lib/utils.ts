import { Player } from "./types";

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
