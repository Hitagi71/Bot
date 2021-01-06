const https = require('https')
const Discord = require('discord.js')
const fetch =  require('node-fetch')

const client = new Discord.Client();
client.login('Nzk1MDIxNzczNTE0MzQyNDcw.X_DTuQ.mwQRWVTrA-o3frP7vvJqQRBlrlI')

client.on('message',mensagem);
client.on('')

function mensagem(msg){
    if(msg.content == 'Luiz gay'){
        msg.reply('É verdade')
    }else if(msg.content ==  'img'){
        let id = Math.round(Math.random() * 3000)
        console.log(id)
        fetch(`https://api.jikan.moe/v3/character/${id}/pictures`)
        .then((resp) => resp.json())
        .then(data => Array.from(data.pictures))
        .then(data => msg.channel.send(data[0].large))
        
    }else if(msg.content == 'Anime'){
        let id = Math.round(Math.random() * 3000)
        console.log(id)
        fetch(`https://api.jikan.moe/v3/anime/${id}/pictures`)
        .then((resp) => resp.json())
        .then(data => Array.from(data.pictures))
        .then(data => msg.channel.send(data[0].large))
    }else if(msg.content ==  'Luiz corno'){
        msg.reply('É verdade')
    }
}