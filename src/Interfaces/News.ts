import Badge from '../Structures/Badge';
import { TetraLeagueRank } from '../Types/TetraLeagueRank';

/** When a user gets a badge */
export interface BadgeNews extends BaseNews {
	/** The badge data */
	data: Badge;
}

/** Base data of a news */
export interface BaseNews {
	/** The Date when the news happened */
	at: Date;
	/** The ID of the news */
	id: string;
	/** The username of the player */
	username: string;
	/** The type of news */
	type: 'leaderboard' | 'leaderboard' | 'personalbest' | 'badge' | 'rankup';
}

/** When a user's new personal best enters a global leaderboard */
export interface LeaderboardNews extends PersonalBestNews {
	/** The rank of the personal best in global leaderboard */
	rank: number;
}

/** When a user gets a personal best */
export interface PersonalBestNews extends BaseNews {
	/** The game mode played */
	gameType: '40l' | 'blitz';
	/** The replay's shortID */
	replayID: string;
	/** The score attained (in blitz mode) */
	score?: number;
	/** The time of the game (in 40l mode) */
	time?: number;
}

/** When a user gets a new top rank in TETRA LEAGUE */
export interface RankupNews extends BaseNews {
	/** The new rank */
	rank: TetraLeagueRank;
}