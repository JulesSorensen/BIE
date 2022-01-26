module.exports = {
    name: 'note',
    guildOnly: false,
    execute(msg, args, client, prefix, getca, version) {
        if (msg.guild.id != "762698485011054602" || msg.guild.id != "783679631101526056") return;
        var desc = (!args[0]) ? false : args.join(' ');
        if (!desc) return msg.reply(`vous devez précisez la matière après la commande`).catch(() => { ; });
        msg.delete({ timeout: 10 }).catch(() => { ; });
        (client.channels.cache.get(`762698661892849714`)).send({
            content: `<@&871298481233494027>`,
            embeds: [{
                color: 16712451,
                thumbnail: {
                    url: "https://i.imgur.com/vUQ15WM.png"
                },
                author: {
                    name: "Nouvelle note !\n­",
                },
                description: `📚 Matière : ${desc}`,
                footer: {
                    text: `Envoyé par ${msg.author.username}`
                }
            }]
        }).catch(() => { ; });
    }
};