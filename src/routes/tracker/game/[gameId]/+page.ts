export const load = async ({ params }) => {
    const gameId = params.gameId;

    if (!gameId) {
        throw new Error("Missing parameter 'gameId' in route");
    }
    return {
        gameId: gameId
    };
}