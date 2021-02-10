const fetch = require('node-fetch')
const Discord = require('discord.js');
const baseApiUrl = require('../global').baseApiUrl

module.exports = {
    name: "w",
    aliases: ['waifu'],
    description: "roleta a waifu",
    execute(message, args) {
        var resultFound = false
        var fetchNow = function(){
            let aleatorio = Math.floor(Math.random() * 3)
            let id = aleatorio * 10 + 1
            fetch(`${baseApiUrl}/character/${id}`)
            .then((resp) => {
                    let contentType = resp.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return resp.json().then(function (json) {
                            if(json.message !== 'id not found'){
                                resultFound = true
                                fetch(json.character.images)
                                .then((photos) => photos.json())
                                .then((resp) => {
                                    let photos = [];
                                    for(let i = 0; i < resp.images.length; i++){
                                        photos[i] = resp.images[i].url
                                    }

                                    console.log(photos[0])

                                    const exampleEmbed = new Discord.MessageEmbed()
                                    .setColor('#FD3F96')
                                    .setTitle(json.character.name)
                                    .setDescription(json.character.anime_name)
                                    .setImage(photos[0])
                                    .setTimestamp()
                                        
                                    message.channel.send(exampleEmbed).then( async exampleEmbed => {
                                        await exampleEmbed.react('💖');
                                    });  
                                })
                            }else{
                                console.log(json.message)
                                fetchNow()
                            }
                        })
                    }
            })
        }
        fetchNow()
    }
}