import { ClientRequest } from 'http';
import { request } from 'https';
import ClientOptions from '../Interfaces/ClientOptions';
import LeagueLeaderboardFetchingOptions from '../Interfaces/LeagueLeaderboardFetchingOptions';
import NewsFetchingOptions from '../Interfaces/NewsFetchingOptions';
import TetrioStats from '../Interfaces/TetrioStats';
import XPLeaderboardFetchingOptions from '../Interfaces/XPLeaderboardFetchingOptions';
import ZenInfo from '../Interfaces/ZenInfo';
import NewsManager from '../Structures/NewsManager';
import PartialUser from '../Structures/PartialUser';
import Record40l from '../Structures/Record40l';
import RecordBlitz from '../Structures/RecordBlitz';
import TetraChannelAPIError from '../Structures/TetraChannelAPIError';
import User from '../Structures/User';
import { UserResolvable } from '../Types/UserResolvable';
import { resolveUser } from './util';

export default class Client {
	public readonly forceValue: boolean;
	private hostname: string;
	constructor(options: ClientOptions = {}) {
		this.forceValue = options.forceValue === true;
		this.hostname = 'ch.tetr.io';
	}
	/**
	 * Makes a call to the Tetra Channel API.
	 * @param endpoint The API endpoint to request
	 * @param scope The scope of the endpoint to request (eg. /users/:user/records)
	 */
	private async call(endpoint: string): Promise<Record<string, unknown>> {
		return new Promise<Record<string, unknown>>((resolve, reject) => {
			const path = '/api' + endpoint;
			const req: ClientRequest = request({
				headers: {
					'Content-Type': 'application/json'
				},
				hostname: this.hostname,
				method: 'GET',
				path,
				port: 443
			}, (response) => {
				let output = '';
				response.setEncoding('utf8');
				response.on('data', (chunk) => {
					output += chunk;
				});
				response.on('error', (err) => {
					reject(err);
				});
				response.on('end', () => {
					resolve(JSON.parse(output));
				});
			});
			req.end();
		});
	}

	/**
	 * Fetches a TETR.IO user from Tetra Channel
	 * @param user The user to fetch informations form
	 * @param force Whether to force an API call even if a User object is provided as argument.
	 */
	public async getUser(user: UserResolvable, force = false): Promise<User> {
		if (user instanceof User && !force)
			return user;

		const id: string = resolveUser(user);
		const res: any = await this.call('/users/' + id);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else
			return new User(res.data.user, this);
	}

	/**
	 * Fetches a TETR.IO user's personnal best in blitz and/or 40l
	 * @param user The user to fetch the records
	 * @param type The type of the records to fetch
	 */
	public async getUserBest(user: UserResolvable, type: '40l' | 'blitz' | 'all' = 'all'): Promise<(Record40l | RecordBlitz) | { '40l': Record40l, blitz: RecordBlitz }> {
		const id: string = resolveUser(user);
		const res: any = await this.call('/users/' + id + '/records');
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			res.data.records['40l'].record.rank = res.data.records['40l'].rank;
			res.data.records.blitz.record.rank = res.data.records.blitz.rank;
			switch (type) {
				case '40l':
					return new Record40l(res.data.records['40l'].record, this);
				case 'blitz':
					return new RecordBlitz(res.data.records.blitz.record, this);
				case 'all':
					return {
						'40l': new Record40l(res.data.records['40l'].record, this),
						blitz: new RecordBlitz(res.data.records.blitz.record, this),
					};
			}
		}
	}

	/**
	 * Fetches a TETR.IO user's top 10 records in blitz or 40l
	 * @param userID The user to fetch the records ID
	 * @param type The type of records to fetch
	 */
	public async getUserBests(userID: string, type: '40l' | 'blitz'): Promise<(Record40l | RecordBlitz)[]> {
		const res: any = await this.call('/streams/' + type + '_userbest_' + userID);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			const arr: (Record40l | RecordBlitz)[] = [];
			for (let i = 0; i < res.data.records.length; i++) {
				const raw = res.data.records[i];
				arr.push(new ((type === '40l') ? Record40l : RecordBlitz)(raw, this));
			}
			return arr;
		}
	}
	/**
	 * Fetches a TETR.IO user's last records in blitz and/or 40l
	 * @param userID The user to fetch records ID
	 * @param filter Whether to only return `40l` or `blitz` records
	 */
	public async getUserRecent(userID: string, filter?: '40l' | 'blitz'): Promise<(Record40l | RecordBlitz)[]> {
		const res: any = await this.call('/streams/any_userbest_' + userID);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			const arr: (Record40l | RecordBlitz)[] = [];
			for (let i = 0; i < res.data.records.length; i++) {
				const raw = res.data.records[i];
				if (filter && raw.gameType !== filter) continue;
				arr.push(new ((raw.gameType === '40l') ? Record40l : RecordBlitz)(raw, this));
			}
			return arr;
		}
	}

	/**
	 * Fetches a user's Zen game infos
	 * @param user The user to fetch the Zen infos
	 */
	public async getUserZen(user: UserResolvable): Promise<ZenInfo> {
		const id: string = resolveUser(user);
		const res: any = await this.call('/users/' + id + '/records');
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else
			return {
				level: res.data.zen.level,
				score: res.data.zen.score
			};
	}

	/**
	 * Fetches the general TETR.IO statistics
	 */
	public async getGeneralStats(): Promise<TetrioStats> {
		const res: any = await this.call('/general/stats');
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else
			return {
				anonCount: res.data.anoncount,
				gamesFinished: res.data.gamesfinished,
				gamesPlayed: res.data.gamesplayed,
				gamesPlayedDelta: res.data.gamesplayed_delta,
				gameTime: res.data.gametime,
				inputs: res.data.inputs,
				piecesPlaced: res.data.piecesplaced,
				userCount: res.data.usercount,
				userCountDelta: res.data.usercount_delta,
				replayCount: res.data.replaycount
			};
	}

	/**
	 * Fetches TETR.IO's activity, returning an array of user activity over the last 2 days
	 * @returns {Promise<number[]>} An array of plot points, newest points first.
	 */
	public async getServerActivity(): Promise<number[]> {
		const res: any = await this.call('/general/activity');
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else
			return res.data.activity;
	}

	/**
	 * Gets players from the TETRA LEAGUE Leaderboard
	 * @param options Options to fetch the TETRA LEAGUE Leaderboard
	 */
	public async getLeagueLeaderboard(options: LeagueLeaderboardFetchingOptions = {}): Promise<PartialUser[]> {
		if ('after' in options && 'before' in options)
			throw new TetraChannelAPIError('May not combine both `before` and `after` parameters');
		let endpoint = '/users/lists/league';
		if (options.all)
			endpoint += '/all';
		else if ('before' in options)
			endpoint += '?before=' + options.before;
		else if ('after' in options)
			endpoint += '?after=' + options.after;
		if (options.country) {
			endpoint += (endpoint.includes('?')) ? '&' : '?';
			endpoint += 'country=' + options.country.toUpperCase();
		}
		if (options.limit) {
			endpoint += (endpoint.includes('?')) ? '&' : '?';
			endpoint += 'limit=' + options.limit;
		}
		const res: any = await this.call(endpoint);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			const arr: PartialUser[] = [];
			for (let i = 0; i < res.data.users.length; i++) {
				const raw = res.data.users[i];
				arr.push(new PartialUser(raw, this));
			}
			return arr;
		}
	}

	/**
	 * Gets players from the TETRA LEAGUE Leaderboard
	 * @param options Options to fetch the TETRA LEAGUE Leaderboard
	 */
	public async getXPLeaderboard(options: XPLeaderboardFetchingOptions = {}): Promise<PartialUser[]> {
		if ('after' in options && 'before' in options)
			throw new TetraChannelAPIError('May not combine both `before` and `after` parameters');
		let endpoint = '/users/lists/league';
		if ('before' in options)
			endpoint += '?before=' + options.before;
		else if ('after' in options)
			endpoint += '?after=' + options.after;
		if (options.country) {
			endpoint += (endpoint.includes('?')) ? '&' : '?';
			endpoint += 'country=' + options.country.toUpperCase();
		}
		if (options.limit) {
			endpoint += (endpoint.includes('?')) ? '&' : '?';
			endpoint += 'limit=' + options.limit;
		}
		const res: any = await this.call(endpoint);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			const arr: PartialUser[] = [];
			for (let i = 0; i < res.data.users.length; i++) {
				const raw = res.data.users[i];
				arr.push(new PartialUser(raw, this));
			}
			return arr;
		}
	}

	/**
	 * Gets all latest recorded games of 40l or Blitz
	 * @param type The type of game stream to look at
	 */
	public async getGlobalStream(type: '40l' | 'blitz'): Promise<(Record40l | RecordBlitz)[]> {
		const res: any = await this.call('/streams/' + type + '_global');
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else {
			const arr: (Record40l | RecordBlitz)[] = [];
			for (let i = 0; i < res.data.records.length; i++) {
				const raw = res.data.records[i];
				arr.push(new ((raw.gameType === '40l') ? Record40l : RecordBlitz)(raw, this));
			}
			return arr;
		}
	}
	/**
	 * Gets last news of TETR.IO users
	 * @param options Options to fetch the news
	 */
	public async getNews(options: NewsFetchingOptions = {}): Promise<NewsManager> {

		let endpoint = '/news/';
		if (options.userID)
			endpoint += 'user_' + options.userID;
		else if (!options.all)
			endpoint += 'global';
		endpoint += '?limit=' + (options.limit || 25);
		const res: any = await this.call(endpoint);
		if (!res.success)
			throw new TetraChannelAPIError(res.error);
		else
			return new NewsManager(res.data.news, this);
	}
}