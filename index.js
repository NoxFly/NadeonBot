'use strict';

// path
const root = __dirname;

// discord
let Discord = require('discord.js');
let Client = new Discord.Client();


// bot constants
const {clientToken, tag} = require('./_conf/config.js');

// export data to get it on other files
let exportObj = module.exports = {};
exportObj.root = root;
exportObj.Client = Client;
exportObj.App = {};

Client.on('ready', () => {

	console.log(`${Client.user.username} ready`);

	Client.user.setActivity(`Nadeon's plays`, {type: 'STREAMING', url: 'https://www.twitch.tv/nadeontv/videos'});

	let App = {
		tag: tag,
		preferences: require('./_conf/preferences.js'),
		lol: require('./_conf/lol.js'),
		server: null,
		LU: {},
		cache: {},
		lastRefresh: 0
	};

	App.server = Client.guilds.cache.find(guild => guild.id == App.preferences.serverId);

	if(!App.server) {
		console.log('Cannot find the server');
		return;
	}
	
	exportObj.App = App;

	const refresh = require('./modules/refresh.js');
	
	refresh();

	Client.setInterval(() => {
		refresh();
	}, 3600000); // toutes les 1 heures
});


Client.login(clientToken);