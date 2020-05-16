const {Client, App} = require('../index.js');
const {channel, emoji, copy} = require('./utils.js');

async function sendData() {
    // create "cache" as a last save of the data
    App.cache.LU = copy(App.LU);

    let guilds = App.preferences.otherGuilds.map(guildId => Client.guilds.cache.find(guild => guild.id == guildId));
    guilds.push(App.server);

    guilds.forEach(guild => {
        
        let chan = channel(guild, 'name', App.preferences.channels.LU);
        if(!chan) return;
        
        chan.fetch().then(chan => {
            chan.messages.fetch({limit: 100}).then(async function(messages) {
                const filteredMessages = messages.array().filter(msg => msg.author.id == Client.user.id);
                const message = filteredMessages[0] || null;

                if(message) {
                    // need to modify it
                    modifyMessage(chan, filteredMessages);
                } else {
                    // need to send new message
                    let content = createMessage();
                    for(msg in content) await chan.send(content[msg]);
                }
            });
        });

    });
};

const createMessage = () => {
    let n = Object.keys(App.LU).length;

    let content = {info: `Nombre de Line Up: ${n}\nDernière mise à jour: ${App.lastRefresh}`};

    for(let i in App.LU) {
        lu = App.LU[i];

        let subContent = '';
        subContent += `__**${i}**__\n\`Membres:\` ${lu.memberCount}, \`Elo:\` ${lu.elo} ${lu.elo != 'Unranked'? emoji(lu.elo.toLowerCase().replace(' ', '')) : ''}\n`;
        if(lu.members.length > 0) {
            for(let i in App.lol.lanes) {
                let lane = App.lol.lanes[i];
                let serverLane = App.preferences.roles.lanes[i];

                subContent += emoji(lane.toLowerCase());
                subContent += lu.members.filter(member => member.lane == serverLane).map(member => member.name).join(', ');
                subContent += '\n';
            }
        }

        content[i] = subContent;
    }


    return content;
};

const modifyMessage = (chan, messages) => {
    let n = Object.keys(App.LU).length;
    let nLuContent = 'Nombre de Line Up: ';

    let nLUmsg = messages.filter(msg => msg.content.startsWith(nLuContent))[0];
    nLUmsg.edit(nLuContent + n + '\nDernière mise à jour: ' + App.lastRefresh);

    let content = createMessage();
    delete content.info;

    for(let msg of messages) {
        let lu = msg.content.match(/^__\*\*(.*)\*\*__.*$/m, '$1');
        if(lu) {
            let isAlive = lu[1] in App.LU;
            if(!isAlive && msg.deletable) msg.delete();
        }
    }

    for(let luName in content) {
        // find the message of the lu infos
        let luMsg = messages.filter(msg => msg.content.includes(luName))[0] || null;

        if(!luMsg) {
            // not a message for this lu: create it
            chan.send(content[luName]);

        } else {
            // verify if there is news, else it's useless to modify it, and it takes more process time
            // .
            // edit the existing message
            if(luMsg.editable) luMsg.edit(content[luName]);
        }
    }
};

module.exports = sendData;