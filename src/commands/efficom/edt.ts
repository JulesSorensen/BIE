import moment from 'moment';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
import { createData, updateData, getData, getAllData, deleteData } from '../../firebase/firebase';
import { edtAdd, edtRemindAdd, edtRemindReset, edtRemindShow, edtReset, edtShow } from '../../functions/efficom/edt';
import { statsAddEdt } from '../../functions/efficom/stats';

const edt1Cooldown = new Set();
const edt2Cooldown = new Set();
const edt3Cooldown = new Set();

module.exports = {
    name: 'edt',
    guildOnly: true,
    async execute(msg, args, client, version) {
        let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
        if (msg.guild.id != `762698485011054602` && msg.guild.id != `831823187213680682` && msg.guild.id != `783679631101526056`) return;

        const getCustomizedDate = () => {
            var date = new Date();
            if (date.getDay() == 6 || date.getDay() == 0) {
                let nb = (date.getDay() == 6 ? 1 : -1)
                date.setDate(date.getDate() + (((nb + 7 - date.getDay()))));
            }
            return date
        }

        if (!args[0] || args[0] == `1`) {
            statsAddEdt();
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
            var edtDate = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;

            msg.react(searchIcon).catch(() => { ; });
            let edt = await getAllData("edt")
            if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> <#\`${msg.channel.id}\`> waits EDT 1 ${datefinale}`).catch(() => { ; });
            } else {
                if (!edt1Cooldown.has(msg.author.id)) {
                    edt1Cooldown.add(msg.author.id);
                    setTimeout(() => {
                        edt1Cooldown.delete(msg.author.id);
                    }, 300000);
                    const myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout)
                    const pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                    if (!edt[edtDate].desc) {
                        msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de cette semaine**`, files: [edt[edtDate].link] }).catch(() => { ; });
                    } else {
                        msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de cette semaine**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { ; });
                    }
                    msg.reactions.removeAll()
                    return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  sent to ${msg.author.username}`).catch(() => { ; });
                } else {
                    msg.reactions.removeAll()
                    return msg.reply({ content: `🗓️ **__${datefinale}__** 🟠\nVous avez déjà récupéré cet emploi du temps trop récemment, merci de réessayer plus tard` }).catch(() => { })
                }
            }
        } else if (args[0] == `2` || args[0].toLowerCase() == `suivant` || args[0].toLowerCase() == `s`) {
            statsAddEdt();
            var nextMonday = getCustomizedDate();
            nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()))));
            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
            var edtDate = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;

            msg.react(searchIcon).catch(() => { ; });
            let edt = await getAllData("edt")
            if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> <#\`${msg.channel.id}\`> waits EDT 2 ${datefinale}`).catch(() => { ; });
            } else {
                if (!edt2Cooldown.has(msg.author.id)) {
                    edt2Cooldown.add(msg.author.id);
                    setTimeout(() => {
                        edt2Cooldown.delete(msg.author.id);
                    }, 300000);
                    const myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout)
                    const pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                    if (!edt[edtDate].desc) {
                        await msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de la semaine prochaine**`, files: [edt[edtDate].link] }).catch(() => { ; });
                    } else {
                        await msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de la semaine prochaine**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { ; });
                    }
                    msg.reactions.removeAll()
                    return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 sent to ${msg.author.username}`).catch(() => { ; });
                } else {
                    msg.reactions.removeAll()
                    return msg.reply({ content: `🗓️ **__${datefinale}__** 🟠\nVous avez déjà récupéré cet emploi du temps trop récemment, merci de réessayer plus tard` }).catch(() => { })
                }
            }
        } else if (args[0] == `3` || args[0].toLowerCase() == `ss`) {
            statsAddEdt();
            var nextMonday = getCustomizedDate();
            nextMonday.setDate(nextMonday.getDate() + (((1 + 14 - nextMonday.getDay()))));
            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
            var edtDate = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;

            msg.react(searchIcon).catch(() => { ; });
            let edt = await getAllData("edt")
            if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> <#\`${msg.channel.id}\`> waits EDT 3 ${datefinale}`).catch(() => { ; });
            } else {
                if (!edt3Cooldown.has(msg.author.id)) {
                    edt3Cooldown.add(msg.author.id);
                    setTimeout(() => {
                        edt3Cooldown.delete(msg.author.id);
                    }, 300000);
                    const myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout)
                    const pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                    if (!edt[edtDate].desc) {
                        await msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps dans deux semaines**`, files: [edt[edtDate].link] }).catch(() => { ; });
                    } else {
                        await msg.reply({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps dans deux semaines**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { ; });
                    }
                    msg.reactions.removeAll()
                    return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 3 sent to ${msg.author.username}`).catch(() => { ; });
                } else {
                    msg.reactions.removeAll()
                    return msg.reply({ content: `🗓️ **__${datefinale}__** 🟠\nVous avez déjà récupéré cet emploi du temps trop récemment, merci de réessayer plus tard` }).catch(() => { })
                }
            }
        }
        if (msg.author.id == `676690539126718467`) {
            if (args[0]) {
                if (args[0].toLowerCase() == `add` || args[0].toLowerCase() == `a`) {
                    if (!args[1]) return msg.channel.send(`&edt add [!date] [!link] [?desc]`);
                    if (args[1].includes('/')) {
                        args[1] = args[1].replaceAll('/', '-')
                    }
                    let link;
                    let desc;
                    if (args[2] && args[2].startsWith("http")) {
                        link = JSON.parse(JSON.stringify(msg.embeds))[0]?.url
                        desc = (!args[3]) ? false : args.slice(3).join(' ');
                    } else {
                        link = JSON.parse(JSON.stringify(msg.attachments))[0]?.url
                        desc = (!args[2]) ? false : args.slice(2).join(' ');
                    }
                    if (link !== undefined) {
                        if (moment(args[1], 'DD-MM-YYYY', true).isValid()) {
                            return edtAdd(msg, args[1], link, desc, client)
                        } else {
                            return msg.channel.send({ content: 'Date non valide !' })
                        }
                    };
                } else if (args[0].toLowerCase() == `reset` || args[0].toLowerCase() == `r`) {
                    return edtReset(msg, client)
                } else if (args[0].toLowerCase() == `show` || args[0].toLowerCase() == `sh`) {
                    return edtShow(msg, client)
                } else if (args[0].toLowerCase() == `sendmp` || args[0].toLowerCase() == `semp`) {
                    if (!args[2]) return msg.reply(`&edt sendmp [!date] [!userID] [?1/2/3]`).catch(() => { ; });
                    statsAddEdt();
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
                else if (args[0].toLowerCase() == `rmd` || args[0].toLowerCase() == `remindme`) {
                    if (!args[1]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                    if (args[1] == `show`) {
                        return edtRemindShow(msg, client)
                    } else if (args[1] == `reset`) {
                        return edtRemindReset(msg, client)
                    }
                    if (!args[2]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                    let edtremind = await getAllData('edtremind')
                    args[2] = args[2].split(`,`);
                    if (args[1] == `1` || args[1].toLowerCase() == `s1`) {
                        var date = new Date();
                        var day = date.getDay();
                        var prevMonday = new Date();
                        if (date.getDay() == 0) {
                            prevMonday.setDate(date.getDate() - 6);
                        } else {
                            prevMonday.setDate(date.getDate() - (day - 1));
                        }
                        args[2].forEach((item, index) => {
                            if (index > 0) { prevMonday.setDate(prevMonday.getDate() + 1); }
                            var datesplit = (prevMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                            datesplit.forEach((dateItem, index) => {
                                if (index == 2) { datesplit[index] = `20${dateItem}`; } else if (dateItem.length == 1) { datesplit[index] = `0${dateItem}`; }
                            });
                            var datefinale = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
                            if (!item.includes(`?`)) {
                                edtRemindAdd(msg, datefinale, item, client);
                            } else {
                                if (edtremind[datefinale]?.hour) {
                                    deleteData('edtremind', datefinale)
                                }
                            }
                        })
                        const checkIcon = await client.emojis.cache.get(`866581082551615489`).toString()
                        msg.react(checkIcon).catch(() => { })
                    } else if (args[1] == `2` || args[1].toLowerCase() == `s2`) {
                        var nextMonday = new Date();
                        nextMonday.setDate(nextMonday.getDate() + 1);
                        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
                        args[2].forEach((item, index) => {
                            if (index > 0) { nextMonday.setDate(nextMonday.getDate() + 1); }
                            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                            datesplit.forEach((dateItem, index) => {
                                if (index == 2) { datesplit[index] = `20${dateItem}`; } else if (dateItem.length == 1) { datesplit[index] = `0${dateItem}`; }
                            });
                            var datefinale = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
                            if (!item.includes(`?`)) {
                                edtRemindAdd(msg, datefinale, item, client);
                            } else {
                                if (edtremind[datefinale]?.hour) {
                                    deleteData('edtremind', datefinale)
                                }
                            }
                        })
                        const checkIcon = await client.emojis.cache.get(`866581082551615489`).toString()
                        msg.react(checkIcon).catch(() => { })
                    } else return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(() => { ; });
                } else if (args[0].toLowerCase() == `changement` || args[0].toLowerCase() == `chm`) {
                    let msg: string;
                    if (!args[1] || args[1] == `1`) {
                        msg = `🗓️ Un changement a été effectué sur l'emploi du temps de cette semaine.`;
                    } else if (args[1] == `2`) {
                        msg = `🗓️ Un changement a été effectué sur l'emploi du temps de la semaine prochaine.`;
                    } else {
                        msg = `🗓️ Un changement a été effectué sur l'emploi du temps dans 2 semaines.`;
                    }
                    (client.channels.cache.get(`868524232898908190`)).send(msg);
                }
            }
        }
    }
};