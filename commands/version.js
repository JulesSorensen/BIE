module.exports = {
	name: 'version',
	guildOnly: false,
	execute(msg, args, client, prefix, getca, version) {
        msg.reply(`current build: ${version}`);
	}
};