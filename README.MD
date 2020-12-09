# tetrio.js
## A promise-based module to interact with the TETR.IO API

### Installation
Install tetrio.js with npm:
```
npm install tetrio.js
```

<div align="center">
	<p>
		<b>As TETR.IO is in alpha, the API may change without notice and this module may as well change or be nonfunctional.</b>
	</p>
</div>

### Documentation
Not-so-good-looking documentation can be found [here](https://hickacou.js.org/tetrio.js).

I recommend using [Visual Studio Code](https://code.visualstudio.com) to develop with tetrio.js. Built-in intellisense will give you useful informations and will prevent wrong uses.

You can also check [the official documentation](https://tetr.io/about/api), but this module is not modeled on it.

#### Example use
```js
const tetrio = require('tetrio.js');
const client = new tetrio.Client();

client.getUser('hicka').then(user => {
	console.log(user);
});
/* Data:
	id: '5e8cc73320d4e90291432ba8',
	name: 'hicka',
	supporter: false,
	verified: false,
	role: 'user',
	bot: false,
	country: 'FR',
	flag: '🇫🇷'  ,
	league: {
		apm: 35.5,
		decaying: false,
		gamesPlayed: 532,
		gamesWon: 267,
		glicko: 1882,
		percentile: 0.13706227222310252,
		percentileRank: 's+',
		rank: 's+',
		rating: 20283.25003409502,
		rd: 61,
		standing: 1731,
		localStanding: 32,
		pps: 1.84,
		vs: 74.09,
		winRate: 0.5018796992481203
	},
	avatarUrl: 'https://tetr.io/user-content/avatars/5e8cc73320d4e90291432ba8.jpg?rv=1601327878791',
	badges: Map {},
	badStanding: false,
	gamesPlayed: 606,
	gameTime: 199243.65106111096,
	gamesWon: 304,
	winRate: 0.5016501650165016,
	xp: 794948
*/
```

### Author
**tetrio.js, by Hickacou**

[![Follow on GitHub](https://img.shields.io/github/followers/Hickacou?style=social)](https://github.com/Hickacou)

[![Follow on Twitter](https://img.shields.io/twitter/follow/puddingmangue?style=social)](https://twitter.com/puddingmangue)