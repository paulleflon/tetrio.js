import User from './User';

export default class Badge {
	/** The badge's id and icon file name  */
	public id: string;
	/** The badge's label */
	public label: string;
	/** The Date the badge has been gotten by the user */
	public gottenAt?: Date;
	/** The badge's icon file url */
	public iconUrl: string;
	/** The name of the user the badge belongs to */
	public user: string;
	constructor(data: any) {
		this.id = data.id;
		this.label = data.label;
		this.gottenAt = data.gottenAt;
		this.iconUrl = 'https://tetr.io/res/badges/' + this.id + '.png';
		this.user = data.user;
	}
}