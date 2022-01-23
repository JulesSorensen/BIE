module.exports = {
	name: 'invitation',
	guildOnly: false,
	execute(msg, args, client, prefix, getca, version) {
		let lang = getca(`language`)
		if (lang[msg.author.id] == `FR`) {
			msg.channel.send(`Voici le lien pour m'inviter sur votre serveur : https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot`);
		} else if (lang[msg.author.id] == `NO`) {
			msg.channel.send(`Her er lenken for å invitere meg på serveren din: https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot`);
		} else {
			msg.channel.send(`Here is the link to invite me on your server: https://discord.com/api/oauth2/authorize?client_id=839602909942906891&permissions=8&scope=bot`);
		}
        
	}
};