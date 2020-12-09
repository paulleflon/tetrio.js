import { ISOCountry } from '../Types/ISOCountry';
import { UserResolvable } from '../Types/UserResolvable';
/**
 * Converts a an ISO country code to the corresponding flag emoji
 * @param country An ISO 3166-1 country code. 
 */
export function isoToEmoji(country: ISOCountry): string {
	const emojis: any = { A: '🇦', B: '🇧', C: '🇨', D: '🇩', E: '🇪', F: '🇫', G: '🇬', H: '🇭', I: '🇮', J: '🇯', K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🇴', P: '🇵', Q: '🇶', R: '🇷', S: '🇸', T: '🇹', U: '🇺', V: '🇻', W: '🇼', X: '🇽', Y: '🇾', Z: '🇿' };
	return emojis[country[0]] + emojis[country[1]];
}

/**
 * Converts any UserResolvable object to a MongoID or username
 * @param user The UserResolvable object to resolve
 */
export function resolveUser(user: UserResolvable): string {
	var resolved: string = '';
	if (typeof user === 'object' && ('id' in user || 'name' in user))
		resolved = user.id || user.name.toLowerCase();

	if (typeof user === 'string')
		resolved = user.toLowerCase();
	return resolved;
}