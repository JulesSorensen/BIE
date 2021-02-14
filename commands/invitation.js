module.exports = {
	name: 'invitation',
	description: 'Information about the arguments provided.',
    args: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
		let lang = getca(`language`)
		if (lang[msg.author.id] == `FR`) {
			msg.channel.send(`Voici le lien pour m'inviter sur votre serveur : https://discord.com/oauth2/authorize?client_id=802976208261218334&scope=bot&permissions=2146958847\nVous pouvez aussi rejoindre le serveur officiel de Glede : https://discord.gg/mycFtdy5CV`);
		} else if (lang[msg.author.id] == `NO`) {
			msg.channel.send(`Her er lenken for å invitere meg på serveren din: https://discord.com/oauth2/authorize?client_id=802976208261218334&scope=bot&permissions=2146958847\nDu kan også bli med på den offisielle Glede-serveren : https://discord.gg/mycFtdy5CV`);
		} else {
			msg.channel.send(`Here is the link to invite me on your server: https://discord.com/oauth2/authorize?client_id=802976208261218334&scope=bot&permissions=2146958847\nYou can also join the official Glede server : https://discord.gg/mycFtdy5CV`);
		}
        
	}
};