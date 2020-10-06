const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
//const client = new Client();
//console.log(client)

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.login(token);

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	switch (command) {
			
		case `args-info`:
			if (!args.length) {
				return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
			}
			msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
			break;
	
		case `help`:
			embed = new Discord.MessageEmbed()
			.setTitle('Hi!, I\'m Mona')
			.setColor('#0099ff')	//Blue
			.setDescription(`Currently I can\'t do much but I\'m improving by the day!`)
			.setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmegamitensei%2Fimages%2F6%2F68%2FP5_Morgana_character_artwork.png%2Frevision%2Flatest%3Fcb%3D20160505181742&f=1&nofb=1')
			.addField(`Prefix:`, `**${prefix}**`)
			//Estaria bien poder poner la lista de comandos en mas de una linea para mas legibilidad del codigo pero no se hacerlo.
			.addField('Commands','help -> Shows you this message.\nargs-info -> Debug tool to show input.\nprune (number) -> deletes "number" messages.\nping -> Replies with \'pong\'.\nuser (@User [optional]) -> User information.\nserver -> Server and members information.')
			.addField(`Invite link:`, `https://discord.com/oauth2/authorize?client_id=762431497390915584&scope=bot`, true)
			.addField(`GitHub:`, `https://github.com/Divad666333/bot-mona`, true)
			.setImage('https://media.giphy.com/media/z6TMaaNJKIAX6/giphy.gif')
			.setFooter('I will gladly read your suggestions at: davidpablo@protonmail.com')
			.setTimestamp();
			msg.channel.send(embed);
			break;
	
		case `ping`:
 			msg.channel.send('pong');
			break;
	
		case `user`:
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
			break;
	
		case `server`:
			embed = new Discord.MessageEmbed()
			.setTitle(`${msg.guild.name} info:`)
			.setColor('#0099ff')	//Blue
			.setThumbnail(`${msg.guild.iconURL()}`)
			.addField(`Member count:`,`All: ${msg.guild.memberCount}\nHumans: ${msg.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${msg.guild.members.cache.filter(member => member.user.bot).size}`, true)
			.addField(`Member stattus:`, `Online: ${msg.guild.members.cache.filter(member => member.presence.status === 'online' && !member.user.bot).size}\nIdle: ${msg.guild.members.cache.filter(member => member.presence.status === 'idle' && !member.user.bot).size}\nOffline: ${msg.guild.members.cache.filter(member => member.presence.status === 'offline' && !member.user.bot).size}`, true)
			.addField(`Maximum members:`,`${msg.guild.maximumMembers}`, true)
			.addField(`Creation date:`, `${msg.guild.createdAt}`, true)
			.addField(`Region:`, `${msg.guild.region}`, true)
			.setTimestamp();
			msg.channel.send(embed);
			break;

		case `prune`:
			const amount = parseInt(args[0]) + 1;
			if (isNaN(amount)) {
				return msg.channel.send(`\`\`\`diff\n- ${args[0]} is not a valid number.\`\`\``);
			} else if (amount <= 1 || amount > 100) {
				return msg.channel.send(`\`\`\`diff\n- You need to imput a number between 1 and 99.\`\`\``);
			}
			
			msg.channel.bulkDelete(amount, true).catch(err => {
			//console.error(err);
			msg.channel.send(`\`\`\`diff\n- There was an error trying to prune messages in this channel!\`\`\``);
			});
			break;
			
		case `callate`:
			if (args.length) {
				number = Number(args[0]);
			} else {
				number = getRandomInt(1, 10);
			}
			
			switch (number) {
				case 1:		//No sirves para nada
					msg.reply('no sirves para nada');
					break;
					
				case 2:		//A las 5 en el pirulo
					msg.channel.send(`A las 5 en el pirulo ${msg.author.username}.`);
					break;
					
				case 3:		//Deal with it
					msg.channel.send('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F1%2FDeal-With-It-Sunglass-Transparent-Background.png&f=1&nofb=1');
					break;
									
				case 4:		//Try me
					msg.channel.send('https://cdn.shopify.com/s/files/1/0355/8941/products/GO_AHEAD_TRY_ME.png?v=1392232268');
					break;
					
				case 5:		//Tu primero
					msg.reply(`tu primero`);
					break;
				
				case 6:		//Crying wojak
					msg.channel.send('https://i0.kym-cdn.com/entries/icons/original/000/024/207/brainlettttt.jpg');
					msg.channel.send(`${msg.author} you rn.`);
					break;
					
				case 7:		//k
					msg.channel.send(`k`);
					break;
				
				case 8:		//Punching wojak
					msg.channel.send(`${msg.author}`);
					msg.channel.send('https://www.vippng.com/png/detail/403-4032083_view-1479850296243-wojak-gif.png');
					break;
				
				case 9:		//Ahora mismo campeon
					msg.channel.send(`Ahora mismo campeon.`);
					break;
					
				case 10:	//Why? Are you offended 'username'? / Go fkn cry
					msg.channel.send(`Why? Are you offended ${msg.author.username}?\n**Go fkn cry**`);
					break;
				
				default:
					msg.channel.send(`\`\`\`diff\n- ${number} is out of scope.\`\`\``);
			}
 			break;
		default:
			msg.channel.send(`\`\`\`diff\n- ${command} is not a command.\`\`\``);
	}
 });

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

function userEmbed(user) {
	embed = new Discord.MessageEmbed()
	.setTitle(`${user.username} information:`)
	.setColor('#0099ff')	//Blue
	.setThumbnail(`${user.displayAvatarURL()}`)
	.addField(`Created:`, `${user.createdAt}`, true)
	//Aqui se podria poner que dijera tambien los roles del usuario y si es admin pero tampoco se como hacerlo.
	.addField(`Tag:`, `${user.tag}`, true)
	.addField(`ID:`, `${user.id}`, true)
	.setTimestamp();
}
