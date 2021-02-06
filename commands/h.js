const fetch =  require('node-fetch')
const Discord = require('discord.js');
const { UserMarry } = require('../dbObjects')
module.exports = {
    name: "h",
    aliases: ['harem'],
    description : "user marrys",
    async execute (message, args) {
        const tag = await UserMarry.findAll({ where: { user: message.author.id } });
        if (tag) {
            //return message.channel.send(tag);
            const msg = tag.map(t => t.character).join(', ') || 'No tags set.'
            return message.channel.send(msg)
        }
        return message.reply('Could not find harem');
    }
}