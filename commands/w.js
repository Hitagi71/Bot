const fetch = require('node-fetch')
const Discord = require('discord.js');

module.exports = {
    name: "w",
    aliases: ['waifu'],
    description: "roleta a waifu",
    execute(message, args) {
        var resultFound = false
        var fetchNow = function(){
            var id = Math.floor(Math.random() * 150) + 1
            fetch(`http://localhost:3000/character/${id}`)
            .then((resp) => {
                
                    let contentType = resp.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return resp.json().then(function (json) {
                            if(json.message !== 'id not found'){
                                resultFound = true
                                fetch(json.character.photos)
                                .then((photos) => photos.json())
                                .then((resp) => {
                                    let photos = [];
                                    for(let i = 0; i < resp.images.length; i++){
                                        photos[i] = resp.images[i].photo
                                    }

                                    const attachment = new Discord.MessageAttachment(photos[0], 'image.png')
                                    const exampleEmbed = new Discord.MessageEmbed()
                                    .setColor('#FD3F96')
                                    .attachFiles(attachment)
                                    .setTitle(json.character.name)
                                    .setDescription(json.character.anime_name)
                                    .setImage('attachment://image.png')
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