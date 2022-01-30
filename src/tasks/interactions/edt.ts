import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
import { getAllData } from "../../firebase/firebase";
import { statsAddEdt } from "../../functions/efficom/stats";

const edt1Cooldown = new Set();
const edt2Cooldown = new Set();
const edt3Cooldown = new Set();

const edt = async (num: '1' | '2' | '3', interaction, client) => {
    const getCustomizedDate = () => {
        var date = new Date();
        if (date.getDay() == 6 || date.getDay() == 0) {
            let nb = (date.getDay() == 6 ? 8 : 1)
            date.setDate(date.getDate() + (((nb - date.getDay()))));
        }
        return date
    }

    await interaction.deferUpdate();
    if (num == '1') {
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

        let edt = await getAllData("edt")
        if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
            return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 1 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            if (!edt1Cooldown.has(interaction.user.id)) {
                edt1Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt1Cooldown.delete(interaction.user.id);
                }, 180000);
                try {
                    myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout);
                    pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                } catch {
                    pastille = '🟠';
                }
            } else {
                pastille = '🕐';
            }
            if (!edt[edtDate].desc) {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de cette semaine**`, files: [edt[edtDate].link] }).catch(() => { })
            } else {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de cette semaine**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { })
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  sent to ${interaction.user.username}`).catch(() => { })
        }
    } else if (num == '2') {
        statsAddEdt();
        var nextMonday = getCustomizedDate();
        nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()))));
        var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
        var edtDate = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;

        let edt = await getAllData("edt")
        if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
            return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 2 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            if (!edt2Cooldown.has(interaction.user.id)) {
                edt2Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt2Cooldown.delete(interaction.user.id);
                }, 180000);
                try {
                    myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout);
                    pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                } catch {
                    pastille = '🟠';
                }
            } else {
                pastille = '🕐';
            }
            if (!edt[edtDate].desc) {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de la semaine prochaine**`, files: [edt[edtDate].link] }).catch(() => { })
            } else {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps de la semaine prochaine**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { })
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 sent to ${interaction.user.username}`).catch(() => { })
        }
    } else if (num == '3') {
        statsAddEdt();
        var nextMonday = getCustomizedDate();
        nextMonday.setDate(nextMonday.getDate() + (((1 + 14 - nextMonday.getDay()))));
        var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
        var edtDate = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;

        let edt = await getAllData("edt")
        if (!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') {
            return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 3 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            if (!edt3Cooldown.has(interaction.user.id)) {
                edt3Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt3Cooldown.delete(interaction.user.id);
                }, 180000);
                try {
                    myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout);
                    pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                } catch {
                    pastille = '🟠';
                }
            } else {
                pastille = '🕐';
            }
            if (!edt[edtDate].desc) {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps dans deux semaines**`, files: [edt[edtDate].link] }).catch(() => { })
            } else {
                await interaction.user.send({ content: `🗓️ **__${datefinale}__ ${pastille} Voici l'emploi du temps dans deux semaines**\n**Détails:**\n${edt[edtDate].desc}`, files: [edt[edtDate].link] }).catch(() => { })
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 3 sent to ${interaction.user.username}`).catch(() => { })
        }
    }
}

export { edt }