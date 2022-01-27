module.exports = {
    name: 'teams',
    guildOnly: false,
    execute(msg, args, client, version) {
        if (msg.guild.id != "762698485011054602") return;
        if (!args[0]) return msg.channel.send(`Voici comment utiliser la commande: \`&teams [Lien] [HeureDuDébut] [HeureDeFin] [NomDuCours]\``).catch(()=>{;});
        msg.delete({ timeout: 10 }).catch(()=>{;});
        let efficomsalon = client.channels.cache.get("762698661892849714").catch(()=>{;});
        var link = args[0];
        var heured = (!args[1]) ? (`Non spécifié`) : args[1];
        var heuref = (!args[2]) ? (`Non spécifié`) : args[2];
        var nomducours = (!args[3]) ? (``) : (`📚 Cours : ${args.slice(3).join(' ')}\n­`);
        efficomsalon.send({content: "<@&875369959503581244>",
            embeds: [{
                color: 4673464,
                thumbnail: {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                },
                author: {
                    name: "Nouvelle réunion !\n­",
                },
                title: "⮞ Rejoindre ⮜",
                url: link,
                description: nomducours,
                fields: [{
                    name: "⏰ ­  Début  ­  ⏰",
                    value: heured,
                    inline: true
                }, {
                    name: "🕛  ­  Fin  ­  🕛",
                    value: heuref + "\n­",
                    inline: true
                }],
                footer: {
                    text: `Envoyé par ${msg.author.username}`
                }
            }]
        }).catch(()=>{;});
    }
};