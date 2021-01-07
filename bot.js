const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const fetch =  require('node-fetch')
const {token,prefix} = require('./config.json')


const client = new Discord.Client();

client.login(token)

client.on('message',mensagem);

function mensagem(message){
    if (!message.content.startsWith(prefix) || message.author.bot) return;      
    const args = message.content.slice(prefix.length).trim().split(/ +/);     
    const command = args.shift().toLowerCase();      
    
    if (command === 'w') {                 
        let id = Math.floor(Math.random() * 5) +1   
                    
        fetch(`http://localhost:3000/character/${id}`)
        .then((resp) => {
            var contentType = resp.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return resp.json().then(function(json) {
                    const attachment =  new Discord.MessageAttachment(json.characters[0].photo, 'image.png')
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#FD3F96')
                    .setTitle(json.characters[0].name)
                    .attachFiles(attachment)
                    .setDescription(json.characters[0].anime_name)
                    .setThumbnail(json.characters[0].photo)
                    .setImage('attachment://image.png')
                    .setTimestamp()
                    message.channel.send(exampleEmbed);
                })
            }
        })

    } else if (command === 'rola') {         
        let tamanhoDaRola='';
        for(let i=0; i<Math.floor(Math.random() * 1000);i++){
            tamanhoDaRola+='='
        }
        message.channel.send(`8${tamanhoDaRola}D`);
    }
    else if (command === 'gay') {
        let tamanhoDaRola='';
        tamanhoDaRola+=Math.floor(Math.random() * 100)
        message.reply(`Vc é ${tamanhoDaRola}% gay`);
    }
}