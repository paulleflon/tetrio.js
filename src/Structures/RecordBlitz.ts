import Client from '../lib/Client';
import Record from './Record';

/**
 * A TETR.IO Blitz record
 */
export default class RecordBlitz extends Record {
	/** The reached level at the end of the game */
	public level: number;
	/** The number of lines cleared in the current level */
	public levelLines: number;
	/** The number of lines required to attain next level */
	public neededLevelLines: number;

	constructor(data: any, client: Client) {
		super(data, client);
		this.level = data.endcontext.level;
		this.levelLines = data.endcontext.level_lines;
		this.neededLevelLines = data.endcontext.level_lines_needed;
	}

}