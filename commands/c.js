const fetch =  require('node-fetch')
const Discord = require('discord.js')
const baseApiUrl = require('../global').baseApiUrl

module.exports = {
    name: "c",
    aliases: ['character'],
    description : "search character",
    execute (message, args) {
        let nome = '';
        for(let i = 0; i < args.length; i++){
            nome += args[i]+" "
        }

        fetch(`${baseApiUrl}/character/search/${nome.substring(0, nome.length-1)}`)
        .then((resp) => {
            let contentType = resp.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return resp.json().then(function(json) {
                    fetch(json.character.images)
                    .then((photos) =>   photos.json())
                    .then((resp) => {
                        
                        let photos = [];
                        for(let i = 0; i < resp.images.length; i++){
                            photos[i] = resp.images[i].url
                        }

                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FD3F96')
                        .setTitle(json.character.name)
                        .setDescription(json.character.anime_name)
                        .setImage(photos[0])
                        .setFooter("1/" + photos.length)
                        .setTimestamp()
                            
                        message.channel.send(exampleEmbed).then( async exampleEmbed => {
                            await exampleEmbed.react('👈')
                            await exampleEmbed.react('👉');
                        }).catch(console.error);  
                    
                    })
                })
            }
        })
    },
}