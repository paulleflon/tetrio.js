/**
 * Instantiation options of a Tetrio.js Client
 */
export default interface ClientOptions {
	/**
	 * Whether some optionnal properties must provide the raw value given by the API. For example:
	 *  - `-1` instead of `undefined` for hidden user statistics
	 *  - `'Z'` instead of `undefined` for unranked TETRA LEAGUE players
	 * @default false
	 */
	forceValue?: boolean;
}