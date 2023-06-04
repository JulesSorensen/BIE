const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getAgendaCrypted } = require("../api/mgapi");
const { getAllData } = require("../firebase/firebase");
const { statsAddEdt } = require("../functions/stats");
const { isUserInDelay, addUserDelay } = require('../functions/delay');
const { getCurrentDate } = require('../tasks/dates');

const sendEdtAlert = async (id, client) => {
    client.channels.cache.get("995994128234057779").send({
        content: `<@${id}> (${id}) | Reception d'un emploi du temps éronné`
    }).catch(() => { });
}

const edt = async (params) => {
    const { num, interaction, type, client } = params;
    const getCustomizedDate = (semaine = 0) => {
        const date = getCurrentDate().add(semaine, "weeks");

        if (date.isoWeekday() >= 6) date.add(1, 'weeks');
        return date.isoWeekday(1);
    }

    if (type == "BUTTON") {
        await interaction.deferUpdate();
    } else {
        await interaction.deferReply({ ephemeral: false });
    }

    if (num == '1') {
        statsAddEdt();
        const date = getCustomizedDate();
        const datefinale = date.format("DD/MM/YYYY");
        const edtDate = date.format("YYYY-MM-DD");

        const edt = await getAllData("edt")
        if ((!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') && type == "BUTTON") {
            return (client.channels.cache.get("995994128234057779")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 1 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            const isInDelay = await isUserInDelay(interaction.user.id, "edt1");
            if (!isInDelay) {
                addUserDelay(interaction.user.id, "edt1");
                try {
                    myges = await getAgendaCrypted({ start: getCurrentDate(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: getCurrentDate(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("EDTCHM1").setEmoji("◀️").setLabel("Précédent").setStyle(ButtonStyle.Danger).setDisabled(true),
                new ButtonBuilder().setCustomId("DETAILS1").setEmoji("🪪").setLabel("Détails").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("EDTCHM2").setEmoji("▶️").setLabel("Suivant").setStyle(ButtonStyle.Success)
            );

            const edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Semaine actuelle)**` };
            const file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                return await interaction.user.send(edtMessageContent);
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent);
                return (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
        }
    } else if (num == '2') {
        statsAddEdt();
        const date = getCustomizedDate(1);
        const datefinale = date.format("DD/MM/YYYY");
        const edtDate = date.format("YYYY-MM-DD");

        const edt = await getAllData("edt")
        if ((!edt[edtDate] || edt[edtDate].myges == 'UNDEFINED') && type == "BUTTON") {
            return (client.channels.cache.get("995994128234057779")).send(`<@676690539126718467> | <@${interaction.user.id}> waits EDT 2 ${datefinale}\n\`&edt sendmp ${datefinale} ${interaction.user.id} 1\``).catch(() => { })
        } else {
            let pastille;
            let myges;
            const isInDelay = await isUserInDelay(interaction.user.id, "edt2");
            if (!isInDelay) {
                addUserDelay(interaction.user.id, "edt2");
                try {
                    myges = await getAgendaCrypted({ start: getCurrentDate(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: getCurrentDate(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("EDTCHM1").setEmoji("◀️").setLabel("Précédent").setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId("DETAILS2").setEmoji("🪪").setLabel("Détails").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("EDTCHM3").setEmoji("▶️").setLabel("Suivant").setStyle(ButtonStyle.Success)
            );

            const edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Semaine prochaine)**` };
            const file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                return await interaction.user.send(edtMessageContent);
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent);
                return (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
        }
    } else if (num == '3') {
        statsAddEdt();
        const date = getCustomizedDate(2);
        const datefinale = date.format("DD/MM/YYYY");
        const edtDate = date.format("YYYY-MM-DD");

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
                    myges = await getAgendaCrypted({ start: getCurrentDate(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: getCurrentDate(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:uncheck:866581082870513684>');
                    if (pastille == "<:uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:question:997270154490679348>';
                }
            } else {
                pastille = '<:wait:997268180911280158>';
            }

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("EDTCHM2").setEmoji("◀️").setLabel("Précédent").setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId("DETAILS3").setEmoji("🪪").setLabel("Détails").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("EDTCHM").setEmoji("▶️").setLabel("Suivant").setStyle(ButtonStyle.Danger).setDisabled(true)
            );
            const edtMessageContent = { content: `🗓️ **__${datefinale}__ ${pastille} (Dans deux semaines)**` };
            const file = edt[edtDate]?.link;
            if (file) {
                edtMessageContent["files"] = [file];
            } else {
                edtMessageContent["files"] = ["https://i.imgur.com/ZACLa60.png"];
            }

            if (type == "BUTTON") {
                return await interaction.user.send(edtMessageContent);
            } else {
                edtMessageContent["components"] = [row];
                await interaction.editReply(edtMessageContent);
                return (await interaction.fetchReply()).react("1022118516129792000").catch(() => { });
            }
        }
    }
}

module.exports = { edt }