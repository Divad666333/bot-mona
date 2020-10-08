
const Discord = require('discord.js');
const {colorEmbed} = require('../config.json');

module.exports = {
	name: 'server',
	aliases: ['serverinfo', 'server-info'],
	description: 'Server and members information.',
	guildOnly: true,
	execute (msg) {
		embed = new Discord.MessageEmbed()
		.setTitle(`${msg.guild.name} info:`)
		.setColor(colorEmbed)
		.setThumbnail(`${msg.guild.iconURL()}`)
		.addField(`Member count`,`All: ${msg.guild.memberCount}\nHumans: ${msg.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${msg.guild.members.cache.filter(member => member.user.bot).size}`, true)
		.addField(`Member stattus`, `Online: ${msg.guild.members.cache.filter(member => member.presence.status === 'online' && !member.user.bot).size}\nIdle: ${msg.guild.members.cache.filter(member => member.presence.status === 'idle' && !member.user.bot).size}\nOffline: ${msg.guild.members.cache.filter(member => member.presence.status === 'offline' && !member.user.bot).size}`, true)
		.addField(`Maximum members`,`${msg.guild.maximumMembers}`, true)
		.addField(`Creation date`, `${msg.guild.createdAt}`, true)
		.addField(`Region`, `${msg.guild.region}`, true)
		.setTimestamp();
		msg.channel.send(embed);
	},
};
