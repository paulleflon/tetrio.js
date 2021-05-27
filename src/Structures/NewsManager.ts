import { BadgeNews, BaseNews, LeaderboardNews, PersonalBestNews, RankupNews } from '../Interfaces/News';
import Client from '../lib/Client';
import Badge from './Badge';

export default class NewsManager {
	public badge: BadgeNews[];
	public leaderboard: LeaderboardNews[];
	public personalBest: PersonalBestNews[];
	public rankup: RankupNews[];
	private client: Client;
	constructor(data: any, client: Client) {
		this.client = client;
		this.badge = [];
		this.leaderboard = [];
		this.personalBest = [];
		this.rankup = [];
		for (let i = 0; i < data.length; i++) {
			const raw: any = data[i];
			const base: BaseNews = {
				at: new Date(raw.ts),
				id: raw._id,
				type: raw.type,
				username: raw.data.username
			};
			let news;
			switch (base.type) {
				case 'badge':
					this.client.getUser('hicka').then(user => {
						const badge: Badge = new Badge({
							id: raw.data.type,
							label: raw.data.label,
							gottenAt: base.at,
							user: this,
						});
						news = Object.assign(base, {
							data: badge
						}) as BadgeNews;
						this.badge.push(news);
					});
					break;
				case 'leaderboard':
				case 'personalbest':
					news = Object.assign(base, {
						gameType: raw.data.gametype,
						replayID: raw.data.replayid,
					});
					if (base.type === 'personalbest')
						news = Object.assign(news, { rank: raw.data.rank });
					news = (news.gameType == '40l') ? Object.assign(news, { time: raw.data.result }) : Object.assign(news, { score: raw.data.result });
					if (base.type === 'leaderboard')
						this.leaderboard.push(news as LeaderboardNews);
					else
						this.personalBest.push(news as PersonalBestNews);
					break;
				case 'rankup':
					news = Object.assign(base, { rank: raw.data.rank }) as RankupNews;
					this.rankup.push(news);
					break;
			}
		}
	}
}