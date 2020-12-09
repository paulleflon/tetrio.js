import { ISOCountry } from '../Types/ISOCountry';
/**
 * Options to fetch the TETRA LEAGUE Leaderboard
 * 
 * **The `before` and `after` argument may not be combined.** 
 */
export default interface LeagueLeaderboardFetchingOptions {
	/** Whether to fetch the whole leaderboard. 
	 * 
	 * If true, `after`, `before` and `limit` options are ignored. 
	 */
	all?: boolean,
	/** The upper bound in TR. Use this to paginate downwards: take the lowest seen TR and pass that back through this field to continue scrolling. 25000 by default. */
	after?: number,
	/** The lower bound in TR. Use this to paginate upwards: take the highest seen TR and pass that back through this field to continue scrolling. If set, the search order is reversed (returning the lowest items that match the query) */
	before?: number,
	/** The ISO 3166-1 country code to filter to */
	country?: ISOCountry,
	/** The amount of entries to return, between 1 and 100. 50 by default */
	limit?: number,
}