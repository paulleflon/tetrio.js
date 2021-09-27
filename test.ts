import { Client } from './src';

const c = new Client();

c.getUser('hicka').then(console.log);