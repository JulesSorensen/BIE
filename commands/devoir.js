const moment = require('moment');
module.exports = {
    name: 'devoir',
    guildOnly: false,
    execute(msg, args, client, prefix, getca, version) {
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString(); let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
        if (msg.guild.id != `831823187213680682` && msg.guild.id != `762698485011054602`) return;
        let devoir = getca(`devoir`);
        if (!args[0]) {
            var today = moment(new Date(), 'DD/MM/YYYY');
            var devoirs = [];
            for (const [key, value] of Object.entries(devoir)) {
                if (moment(key, 'DD/MM/YYYY') >= today) {
                    for (const [key2, value2] of Object.entries(value)) {
                        devoirs.push({ name: `${moment(key, 'DD/MM/YYYY').format('DD/MM/YYYY')} - ${key2.split(/(?=[A-Z])/).join(` `)}`, value: value2 });
                    }
                }
            }
            let isS = ''; let isS2 = 'le prochain devoir';
            if (devoirs.length < 1) {
                return msg.reply(`incroyable, il n'y a même pas de devoirs !`).catch(() => { ; });
            } else if (devoirs.length > 1) {
                isS = 's'; isS2 = 'la liste des prochains devoirs';
            }
            (client.channels.cache.get(`874251822045487125`)).send(`📔 Devoirs sent to ${msg.author.username}`).catch(() => { ; });
            return msg.lineReply({
                embed: {
                    color: 14261890,
                    title: `📔 Devoir${isS} à venir`,
                    description: `Voici ${isS2}, les anciens n'y apparaissent plus\n­`,
                    fields: devoirs,
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.author.avatarURL(),
                        text: `Devoirs demandé par ${msg.author.tag}`
                    }
                }
            }).catch(() => { ; });
        } else if (args[0].toLowerCase().startsWith(`s`)) {
            var matieresnb = {};
            var totalnb = 0;
            for (const [key, value] of Object.entries(devoir)) {
                for (const [key2, value2] of Object.entries(value)) {
                    if (!!matieresnb[key2.toString()]) {
                        matieresnb[((key2.toString()).split(/(?=[A-Z])/).join(` `))] += 1;
                    } else {
                        matieresnb[((key2.toString()).split(/(?=[A-Z])/).join(` `))] = 1;
                    }
                    totalnb += 1;
                }
            }
            const matieresnbSorted = Object.fromEntries(
                Object.entries(matieresnb).sort(([, a], [, b]) => b - a)
            );
            matieresnb = [];
            for (const [key, value] of Object.entries(matieresnbSorted)) {
                if (value == 1) matieresnb.push({ name: key, value: `${value} devoir effectué` });
                else matieresnb.push({ name: key, value: `${value} devoirs effectués` });

            }
            return msg.lineReply({
                embed: {
                    color: 16777215,
                    title: `📈 Statistiques des devoirs`,
                    description: `Voici le nombre de total de devoirs en fonction de leurs matières par ordre croissant\nDevoirs effectués au total: ${totalnb}\n­`,
                    fields: matieresnb,
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.author.avatarURL(),
                        text: `Statistiques demandé par ${msg.author.tag}`
                    }
                }
            }).catch(() => { ; });
        } else if (msg.author.id == `676690539126718467`) {
            if (args[0].toLowerCase() == `add` || args[0].toLowerCase() == `a`) {
                if (args.length < 4) return msg.reply(`\`&devoir add [date] [matiere] [text]\``).catch(() => { ; });
                if (!!args[4]) {
                    args[3] = args.slice(3).join(' ');
                }
                getca(`devoiradd`, msg, args[1], args[2], args[3]);
                return (client.channels.cache.get("762698661892849714")).send(`<@&893923446940123137> <a:bell:868901922483097661> Un nouveau devoir en **${args[2].split(/(?=[A-Z])/).join(` `)}** a été ajouté`)
            } else if (args[0].toLowerCase() == `show`) {
                return msg.channel.send("**LAST DEVOIR DATA FILE**", { files: ["data/devoir.json"] });
            } else if (args[0].toLowerCase() == `delete` || args[0].toLowerCase() == `del` || args[0].toLowerCase() == `remove`) {
                if (args.length < 3) return msg.reply(`\`&devoir delete [date] [matiere]\``).catch(() => { ; });
                return getca(`devoirdelete`, msg, args[1], args[2]);
            }
        }
    }
};