


module.exports = {
	name: 'args-info',
	description: 'Returns arguments passed.',
	args: true,
	execute (msg, args) {
		msg.channel.send(`\`\`\`\nMessage: ${msg}\nArguments: ${args}\nArguments length: ${args.length}\`\`\``);
	},
};
