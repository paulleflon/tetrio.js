import Client from '../lib/Client';
import Record from './Record';

/**
 * A TETR.IO 40l record
 */
export default class Record40l extends Record {
	/** The duration of the game in milliseconds */
	public time: number;

	constructor(data: any, client: Client) {
		super(data, client);
		this.time = data.endcontext.finalTime;
	}

}