
module.exports = {
	name: 'prune',
	description: 'Deletes "number" messages.',
	execute (msg, args) {
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
	},
};
