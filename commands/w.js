const fetch =  require('node-fetch')
const Discord = require('discord.js');

module.exports = {
    "name": "w",
    "description" : "roleta a waifu",
    execute (message, args) {
        let id = Math.floor(Math.random() * 5) +1       
        fetch(`http://localhost:3000/character/${id}`)
        .then((resp) => {
            let contentType = resp.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return resp.json().then(function(json) {
                    
                    fetch(json.character.photos)
                    .then((photos) => photos.json())
                    .then((resp) => {
                        
                        let photos = [];
                        for(let i = 0; i < resp.characters.length; i++){
                            photos[i] = resp.characters[i].photo
                        }
        
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FD3F96')
                        .setTitle(json.character.name)
                        //.attachFiles(attachment)
                        .setDescription(json.character.anime_name)
                        //.setImage('attachment://image.png')
                        .setTimestamp()
                        message.channel.send(exampleEmbed).then( async exampleEmbed => {
                            await exampleEmbed.react('💖');
                        });  
                    })
                })
            }
        })
    }
}