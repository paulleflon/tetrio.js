import User from '../Structures/User';
import { ISOCountry } from '../Types/ISOCountry';
import { UserRole } from '../Types/UserRole';
import UserLeagueInfo from './UserLeagueInfo';

export default interface PartialUserInfo {
	/** Whether the user is a bot */
	bot?: boolean
	/** The ISO 3166-1 country code of the user */
	country?: ISOCountry;
	/** The user's country flag emoji */
	flag?: string;
	/** The user's MongoID */
	id: string;
	/** The user's TETRA LEAGUE info */
	league: UserLeagueInfo;
	/** If the user is a bot, the user who owns it */
	master?: User;
	/** The user's username */
	name: string;
	/** The user's role */
	role: UserRole;
	/** Whether the user is a supporter */
	supporter: boolean;
	/** Whether the user is verified */
	verified: boolean;
}