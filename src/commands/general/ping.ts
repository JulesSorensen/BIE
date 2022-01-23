module.exports = {
	name: 'ping',
	guildOnly: false,
	execute(msg, args, client, prefix, version) {
		let time = Date.now() - msg.createdTimestamp;
        msg.channel.send(`:green_circle: <@${msg.author.id}> ping: ${time}ms`);
	}
};