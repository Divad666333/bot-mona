
module.exports = {
	name: 'ping',
	description: 'Replies with \'pong\'.',
	execute (msg) {
		msg.channel.send('pong');
	},
};
