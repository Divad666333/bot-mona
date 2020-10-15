
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, colorEmbed } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const { Client, MessageEmbed } = require('discord.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (msg.channel.type != 'dm') msg.channel.bulkDelete(1);

	if (!command) return msg.reply(`\`${prefix}${commandName}\` is not a command`);	
	
	if (command.guildOnly && msg.channel.type === 'dm') return msg.reply('I can\'t execute that command inside DMs!');
	

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}!`;
		
		if (command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		
		return msg.channel.send(reply);
	}	
		
	try {
		if (args[0] === '--help' || args[0] === '-h') {
			embed = new Discord.MessageEmbed()
			.setTitle(`${command.name} help`)
			.setColor(colorEmbed)
			.setTimestamp()
			.setDescription(`${command.description}`)
			if (command.help) embed.addField(`Help`, `${command.help}`)
			if (command.usage) embed.addField(`Usage`, `${prefix}${command.name} ${command.usage}`)
			if (command.aliases) embed.addField(`Aliases`, `${command.aliases.join(" | ")}`)
			msg.channel.send(embed);
			
			
			//msg.channel.send(`${command.description}`);
			//if (command.help) msg.channel.send(`${command.help}`);
			//if (command.usage) msg.channel.send(`${prefix}${command.name} ${command.usage}`);
			//if (command.aliases) msg.channel.send(`\`Name: ${command.name}\`\n\`Aliases: ${command.aliases}\``);
		} else command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.channel.send(`${msg.author}\n\`\`\`diff\n- There was an error trying to execute that command!\`\`\``);
	}
});

client.login(token);
		  