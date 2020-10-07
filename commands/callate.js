
module.exports = {
	name: 'callate',
	description: 'He dosn\'t like this.',
	execute (msg, args) {
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
	},
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}
