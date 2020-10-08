
const { prefix, colorEmbed } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(msg) {
		const listCommands = [];
		const listDescriptions = [];
		var data = "";
		const { commands } = msg.client;
				

		listCommands.push(...commands.map(command  => command.name));
		listDescriptions.push(...commands.map(command => command.description));
		
		
		listCommands.forEach(function(item, index, array) {
			data += `${prefix}${item} -> ${listDescriptions[index]}\n`
		})
		data += `\nYou can send \`${prefix}[command name] -h\` or \`${prefix}[command name] --help\` to get more info on a specific command!`
				
		embed = new Discord.MessageEmbed()
			.setTitle('Hi!, I\'m Mona')
			.setColor(colorEmbed)
			.setDescription(`Currently I can\'t do much but I\'m improving by the day!`)
			.setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmegamitensei%2Fimages%2F6%2F68%2FP5_Morgana_character_artwork.png%2Frevision%2Flatest%3Fcb%3D20160505181742&f=1&nofb=1')
			.addField(`Commands`, `${data}`)
			.addField(`Invite link`, `https://discord.com/oauth2/authorize?client_id=762431497390915584&scope=bot`, true)
			.addField(`GitHub`, `https://github.com/Divad666333/bot-mona`, true)
			.setImage('https://media.giphy.com/media/z6TMaaNJKIAX6/giphy.gif')
			.setFooter('I will gladly read your suggestions at: davidpablo@protonmail.com')
			.setTimestamp();

		return msg.author.send(embed)
			.then(() => {
				if (msg.channel.type === 'dm') return;
				msg.reply('I\'ve sent you a DM with all my commands!');
			})
			.catch(error => {
				console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
				msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
			});			
	},
};
