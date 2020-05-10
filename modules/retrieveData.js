const {Client, App} = require('../index.js');
const {mean} = require('./utils.js');

async function retrieveData() {
    App.lastRefresh = (new Date()).toString().replace(/(([a-zA-Z]{3}\s){2}\d{2}\s\d{4}\s(\d{2}:){2}\d{2}).*/, '$1');

    let roles = App.server.roles;
	let LUs = {};

	roles.cache.each(role => {
		if(role.name.startsWith("LU")) {
            let name = role.name.replace(/(LU|\s|\"|\')*/gi, "");
            
            App.server.members.fetch().then(guildMembers => {
                let members = guildMembers.array().filter(member => member.roles.cache.has(role.id)/*  && !member.user.bot */);
                let elos = [];
                let lanes = [];

                members = members.map(member => {
                    let roles = member.roles.cache.array().map(role => role.name);
                    let memberElo = roles.filter(role => App.preferences.roles.elo.indexOf(role) !== -1);
                    let memberLane = roles.filter(role => App.preferences.roles.lanes.indexOf(role) !== -1);

                    if(memberElo.length > 0) elos.push(memberElo[0]);
                    if(memberLane.length > 0) lanes.push(memberLane[0]);
                    return {
                        name: member.nickname? member.nickname : member.user.username,
                        elo: memberElo[0] || null,
                        lane: memberLane[0] || null
                    };
                });

                let lu = {
                    name: name,
                    id: role.id,
                    memberCount: members.length,
                    members: members,
                    membersElo: elos,
                    elo: mean(elos, App.preferences.roles.elo) || 'Unranked',
                    lanes: lanes
                };
                
                LUs[name] = lu;
            });
        }
	});

	App.LU = LUs;
};

module.exports = retrieveData;