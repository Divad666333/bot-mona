
const Discord = require('discord.js');
const { colorEmbed, prefix } = require('../config.json');

module.exports = {
	name: 'yes-no',
	aliases: [ 'yesno', 'yes/no', 'si-no', 'sino', 'si/no' ],
	description: '**UNFINISHED** Makes a yes/no poll.',
	help: 'You can only vote once and the vote is permanent',
	args: true,
	usage: '<poll time in seconds> <question>',
	guildOnly: true,
	execute (msg, args) {
		var yesUsers = "";
		var noUsers = "";
		const pollTime = args.shift();
		if (isNaN(pollTime)) return msg.reply(`\`\`${pollTime}\`\` is not a number!`);
		const question = args.join(" ");
		msg.channel.bulkDelete(1, true);
		msg.channel.send(`@everyone`);
		
		embed = new Discord.MessageEmbed()
		.setTitle(`${msg.author.username} asks: ${question}`)
		.setColor(colorEmbed)
		
		msg.channel.send(embed).then (lastMsg => {
			
		lastMsg.react('👍').then (() => lastMsg.react('👎'));
			
		const filter = (reaction, user) => {
			return reaction.emoji.name === '👍' && user.id === msg.author.id || reaction.emoji.name === '👎' && user.id === msg.author.id;
		};

		const collector = lastMsg.createReactionCollector(filter, { time: pollTime * 1000 });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
			if (reaction.emoji.name === '👍'){
				yesUsers += `${user.username}\n`;
			} else {
				noUsers += `${user.username}\n`;
			}
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
			if(yesUsers) embed.addField(`Yes`, `${yesUsers}`, true);
			if(noUsers) embed.addField(`No`, `${noUsers}`, true);
			embed.setFooter(`${collected.size}/${msg.guild.members.cache.filter(member => !member.user.bot).size} people have voted.`)
			//msg.channel.delete(lastMsg, true);			//Hay que arreglar esto
			msg.channel.send(embed);
		});
	
		
		});
			
	},
};
