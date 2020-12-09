import { Client } from './index';
new Client({
	forceValue: false
}).getGeneralStats().then(d => console.log(d));