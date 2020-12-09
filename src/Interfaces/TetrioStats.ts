export default interface TetrioStats {
	/** The amount of anonymous accounts on the server */
	anonCount: number,
	/** The amount of games played across all users, including both off- and online modes, excluding games that were not completed (e.g. retries) */
	gamesFinished: number,
	/** The amount of games played across all users, including both off- and online modes */
	gamesPlayed: number,
	/** The amount of games played a second (through the last minute) */
	gamesPlayedDelta: number,
	/** The amount of seconds spent playing across all users, including both off- and online modes. */
	gameTime: number,
	/** The amount of keys pressed across all users, including both off- and online modes */
	inputs: number,
	/** The amount of pieces placed across all users, including both off- and online modes */
	piecesPlaced: number,
	/** The amount of users on the server, including anonymous accounts */
	userCount: number,
	/** The amount of users created a second (through the last minute) */
	userCountDelta: number,
	/** The amount of replays stored on the server */
	replayCount: number,
}