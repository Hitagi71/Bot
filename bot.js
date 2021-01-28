const fs = require('fs');
const Discord = require('discord.js');
const fetch = require('node-fetch')
const { prefix, token } = require('./config.json');
const { UserMarry } = require('./dbObjects.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!')
});

client.on('guildMemberAdd', async(member) =>{
    let guild = client.guilds.cache.get("619613533407019009");
    let channel = client.channels.cache.get("729797123649830912");
    if(guild == member.guild){
		let embed = new Discord.MessageEmbed()
        embed.setColor('#8a5fb0')
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL())
        embed.setTitle('Boas-Vindas')
        embed.setImage('https://thumbs.gfycat.com/AffectionateCheapFeline-small.gif')
        embed.setDescription(`Bem vindo(a), ${member.user}!!! Leia as <#729795085788643408> e faça seu <#729795259340685414>. Divirta-se`)
        embed.addField('Canais', 'Leia as <#729795085788643408> \n Faça seu <#729795259340685414>. Divirta-se')
        embed.setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size : 1024}))
        embed.setTimeStamp()
        await channel.send(embed);
    }
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 300;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 300;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.on('messageReactionAdd', async (reaction, user) => {
	if(reaction.emoji.name === "💖") {
		if(!user.bot && reaction.count == 2){			
			//reaction.message.embeds[0].setFooter(`Pertence a ${user.username}`, user.displayAvatarURL());
			//reaction.message.edit(reaction.message.embeds[0])
			
			let nome = reaction.message.embeds[0].title

			
			try {
				const tag = await UserMarry.create({
					user: user.id,
					character: nome,
				})
             
                return reaction.message.channel.send(`${user.username} esta casado ${nome}`)
            }
            catch (e) {
               console.error(e)
            }
		}
	}else if(reaction.emoji.name === "👉") {
		console.log(user)
		if(!user.bot){
			const nome = reaction.message.embeds[0].title
			fetch(`http://localhost:3000/character/search/${nome}`)
			.then((resp) => {
				let contentType = resp.headers.get("content-type");
				if(contentType && contentType.indexOf("application/json") !== -1) {
					return resp.json().then(function(json) {
						fetch(json.character.photos)
						.then((photos) => photos.json())
						.then((resp) => {
							
							let photos = [];
							for(let i = 0; i < resp.character.length; i++){
								photos[i] = resp.character[i].photo
							}

							if(reaction.message.posicao == undefined){
								reaction.message.posicao = 1;
							}else if(reaction.message.posicao > photos.length-1){
								reaction.message.posicao = 0;
							}else{
								reaction.message.posicao++;
							}
							
							let index =  reaction.message.posicao
							
							const attachment = new Discord.MessageAttachment(photos[index], 'image.png')
							const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#FD3F96')
							.attachFiles(attachment)
							.setTitle(json.character.name)
							.setDescription(json.character.anime_name)
							.setImage('attachment://image.png')
							.setTimestamp()
								
							reaction.message.edit(exampleEmbed)
						})
					})
				}
			})
		}
	}	
})

client.login(token);