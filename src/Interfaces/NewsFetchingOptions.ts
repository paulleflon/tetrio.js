export default interface NewsFetchingOptions {
	/** Whether to fetch news from all streams or only in specified stream (specified user or `global`) */
	all?: boolean,
	/** The amount of entries to return, between 1 and 100. 25 by default */
	limit?: number,
	/** The user to return the news MongoID. If null, will return news from all users */
	userID?: string,
}