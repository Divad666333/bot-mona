
const Discord = require('discord.js');
const { colorEmbed, prefix } = require('../config.json');

module.exports = {
	name: 'yes-no',
	aliases: [ 'yesno', 'yes/no', 'si-no', 'sino', 'si/no' ],
	description: 'Makes a yes/no poll.',
	help: 'You can only vote once and the vote is permanent.',
	args: true,
	usage: '<hours> <minutes> <secconds> <question>',
	guildOnly: true,
	execute (msg, args) {
		var yesUsers = [];
		var noUsers = [];
		const pollHr = args.shift();
		const pollMin = args.shift();
		const pollSec = args.shift();
		var pollTime = pollHr * 60 * 60 *1000;
		pollTime += pollMin * 60 * 1000;
		pollTime += pollSec * 1000;
		
		
		if (isNaN (pollHr) ||isNaN(pollMin) || isNaN (pollSec) ) return msg.reply(`Incorect number formatting.`);
		if (pollHr > 99 || pollMin > 59 || pollSec > 59) return msg.reply(`The maximum time is 99h 59\' 59\'\'`);
		const question = args.join(" ");
		msg.channel.send(`@everyone`).then (everyoneMsg => {
		
			embed = new Discord.MessageEmbed()
			.setTitle(`${msg.author.username} asks: ${question}`)
			.setColor(colorEmbed)
			.setImage(`https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif`)
			embed.setFooter(`Voting time: ${pollHr}h ${pollMin}\' ${pollSec}\'\'`);

			msg.channel.send(embed).then (lastMsg => {

				lastMsg.react('👍').then (() => lastMsg.react('👎'));

				const filter = (reaction, user) => {
					return reaction.emoji.name === '👍' && user.id != lastMsg.author.id || reaction.emoji.name === '👎' && user.id != lastMsg.author.id;
				};

				const collector = lastMsg.createReactionCollector(filter, { max: msg.guild.members.cache.filter(member => !member.user.bot).size, time: pollTime });

				collector.on('collect', (reaction, user) => {
					//console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
					if (reaction.emoji.name === '👍'){
						yesUsers.push(user.username);
					} else if (reaction.emoji.name === '👎'){
						noUsers.push(user.username);
					}
				});

				collector.on('end', collected => {
					//console.log(`Collected ${collected.size} items`);
					embed.setTitle(`Poll results`);
					embed.setDescription(`${msg.author.username} asked: ${question}\n Here are the results.`);
					embed.setFooter(`${collected.size}/${msg.guild.members.cache.filter(member => !member.user.bot).size} people voted.`)
					if (yesUsers.length) embed.addField(`Yes (${yesUsers.length})`, `${yesUsers.join("\n")}`, true);
					if (noUsers.length) embed.addField(`No (${noUsers.length})`, `${noUsers.join("\n")}`, true);
					if (yesUsers.length > noUsers.length) embed.setImage(`https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif`);
					if (noUsers.length > yesUsers.length) embed.setImage(`https://media.giphy.com/media/xT1XGBwMkN0bHxrlxm/giphy.gif`);
					if (yesUsers.length === noUsers.length && yesUsers.lenght > 0 ) {
						embed.setImage(`https://media.giphy.com/media/229FF1llKgmyWGpOpX/giphy.gif`);
						msg.channel.send(`No encuentro gif decente para esta, si veis alguno (preferiblemente en giphy) avisad plis`);
					}
					if (yesUsers.length == 0 && noUsers.length == 0) embed.setImage(`https://media.giphy.com/media/l2R013mIf1ZXdvoyI/giphy.gif`);
					//everyoneMsg.delete();
					//lastMsg.delete();
					msg.channel.send(embed);
				});
			});
		});	
	},
};
