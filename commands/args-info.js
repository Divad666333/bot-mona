
module.exports = {
	name: 'args-info',
	description: 'Returns arguments passed.',
	execute (msg, args) {
		if (!args.length) {
			return msg.channel.send(`\`\`\`diff\n- You didn\'t provide any arguments!\`\`\``);
		}
		msg.channel.send(`\`\`\`\nMessage: ${msg}\nArguments: ${args}\`\`\``);
	},
};
