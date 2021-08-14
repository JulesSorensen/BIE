module.exports = {
	name: 'ping',
	description: 'Information about the arguments provided.',
    args: false,
	guildOnly: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
        msg.channel.send(`:green_circle: <@${msg.author.id}> ping: ${Date.now() - msg.createdTimestamp}ms`);
	}
};