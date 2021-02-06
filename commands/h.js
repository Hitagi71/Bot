const fetch =  require('node-fetch')
const Discord = require('discord.js');
const { UserMarry } = require('../dbObjects')
module.exports = {
    "name": "h",
    "description" : "user marrys",
    async execute (message, args) {
        const tag = await UserMarry.findAll({ where: { user: message.author.id } });
        if (tag) {

            let waifus = ""
            for(let i = 0; i < tag.length; i++) {
                waifus+= tag[i].dataValues.character+"\n"
            }

            let lastWaifu = tag[tag.length - 1].dataValues.character

            console.log(`http://localhost:3000/character/search/${lastWaifu}`)

            fetch(`http://localhost:3000/character/search/${lastWaifu}`)
            .then((resp) => { 
                return resp.json().then(function (json) {
                    fetch(json.character.photos)
                    .then((resp) => resp.json())
                    .then((photos) => {
                        const photo = photos.images[0].photo

                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setAuthor("Puteiro do "+message.author.username, "https://cdn.discordapp.com/avatars/"+message.author.id+"/"+message.author.avatar+".jpeg", 'https://discord.js.org')
                            .setThumbnail(photo)
                            .setDescription(waifus)
                        

                            return message.channel.send(exampleEmbed)
                    })
                })
            })        
        }
        return message.reply('Could not find harem');
    }
}