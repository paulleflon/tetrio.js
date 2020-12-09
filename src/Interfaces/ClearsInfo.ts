/**
 * Infos about clears of a TETR.IO game
 */
export default interface ClearsInfo {
	/** The amount of All Clears */
	allClears: number,
	/** The amount of doubles */
	doubles: number,
	/** The amount of mini T-spins */
	miniTspins: number,
	/** The amount of mini T-spins Double */
	miniTspinDoubles: number,
	/** The amount of mini T-spins Single */
	miniTspinSingles: number,
	/** The amount of quads */
	quads: number,
	/** The amount of singles */
	singles: number,
	/** The amount of triples */
	triples: number,
	/** The amount of T-spins */
	tspins: number,
	/** The amount of T-spins Double */
	tspinDoubles: number,
	/** The amount of T-spins Single */
	tspinSingles: number,
	/** The amount of T-spins Triple */
	tspinTriples: number,
}