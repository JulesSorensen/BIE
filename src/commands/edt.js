const { MessageActionRow, MessageButton } = require('discord.js');
const { getAgendaCrypted } = require("../api/mgapi");
const { getAllData } = require("../firebase/firebase");
const { statsAddEdt } = require("../functions/stats");
const moment = require("moment");
const { isUserInDelay, addUserDelay } = require('../functions/delay');

const sendEdtAlert = async (id, client) => {
    client.channels.cache.get("995994128234057779").send({
        content: `<@${id}> (${id}) | Reception d'un emploi du temps éronné`
    }).catch(() => { });
}

const edt = async (params) => {
    const { num, interaction, type, client } = params;
    const getCustomizedDate = (semaine = 0) => {
        const date = moment().add(semaine, "weeks");

        if (date.isoWeekday() >= 6) {
            date.add(1, 'weeks');
        }
        return date.isoWeekday(1);
    }

    if (type == "BUTTON") {
        await interaction.deferUpdate();
    } else {
        await interaction.deferReply({ ephemeral: false });
    }

    if (num == '1') {
        statsAddEdt();
        var date = getCustomizedDate();
        var datefinale = date.format("DD/MM/YYYY");
        var edtDate = date.format("YYYY-MM-DD");

        let edt = await getAllData("edt")
        if ((!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') && type == "BUTTON") {
            return (client.channels.cache.get("995994128234057779")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 1 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            const isInDelay = await isUserInDelay(interaction.user.id, "edt1");
            if (!isInDelay) {
                addUserDelay(interaction.user.id, "edt1");
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId("EDTCHM").setEmoji("◀️").setLabel("Précédent").setStyle('PRIMARY').setDisabled(true),
                new MessageButton().setCustomId("DETAILS1").setEmoji("🪪").setLabel("Détails").setStyle('SECONDARY'),
                new MessageButton().setCustomId("EDTCHM2").setEmoji("▶️").setLabel("Suivant").setStyle('PRIMARY')
            );
            let edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Semaine actuelle)**` };
            let file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent).catch(() => { });
                (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  sent to ${interaction.user.username}`).catch(() => { })
        }
    } else if (num == '2') {
        statsAddEdt();
        var date = getCustomizedDate(1);
        var datefinale = date.format("DD/MM/YYYY");
        var edtDate = date.format("YYYY-MM-DD");

        let edt = await getAllData("edt")
        if ((!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') && type == "BUTTON") {
            return (client.channels.cache.get("995994128234057779")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 2 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            const isInDelay = await isUserInDelay(interaction.user.id, "edt2");
            if (!isInDelay) {
                addUserDelay(interaction.user.id, "edt2");
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId("EDTCHM1").setEmoji("◀️").setLabel("Précédent").setStyle('PRIMARY'),
                new MessageButton().setCustomId("DETAILS2").setEmoji("🪪").setLabel("Détails").setStyle('SECONDARY'),
                new MessageButton().setCustomId("EDTCHM3").setEmoji("▶️").setLabel("Suivant").setStyle('PRIMARY')
            );

            let edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Semaine prochaine)**` };
            let file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent).catch(() => { });
                (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 sent to ${interaction.user.username}`).catch(() => { })
        }
    } else if (num == '3') {
        statsAddEdt();
        var date = getCustomizedDate(2);
        var datefinale = date.format("DD/MM/YYYY");
        var edtDate = date.format("YYYY-MM-DD");

        let edt = await getAllData("edt")
        if ((!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') && type == "BUTTON") {
            return (client.channels.cache.get("995994128234057779")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 3 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            const isInDelay = await isUserInDelay(interaction.user.id, "edt3");
            if (!isInDelay) {
                addUserDelay(interaction.user.id, "edt3");
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId("EDTCHM2").setEmoji("◀️").setLabel("Précédent").setStyle('PRIMARY'),
                new MessageButton().setCustomId("DETAILS3").setEmoji("🪪").setLabel("Détails").setStyle('SECONDARY'),
                new MessageButton().setCustomId("EDTCHM").setEmoji("▶️").setLabel("Suivant").setStyle('PRIMARY').setDisabled(true)
            );
            let edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Dans deux semaines)**` };
            let file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent).catch(() => { });
                (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 3 sent to ${interaction.user.username}`).catch(() => { })
        }
    }
}

module.exports = { edt }