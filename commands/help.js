const fetch = require('node-fetch')
const Discord = require('discord.js');
const { UserMarry } = require('../dbObjects')
module.exports = {
    name: "help",
    description: "help message",
    async execute(message, args) {

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FD3F96')
            .setTitle("🎲 Roleta do Caralho 🎲")
            .setDescription(`**!waifu:** Roleta uma waifu aleatoriamente.
                            **!harem** Mostra seus personagens casados.
                            **!character <Personagem>** Pesquisa o personagem descrito.\n`
                            )
            .setTimestamp()

        message.channel.send(exampleEmbed)
    }
}