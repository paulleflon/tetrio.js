import ClearsInfo from '../Interfaces/ClearsInfo';
import FinesseInfo from '../Interfaces/FinesseInfo';
import RecordInfo from '../Interfaces/RecordInfo';
import Client from '../lib/Client';

/**
 * A TETR.IO blitz or 40l record
 */
export default abstract class Record implements RecordInfo {
	public btb: number;
	public clears: ClearsInfo;
	public combo: number;
	public createdAt: Date;
	public finesse?: FinesseInfo;
	public id: string;
	public inputs: number;
	public maxBtb: number;
	public maxCombo: number;
	public placed: number;
	public rank?: number;
	public replay: string;
	public seed: number;
	public type: 'blitz' | '40l';
	public userId: string;
	public username: string;
	private client: Client;
	constructor(data: any, client: Client) {
		this.client = client;
		this.btb = data.endcontext.btb;
		this.clears = {
			allClears: data.endcontext.clears.allclear,
			doubles: data.endcontext.clears.doubles,
			miniTspinDoubles: data.endcontext.clears.minitspindoubles,
			miniTspinSingles: data.endcontext.clears.minitspinsingles,
			miniTspins: data.endcontext.clears.minitspins,
			quads: data.endcontext.clears.quads,
			singles: data.endcontext.clears.singles,
			triples: data.endcontext.clears.triples,
			tspinDoubles: data.endcontext.clears.tspindoubles,
			tspinTriples: data.endcontext.clears.tspintriples,
			tspins: data.endcontext.clears.realtspins,
			tspinSingles: data.endcontext.clears.tspinsingles,
		}
		this.combo = data.endcontext.combo;
		this.createdAt = new Date(data.ts);
		if (data.endcontext.finesse) {
			this.finesse = {
				combo: data.endcontext.finesse.combo,
				faults: data.endcontext.finesse.faults,
				perfects: data.endcontext.finesse.perfectpieces,
			};
		}
		this.id = data._id;
		this.inputs = data.endcontext.inputs;
		this.maxBtb = data.endcontext.topbtb;
		this.maxCombo = data.endcontext.topcombo;
		this.placed = data.endcontext.piecesplaced;
		this.rank = data.rank;
		this.replay = data.replayid;
		this.seed = data.endcontext.seed;
		this.type = data.endcontext.gametype;
		this.userId = data.user._id;
		this.username = data.user.username;
	}

}