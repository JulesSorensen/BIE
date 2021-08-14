module.exports = {
	name: 'invitation',
	description: 'Information about the arguments provided.',
    args: false,
	guildOnly: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
		let lang = getca(`language`)
		if (lang[msg.author.id] == `FR`) {
			msg.channel.send(`Voici le lien pour m'inviter sur votre serveur : https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot\nVous pouvez aussi rejoindre le serveur officiel de Glede : https://discord.gg/zYwdmaa7Nr`);
		} else if (lang[msg.author.id] == `NO`) {
			msg.channel.send(`Her er lenken for å invitere meg på serveren din: https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot\nDu kan også bli med på den offisielle Glede-serveren : https://discord.gg/zYwdmaa7Nr`);
		} else {
			msg.channel.send(`Here is the link to invite me on your server: https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot\nYou can also join the official Glede server : https://discord.gg/zYwdmaa7Nr`);
		}
        
	}
};