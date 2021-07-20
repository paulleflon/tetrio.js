/**
 * A user's finesse during a TETR.IO game
 */
interface FinesseInfo {
	/** The finesse combo */
	combo: number;
	/** The amount of finesse faults */
	faults: number;
	/** The amount of pieces placed with perfect finesse */
	perfects: number;
}

export default FinesseInfo;