module.exports = {
	name: 'ping',
	guildOnly: false,
	execute(msg, args, client, prefix, getca, version) {
        msg.channel.send(`:green_circle: <@${msg.author.id}> ping: ${Date.now() - msg.createdTimestamp}ms`);
	}
};