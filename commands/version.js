module.exports = {
	name: 'version',
	description: 'Information about the arguments provided.',
    args: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
        msg.reply(`current version: ${version}`);
	}
};