module.exports = {
    "name": "w",
    "description" : "roleta a waifu",
    execute (message, args) {
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
    }
}