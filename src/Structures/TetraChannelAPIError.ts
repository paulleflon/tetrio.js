export default class TetraChannelAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TetraChannelAPIError';
	}
}