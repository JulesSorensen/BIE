import { createData, updateData, getData, getAllData, deleteData } from '../../firebase/firebase';
import { edtAdd, edtReset, edtShow } from '../../functions/efficom/edt';

module.exports = {
    name: 'edt',
    guildOnly: true,
    async execute(msg, args, client, prefix, version) {
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString(); let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
        if (msg.guild.id != `762698485011054602` && msg.guild.id != `831823187213680682` && msg.guild.id != `783679631101526056`) return;

        const getCustomizedDate = () => {
            var date = new Date();
            if (date.getDay() == 6 || date.getDay() == 0) {
                date.setDate(date.getDate() + (((1 + 7 - date.getDay()))));
            }
            return date
        }

        if (!args[0]) {
            function getPreviousMonday() {
                var date = getCustomizedDate();
                var day = date.getDay();
                var prevMonday = new Date();
                if (date.getDay() == 0) {
                    prevMonday.setDate(date.getDate() - 6);
                } else {
                    prevMonday.setDate(date.getDate() - (day - 1));
                }
                return prevMonday;
            }
            var datesplit = (getPreviousMonday().toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;

            let edt = await getAllData("edt")
            if (!edt[datefinale]) {
                msg.react(searchIcon).catch(() => { ; });
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> \`${msg.channel.id}\`-\`${msg.id}\` attend l'EDT 1 ${searchIcon}...\n\`&edt send ${datefinale} ${msg.channel.id} ${msg.author.id}\``).catch(() => { ; });
            } else {
                if (!edt[datefinale].desc) {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**`, { files: [edt[datefinale].link] }).catch(() => { ; });
                } else {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**\n**Détails:**\n${edt[datefinale].desc}`, { files: [edt[datefinale].link] }).catch(() => { ; });
                }
                return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  sent to ${msg.author.username}`).catch(() => { ; });
            }
        } else if (args[0] == `2` || args[0].toLowerCase() == `suivant` || args[0].toLowerCase() == `s`) {
            var nextMonday = getCustomizedDate();
            nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()))));
            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;

            let edt = await getAllData("edt")
            if (!edt[datefinale]) {
                console.log("date", datefinale)
                msg.react(searchIcon).catch(() => { ; });
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> \`${msg.channel.id}\`-\`${msg.id}\` attend l'EDT 2 ${searchIcon}...\n\`&edt send ${datefinale} ${msg.channel.id} ${msg.author.id} 2\``).catch(() => { ; });
            } else {
                if (!edt[datefinale].desc) {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**`, { files: [edt[datefinale].link] }).catch(() => { ; });
                } else {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**\n**Détails:**\n${edt[datefinale].desc}`, { files: [edt[datefinale].link] }).catch(() => { ; });
                }
                return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 sent to ${msg.author.username}`).catch(() => { ; });
            }
        } else if (args[0] == `3` || args[0].toLowerCase() == `ss`) {
            var nextMonday = getCustomizedDate();
            nextMonday.setDate(nextMonday.getDate() + (((1 + 14 - nextMonday.getDay()))));
            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;

            let edt = await getAllData("edt")
            if (!edt[datefinale]) {
                msg.react(searchIcon).catch(() => { ; });
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> \`${msg.channel.id}\`-\`${msg.id}\` attend l'EDT 2 ${searchIcon}...\n\`&edt send ${datefinale} ${msg.channel.id} ${msg.author.id} 2\``).catch(() => { ; });
            } else {
                if (!edt[datefinale].desc) {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps dans deux semaines**`, { files: [edt[datefinale].link] }).catch(() => { ; });
                } else {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps dans deux semaines**\n**Détails:**\n${edt[datefinale].desc}`, { files: [edt[datefinale].link] }).catch(() => { ; });
                }
                return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 3 sent to ${msg.author.username}`).catch(() => { ; });
            }
        }
        if (msg.author.id == `676690539126718467`) {
            if (args[0]) {
                if (args[0].toLowerCase() == `add` || args[0].toLowerCase() == `a`) {
                    if (!args[2]) return msg.channel.send(`&edt add [!date] [!link] [?desc]`);
                    if (args[1].includes('/')) {
                        args[1] = args[1].replaceAll('/', '-')
                    }
                    var desc = (!args[3]) ? false : args.slice(3).join(' ');
                    return edtAdd(msg, args[1], args[2], desc, client);
                } else if (args[0].toLowerCase() == `reset` || args[0].toLowerCase() == `r`) {
                    return edtReset(msg, client)
                } else if (args[0].toLowerCase() == `show` || args[0].toLowerCase() == `sh`) {
                    return edtShow(msg, client)
                } else if (args[0].toLowerCase() == `send` || args[0].toLowerCase() == `se`) {
                    if (!args[3]) return msg.reply(`&edt send [!date] [!channelID] [!msgID] [?1/2/3]`);
                    var semaine = (!args[3]) ? "de cette semaine" : (args[3] == 2 ? "de la semaine prochaine" : "dans deux semaines")
                    let ch2 = client.channels.cache.get(args[2]);
                    let msg2 = ch2.messages.cache.get(args[3]);
                    let edt = await getAllData("edt")
                    if (edt[args[1]]) {
                        if (edt[args[1]].desc == false) {
                            try { msg2.reply(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps ${semaine}**`, { files: [edt[args[1]].link] }); msg2.reactions.cache.get('868852714690478090').remove() } catch (error) { () => { ; } }
                        } else {
                            try { msg2.reply(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps ${semaine}**\n**Détails:**\n${edt[args[1]].desc}`, { files: [edt[args[1]].link] }); msg2.reactions.cache.get('868852714690478090').remove(); } catch (error) { () => { ; } }
                        }
                        return msg.react(client.emojis.cache.get(`866581082551615489`).toString()).catch(() => { ; });
                    } else {
                        msg.reply('aucun edt pour cette date...')
                    }
                } else if (args[0].toLowerCase() == `sendmp` || args[0].toLowerCase() == `semp`) {
                    if (!args[2]) return msg.reply(`&edt sendmp [!date] [!userID] [?1/2/3]`).catch(() => { ; });
                    var semaine = (!args[3]) ? "de cette semaine" : (args[3] == 2 ? "de la semaine prochaine" : "dans deux semaines")
                    let edt = await getAllData("edt")
                    let userToSend = client.users.cache.get(args[2]);
                    if (edt[args[1]].desc == false) {
                        try { userToSend.send(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps ${semaine}**`, { files: [edt[args[1]].link] }).catch(() => { ; }); } catch (error) { () => { ; } }
                    } else {
                        try { userToSend.send(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps ${semaine}**\n**Détails:**\n${edt[args[1]].desc}`, { files: [edt[args[1]].link] }).catch(() => { ; }); } catch (error) { () => { ; } }
                    }
                    return msg.react(client.emojis.cache.get(`866581082551615489`).toString()).catch(() => { ; });
                }
                // else if (args[0].toLowerCase() == `rmd` || args[0].toLowerCase() == `remindme`) {
                //     if (!args[1]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                //     if (args[1] == `show`) {
                //         getca(`edtremindshow`, msg); return;
                //     } else if (args[1] == `reset`) {
                //         getca(`edtremindreset`, msg); return;
                //     }
                //     if (!args[2]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                //     let edtremind = getca(`edtremind`);
                //     args[2] = args[2].split(`,`);
                //     if (args[1] == `1` || args[1].toLowerCase() == `s1`) {
                //         var date = new Date();
                //         var day = date.getDay();
                //         var prevMonday = new Date();
                //         if (date.getDay() == 0) {
                //             prevMonday.setDate(date.getDate() - 6);
                //         } else {
                //             prevMonday.setDate(date.getDate() - (day - 1));
                //         }
                //         args[2].forEach((item, index) => {
                //             if (index > 0) { prevMonday.setDate(prevMonday.getDate() + 1); }
                //             var datesplit = (prevMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                //             datesplit.forEach((item, index) => {
                //                 if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
                //             });
                //             var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
                //             if (!item.includes(`?`)) {
                //                 getca(`edtremindadd`, msg, datefinale, item);
                //             }
                //         })
                //     } else if (args[1] == `2` || args[1].toLowerCase() == `s2`) {
                //         var nextMonday = new Date();
                //         nextMonday.setDate(nextMonday.getDate() + 1);
                //         nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
                //         args[2].forEach((item, index) => {
                //             if (index > 0) { nextMonday.setDate(nextMonday.getDate() + 1); }
                //             var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                //             datesplit.forEach((item, index) => {
                //                 if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
                //             });
                //             var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
                //             if (!item.includes(`?`)) {
                //                 getca(`edtremindadd`, msg, datefinale, item);
                //             }
                //         })
                //     } else return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                //     msg.channel.send(`Fait, \`&edt rmd show\` pour afficher le fichier`).catch(() => { ; });
                // } else if (args[0].toLowerCase() == `changement` || args[0].toLowerCase() == `chm`) {
                //     let msg: string;
                //     if (!args[1] || args[1] == `1`) {
                //         msg = `🗓️ Un changement a été effectué sur l'emploi du temps de cette semaine.`;
                //     } else {
                //         msg = `🗓️ Un changement a été effectué sur l'emploi du temps de la semaine prochaine.`;
                //     }
                //     (client.channels.cache.get(`868524232898908190`)).send(msg);
                // }
            }
        }
    }
};