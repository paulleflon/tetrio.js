import { ISOCountry } from '../Types/ISOCountry';
/**
 * Options to fetch TETR.IO's XP Leaderboard
 * 
 * **The `before` and `after` argument may not be combined.** 
 */
export default interface XPLeaderboardFetchingOptions {
	/** The upper bound in XP. Use this to paginate downwards: take the lowest seen XP and pass that back through this field to continue scrolling. 25000 by default. */
	after?: number;
	/** The lower bound in XP. Use this to paginate upwards: take the highest seen XP and pass that back through this field to continue scrolling. If set, the search order is reversed (returning the lowest items that match the query) */
	before?: number;
	/** The ISO 3166-1 country code to filter to */
	country?: ISOCountry;
	/** The amount of entries to return, between 1 and 100. 50 by default */
	limit?: number;
}