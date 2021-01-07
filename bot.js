const Discord = require('discord.js')
const { Client, MessageAttachment } = require('discord.js');
const fetch =  require('node-fetch')
const {token} = require('./config.json')


const client = new Discord.Client();

client.login(token)


client.on('message',mensagem);

function mensagem(msg){
    if(msg.content == 'Luiz gay'){
        msg.reply('É verdade')
    }else if(msg.content ==  'img'){
        fetch(`http://localhost:3000/images/1_1.png`)
        .then((resp) =>  {
            const attachment = new MessageAttachment(resp.url);
            msg.channel.send(attachment)
        }) 
    }
}