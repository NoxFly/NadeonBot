let {Client, App} = require('../index.js');

const channel = (key, value) => {return App.server.channels.cache.find(channel => channel[key] == value);};

const emoji = name => {
	let emoji = Client.emojis.cache.get(App.preferences.emojis[name]);
	return `<:${App.server.id}:${emoji.id}>`;
};

oIn = (obj, key) => Object.keys(obj).indexOf(key) !== -1;




const most = arr => {
	if(arr.length == 0) return null;

	let obj = {}, max = [null, 0];
	for(let i of arr) {
		if(!Object.in(obj, i)) obj[i] = 1;
		else obj[i]++;

		if(obj[i] > max[1]) max = [i, obj[i]];
	}

	return max;
};




/* 	team elo: ['Gold', 'Gold', 'Silver', 'Silver', 'Grand Master']
	Gold :        2
	Silver:       2
	Grand Master: 1

	I-B-S-G-P-D-M-GM-C
	0 1 2 3 4 5 6 7  8
		^ ^       ^
		2 2       1

	sum = 2 + 2 + 3 + 3 + 7 = 17
	avg = round(17 / 5) = round(3.4) = 3
*/

const mean = (arr, model) => {
	if(arr.length == 0) return null;
	let iArr = arr.map(el => model.indexOf(el)).filter(el => el != -1);
	let sum = iArr.reduce((a, b) => a+b, 0);
	let avg = Math.round(sum / arr.length) || 0;
	return model[avg];
};

const copy = obj => JSON.parse(JSON.stringify(obj));

module.exports = {channel, emoji, oIn, most, mean, copy};