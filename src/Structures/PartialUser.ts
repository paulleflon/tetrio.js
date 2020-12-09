import { Client } from '..';
import PartialUserInfo from '../Interfaces/PartialUserInfo';
import UserLeagueInfo from '../Interfaces/UserLeagueInfo';
import { isoToEmoji } from '../lib/util';
import { ISOCountry } from '../Types/ISOCountry';
import { UserRole } from '../Types/UserRole';
import User from './User';

export default class PartialUser implements PartialUserInfo {
	public bot?: boolean;
	public country?: ISOCountry;
	public flag?: string;
	public id: string;
	public league: UserLeagueInfo;
	public master?: User;
	public name: string;
	public role: UserRole;
	public supporter: boolean;
	public verified: boolean;
	protected client: Client;
	constructor(data: any, client: Client) {
		this.client = client;
		this.id = data._id;
		this.name = data.username;
		this.supporter = data.supporter === true;
		this.verified = data.verified === true;
		this.role = data.role;
		this.bot = this.role === 'bot';
		if (this.bot && 'botmaster' in data)
			client.getUser(data.botmaster.toLowerCase()).then((user) => this.master = user);
		if (data.country) {
			this.country = data.country;
			this.flag = isoToEmoji(data.country);
		}
		this.league = {} as UserLeagueInfo;
		if (data.league.apm)
			this.league.apm = data.league.apm;
		this.league.decaying = data.league.decaying;
		this.league.gamesPlayed = data.league.gamesplayed;
		this.league.gamesWon = data.league.gameswon;
		if (data.league.glicko)
			this.league.glicko = data.league.glicko;
		if (data.league.percentile > -1 || client.forceValue)
			this.league.percentile = data.league.percentile;
		if (data.league.percentile_rank !== 'z' || client.forceValue)
			this.league.percentileRank = data.league.percentile_rank;
		if (data.league.rank !== 'z' || client.forceValue)
			this.league.rank = data.league.rank;
		if (data.league.rating > -1 || client.forceValue)
			this.league.rating = data.league.rating;
		if (data.league.rd)
			this.league.rd = data.league.rd;
		if (data.league.standing > -1 || client.forceValue)
			this.league.standing = data.league.standing;
		if (data.league.standing_local > -1 || client.forceValue)
			this.league.localStanding = data.league.standing_local;
		if (data.league.pps)
			this.league.pps = data.league.pps;
		if (data.league.vs)
			this.league.vs = data.league.vs;

		this.league.winRate = (this.league.gamesPlayed === 0)
			? 0
			: this.league.gamesWon / this.league.gamesPlayed;
	}
	/**
	 * Fetches missing infos about the user and returns a `User` object
	 */
	public async fetch(): Promise<User> {
		return this.client.getUser(this.id);
	}
}