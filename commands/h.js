const fetch =  require('node-fetch')
const Discord = require('discord.js');
const { UserMarry } = require('../dbObjects')
const  baseApiUrl  = require('../global').baseApiUrl

module.exports = {
    name: "h",
    aliases: ['harem'],
    description : "user marrys",
    async execute (message, args) {
        const tag = await UserMarry.findAll({ where: { user: message.author.id } });
        if (tag) {

            let waifus = ""
            for(let i = 0; i < tag.length; i++) {
                waifus+= tag[i].dataValues.character+"\n"
            }

            let lastWaifu = tag[tag.length - 1].dataValues.character

            fetch(`${baseApiUrl}/character/search/${lastWaifu}`)
            .then((resp) => { 
                return resp.json().then(function (json) {
                    fetch(json.character.images)
                    .then((resp) => resp.json())
                    .then((photos) => {
                        const photo = photos.images[0].url

                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setAuthor("Personagens do(a) "+message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg", 'https://discord.js.org')
                            .setURL(photo)
                            .setThumbnail(photo)
                            .setDescription(waifus)
                        

                            return message.channel.send(exampleEmbed)
                    })
                })
            })        
        } else {
            return message.reply('Could not find harem');
        } 
    }
}
