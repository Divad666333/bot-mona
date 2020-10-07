
const Discord = require('discord.js');
const { colorEmbed } = require('../config.json');


module.exports = {
	name: 'user',
	description: 'User information.',
	execute (msg, args) {
		if (msg.mentions.users.size) {	
			msg.mentions.users.forEach(function(user) {
				userEmbed(user);
				msg.channel.send(embed);
			});		
		} else if (!args.length){
			userEmbed(msg.author);
			msg.channel.send(embed);
		} else {
			msg.channel.send(`\`\`\`diff\n- ${args[0]} is not an user.\`\`\``);
		}
	},
};

function userEmbed(user) {
	embed = new Discord.MessageEmbed()
	.setTitle(`${user.username} information:`)
	.setColor(colorEmbed)
	.setThumbnail(`${user.displayAvatarURL()}`)
	.addField(`Created`, `${user.createdAt}`, true)
	//Aqui se podria poner que dijera tambien los roles del usuario y si es admin pero tampoco se como hacerlo.
	.addField(`Tag`, `${user.tag}`, true)
	.addField(`ID`, `${user.id}`, true)
	.setTimestamp();
}
