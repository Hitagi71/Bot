const fetch =  require('node-fetch')
const Discord = require('discord.js');
const banco = require('../banco')
module.exports = {
    "name": "h",
    "description" : "user marrys",
    async execute (message, args) {
        const tag = await banco.user_marry.findAll({ where: { user: message.author.id } });
        if (tag) {
            //return message.channel.send(tag);
            const msg = tag.map(t => t.character).join(', ') || 'No tags set.'
            return message.channel.send(msg)
        }
        return message.reply('Could not find harem');
    }
}