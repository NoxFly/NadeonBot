module.exports = {
    serverId: process.env.SERVERID, // Nadeon

    otherGuilds: [
        process.env.SWI
    ],

    channels: {
        LU: 'line-up-informations'
    },

    // role names in the server
    roles: {
        lanes: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
        elo: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grand Master', 'Challenger']
    },

    emojiGuild: process.env.emojiGuild,

    // emoji names in the server
    emojis: {
        'iron':         '707892384360300594',
        'bronze':       '707892384679067669',
        'silver':       '707892384305774593',
        'gold':         '707892384205111297',
        'platinum':     '707892384729530399',
        'diamond':      '707892384960348210',
        'master':       '707892384880394270',
        'grandmaster':  '707892384549175327',
        'challenger':   '707892384821674055',

        'top':          '707891226199851039',
        'jungle':       '707891226023821403',
        'mid':          '707891226329743467',
        'bot':          '707891226271023114',
        'support':      '707891226321485887'
    }
};