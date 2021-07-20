import ClearsInfo from './ClearsInfo';
import FinesseInfo from './FinesseInfo';
import PartialUserInfo from './PartialUserInfo';

/**
 * Infos about a TETR.IO record
 */
interface RecordInfo {
	/** The back-to-back value at the end of the game. */
	btb: number;
	/** The clears data */
	clears: ClearsInfo;
	/** The line clearing combo at the end of the game. */
	combo: number;
	/** The date when the record has been set */
	createdAt: Date;
	/** The finesse of the player */
	finesse?: FinesseInfo;
	/** The record's MongoID */
	id: string;
	/** The amount of inputs */
	inputs: number;
	/** The maximum back-to-back attained by the player */
	maxBtb: number;
	/** The maximum line clearing combo attained by the player */
	maxCombo: number;
	/** The amount of pieces placed */
	placed: number;
	/** The rank of this record in leaderboards */
	rank?: number;
	/** The replay id of the record */
	replay: string;
	/** The record's seed */
	seed: number;
	/**
	 * The type of the record, either:
	 *  - `40l`
	 *  - `blitz` 
	 */
	type: '40l' | 'blitz';
	/** The id of the user who got the record */
	userId: string;
	/** The name of the user who got the record */
	username: string;
}

export default RecordInfo;