import Badge from '../Structures/Badge';
import PartialUserInfo from './PartialUserInfo';

/**
 * Infos about a TETR.IO user
 */
interface UserInfo extends PartialUserInfo {
	/** The user's avatar Url */
	avatarUrl?: string;
	/** The user's badges */
	badges: Map<string, Badge>;
	/** Whether the user has been recently banned */
	badStanding: boolean;
	/** The user's banner Url. Only when the user is supporter */
	bannerUrl?: string;
	/** The user's bio. Only when the user is supporter */
	bio?: string;
	/** When the user joined the game */
	createdAt?: Date;
	/** The amount of players who have added this user to their friends list */
	friendCount: number;
	/** The amount of games played by the user */
	gamesPlayed?: number;
	/** The amount of seconds the user spent playing */
	gameTime?: number;
	/** The amount of game the user has won */
	gamesWon?: number;
	/** An indicator of the user's total amount supported, between 0 and 4 inclusive */
	supporterTier: number;
	/** The user's win rate (gamesWon/gamesPlayed) */
	winRate?: number;
	/** The user's amount of xp */
	xp: number;
}

export default UserInfo;