const Discord = require('discord.js')
const fetch = require('node-fetch')
const baseApiUrl = require('../global').baseApiUrl

function photoReact (reaction, user, type) {
    if(!user.bot){
        const nome = reaction.message.embeds[0].title
        fetch(`${baseApiUrl}/character/search/${nome}`)
        .then((resp) => {
            let contentType = resp.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return resp.json().then(function(json) {
                    fetch(json.character.images)
                    .then((photos) => photos.json())
                    .then((resp) => {
                        
                        let photos = [];
                        for(let i = 0; i < resp.images.length; i++){
                            photos[i] = resp.images[i].url
                        }

                        
                        if(reaction.message.posicao == undefined){
                            reaction.message.posicao = 0;
                        }

                        if(type == 'add') {
                            reaction.message.posicao++;
                        } 
                        
                        if(type == 'decrease') {
                            reaction.message.posicao--;
                        }
                        
                        
                        if(reaction.message.posicao > photos.length-1 ){
                            reaction.message.posicao = 0;
                        }

                        if(reaction.message.posicao < 0) {
                            reaction.message.posicao = photos.length - 1;
                        }
                        
                        let index =  reaction.message.posicao
                        
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#FD3F96')
                        .setTitle(json.character.name)
                        .setDescription(json.character.anime_name)
                        .setImage(photos[index])
                        .setFooter(index + 1 + "/" + photos.length)
                        .setTimestamp()
                            
                        reaction.message.edit(exampleEmbed)
                    })
                })
            }
        })
    }
}

exports.photoReact = photoReact

