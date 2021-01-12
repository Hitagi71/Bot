const fetch =  require('node-fetch')
const Discord = require('discord.js');

module.exports = {
    "name": "c",
    "description" : "search character",
    execute (message, args) {
        
        for(let i = 0; i < args.length; i++){
            console.log(args[i])
        }
    }
}