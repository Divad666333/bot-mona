
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

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

	if (!command) return;
	
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}!`;
		
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		
		return msg.channel.send(reply);
	}
		
		
	try {
		if (args[0] === '--help') {
			
			if (!command.description && !command.help && !command.aliases){
				return msg.channel.send(`This command has no help`);
			} else {
				if (command.description) {
					msg.channel.send(`${command.description}`);
				}
				if (command.help) {
					msg.channel.send(`${command.help}`);
				}
				if (command.aliases) {
					msg.channel.send(`\`Name: ${command.name}\`\n\`Aliases: ${command.aliases}\``);
				}
			}
		} else {
			command.execute(msg, args);
		}
	} catch (error) {
		console.error(error);
		msg.channel.send(`${msg.author}\n\`\`\`diff\n- There was an error trying to execute that command!\`\`\``);
	}
});
	
	/*
	
	switch (command) {
	
		case `help`:
			embed = new Discord.MessageEmbed()
			.setTitle('Hi!, I\'m Mona')
			.setColor(colorEmbed)
			.setDescription(`Currently I can\'t do much but I\'m improving by the day!`)
			.setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmegamitensei%2Fimages%2F6%2F68%2FP5_Morgana_character_artwork.png%2Frevision%2Flatest%3Fcb%3D20160505181742&f=1&nofb=1')
			.addField(`Prefix`, `**${prefix}**`)
			//Estaria bien poder poner la lista de comandos en mas de una linea para mas legibilidad del codigo pero no se hacerlo.
			.addField('Commands','help -> Shows you this message.\nprune (number) -> deletes "number" messages.\nping -> Replies with \'pong\'.\nuser (@User [optional]) -> User information.\nserver -> Server and members information.')
			.addField(`Dev. tools`, `args-info -> Shows arguments passed.\ncolor-palette -> Ref. of available discord colors.`)
			.addField(`Invite link`, `https://discord.com/oauth2/authorize?client_id=762431497390915584&scope=bot`, true)
			.addField(`GitHub`, `https://github.com/Divad666333/bot-mona`, true)
			.setImage('https://media.giphy.com/media/z6TMaaNJKIAX6/giphy.gif')
			.setFooter('I will gladly read your suggestions at: davidpablo@protonmail.com')
			.setTimestamp();
			msg.channel.send(embed);
			break;
			
		default:
			msg.channel.send(`\`\`\`diff\n- ${command} is not a command.\`\`\``);
	}
 });

*/

client.login(token);
		  