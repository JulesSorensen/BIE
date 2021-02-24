module.exports = {
    name: 'guild',
    description: 'Information about the arguments provided.',
    args: false,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        // getter
        let guildmessage = getca(`guildmessage`);
        let lang = getca(`language`);
        let userLang = lang[msg.author.id];
        // if guild is not in DB
        if (!guildmessage[msg.guild.id]) {
            if (userLang == `FR`) return msg.channel.send(`La guilde n'était pas encore enregistrée, veuillez retaper la commande <@${msg.author.id}>.`).catch(() => { ; });
            else if (userLang == `NO`) return msg.channel.send(`Lauget var ennå ikke registrert. Vennligst skriv inn kommandoen på nytt <@${msg.author.id}>.`).catch(() => { ; });
            else return msg.channel.send(`The guild was not yet registered, please retype the command again <@${msg.author.id}>.`).catch(() => { ; });
        }
        // message preparation
        if (userLang == `FR`) {
            var desc = `Voici la liste des personnes ayant envoyé le plus de messages sur ce serveur !`;
        } else if (userLang == `NO`) {
            var desc = `Her er listen over medlemmer som har sendt flest meldinger på denne serveren!`;
        } else {
            var desc = `Here is the list of members who have sent the most messages on this server!`;
        }
        // combine the arrays
        var list = [];
        for (var j = 0; j < (guildmessage[msg.guild.id].members).length; j++)
            list.push({ 'members': (guildmessage[msg.guild.id].members)[j], 'messages': (guildmessage[msg.guild.id].messages)[j] });

        // sort
        list.sort(function (a, b) {
            return ((a.messages > b.messages) ? -1 : ((a.messages == b.messages) ? 0 : 1));
        });

        // separate them back out
        for (var k = 0; k < list.length; k++) {
            if (k < 20) {
                if (k == 0) { var membersList = `🥇 ${list[k].messages} ➩ <@${list[k].members}>\n`; }
                else if (k == 1) { membersList += `🥈 ${list[k].messages} ➩ <@${list[k].members}>\n`; }
                else if (k == 2) { membersList += `🥉 ${list[k].messages} ➩ <@${list[k].members}>\n`; }
                else if (k > 0) { membersList += `\n­`; break; }
                else if (k == (list.length - 1)) { membersList += ` ­ ­ ­ ­ ­ ­ ­ ${list[k].messages} ➩ <@${list[k].members}>\n­`; }
                else { membersList += ` ­ ­ ­ ­ ­ ­ ­ ${list[k].messages} ➩ <@${list[k].members}>\n`; }
            } else break;
        }
        membersList += `­`;
        msg.channel.send({
            embed: {
                color: 14396152,
                author: {
                    name: `${msg.guild.name}`
                },
                thumbnail: { url: msg.guild.iconURL() },
                description: `${desc}\n\n${membersList}`,
                footer: {
                    text: `Glede V ${version}`
                }
            }
        }).catch(() => { ; });
    }
};