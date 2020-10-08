
const Discord = require('discord.js');
const { colorEmbed } = require('../config.json');

module.exports = {
	name: 'meet',
	aliases: [ 'quedar' ],
	description: '**UNFINISHED** Makes a poll for a meeting.',
	help: 'You need to pass now/today/this week',
	args: true,
	usage: '<when to meet>',
	guildOnly: true,
	execute (msg, args) {
		const arg = args.join(" ");
		msg.channel.bulkDelete(1, true);
		msg.channel.send(`@everyone`);
		
		embed = new Discord.MessageEmbed()
		.setTitle(`${msg.author.username} wants to meet ${arg}!`)
		msg.channel.send(embed).then ((lastMsg) => lastMsg.react('👍').then (() => lastMsg.react('👎')));
			
	},
};
