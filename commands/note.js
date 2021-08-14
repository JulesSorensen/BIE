module.exports = {
	name: 'note',
	description: 'Information about the arguments provided.',
    args: false,
	guildOnly: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
		// if (msg.guild.id != "762698485011054602") return;
        var desc = (!args[0]) ? false : args.join(' ');
        if(!desc) return msg.reply(`vous devez précisez la matière après la commande`).catch(()=>{;});
		msg.delete({ timeout: 10 }).catch(()=>{;});
        (client.channels.cache.get(`864439897107857438`)).send(`<@&871298481233494027>`).catch(()=>{;});
		(client.channels.cache.get(`864439897107857438`)).send({
            embed: {
                color: 16712451,
                thumbnail: {
                    url: "https://i.imgur.com/vUQ15WM.png"
                },
                author: {
                    name: "Nouvelle note !\n­",
                },
                description: `📚 Matière : ${desc}`,
                footer: {
                    text: `Fonctionnalité privée ┃ Envoyé par ${msg.author.username}`
                }
            }
        }).catch(()=>{;});
	}
};