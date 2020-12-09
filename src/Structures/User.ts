import UserInfo from '../Interfaces/UserInfo';
import ZenInfo from '../Interfaces/ZenInfo';
import Client from '../lib/Client';
import Badge from './Badge';
import PartialUser from './PartialUser';
import Record40l from './Record40l';
import RecordBlitz from './RecordBlitz';
export default class User extends PartialUser implements UserInfo {
	public avatarUrl?: string;
	public badges: Map<string, Badge>;
	public badStanding: boolean;
	public bannerUrl?: string;
	public bio?: string;
	public createdAt?: Date;
	public gamesPlayed?: number;
	public gameTime?: number;
	public gamesWon?: number;
	public master?: User;
	public winRate?: number;
	public xp: number;
	constructor(data: any, client: Client) {
		super(data, client);
		if (this.supporter) {
			if ('banner_revision' in data)
				this.bannerUrl = 'https://tetr.io/user-content/banners/' + this.id + '.jpg?rv=' + data.banner_revision;
			if ('bio' in data)
				this.bio = data.bio;
		}
		if ('avatar_revision' in data)
			this.avatarUrl = 'https://tetr.io/user-content/avatars/' + this.id + '.jpg?rv=' + data.avatar_revision;
		this.badges = new Map();
		for (var i = 0; i < data.badges.length; i++) {
			var gottenAt: Date | undefined = new Date(data.badges[i].ts);
			if (gottenAt.toString() === 'Invalid Date') gottenAt = undefined;
			const badge: Badge = new Badge({
				gottenAt,
				id: data.badges[i].id,
				label: data.badges[i].label,
				username: this.name
			});
			this.badges.set(badge.id, badge);
		}
		this.badStanding = data.badstanding === true;
		if (data.gamesplayed > -1 || client.forceValue)
			this.gamesPlayed = data.gamesplayed;
		if (data.gametime > -1 || client.forceValue)
			this.gameTime = data.gametime;
		if (data.gameswon > -1 || client.forceValue)
			this.gamesWon = data.gameswon;
		this.winRate = (this.gamesPlayed && this.gamesWon && this.gamesPlayed > 0)
			? this.gamesWon / this.gamesPlayed
			: (client.forceValue)
				? 0
				: undefined;
		this.xp = data.xp;

	}

	/**
	 * Fetches the user's personnal best in blitz and/or 40l
	 * @param type The type of the records to fetch
	 */
	public async getBest(type: '40l' | 'blitz' | 'all' = 'all'): Promise<(Record40l | RecordBlitz) | { "40l": Record40l, blitz: RecordBlitz }> {
		return this.client.getUserBest(this, type);
	}

	/**
	 * Fetches the user's Zen game infos
	 */
	public getZen(): Promise<ZenInfo> {
		return this.client.getUserZen(this);
	}

	/**
	 * Fetches the user's top 10 records in blitz or 40l
	 * @param type The type of records to fetch
	 */
	public getBests(type: '40l' | 'blitz'): Promise<(Record40l | RecordBlitz)[]> {
		return this.client.getUserBests(this.id, type);
	}

}