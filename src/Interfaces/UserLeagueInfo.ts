import { TetraLeagueRank } from '../Types/TetraLeagueRank';

/**
 * TETRA LEAGUE infos of a TETR.IO user
 */
interface UserLeagueInfo {
	/** The user's average Attack Per Minute over the last 10 games  */
	apm?: number;
	/** Whether the user's RD is increasing */
	decaying: boolean;
	/** The amount of TETRA LEAGUE games played in TETRA LEAGUE by the user */
	gamesPlayed: number;
	/** The amount of TETRA LEAGUE games won in TETRA LEAGUE by the user */
	gamesWon: number
	/** The user's Glicko-2 rating */
	glicko?: number;
	/** The user's percentile position */
	percentile?: number;
	/** The user's percentile rank */
	percentileRank?: TetraLeagueRank;
	/** The user's TETRA LEAGUE rank */
	rank?: TetraLeagueRank;
	/** The user's Tetra Rating (TR) */
	rating?: number;
	/** The user's Glicko-2 Rating Deviation. */
	rd?: number;
	/** The user's standing in global leaderboards */
	standing?: number;
	/** The user's standing in local leaderboards */
	localStanding?: number;
	/** The user's average Pieces Per Second over the last 10 games */
	pps?: number;
	/** The user's average Versus Score over the last 10 games */
	vs?: number;
	/** The user's TETRA LEAGUE win r	ate (gamesWon/gamesPlayed) */
	winRate: number;
}

export default UserLeagueInfo;