const { getAgendaCrypted } = require("../api/mgapi");
const { getAllData } = require("../firebase/firebase");
const { statsAddEdt } = require("../functions/stats");
const moment = require("moment");

const sendEdtAlert = async (id, client) => {
    client.channels.cache.get("995994128234057779").send({
        content: `<@${id}> (${id}) | Reception d'un emploi du temps éronné`
    }).catch(() => { });
}

const edt1Cooldown = new Set();
const edt2Cooldown = new Set();
const edt3Cooldown = new Set();

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
            if (!edt1Cooldown.has(interaction.user.id)) {
                edt1Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt1Cooldown.delete(interaction.user.id);
                }, 120000);
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:Check:866581082551615489>' : '<:Uncheck:866581082870513684>');
                    if (pastille == "<:Uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:Question:997270154490679348>';
                }
            } else {
                pastille = '<:Wait:997268180911280158>';
            }
            let edtMessageContent;
            if (!edt[edtDate].desc) {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps de cette semaine**`, files: [edt[edtDate].link] };
            } else {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps de cette semaine**\n**Détails:**\n${edt[edtDate].desc.replace(/\\n/g, '\n')}`, files: [edt[edtDate].link] };
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                await interaction.editReply(edtMessageContent).catch(() => { });
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
            if (!edt2Cooldown.has(interaction.user.id)) {
                edt2Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt2Cooldown.delete(interaction.user.id);
                }, 120000);
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:Check:866581082551615489>' : '<:Uncheck:866581082870513684>');
                    if (pastille == "<:Uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:Question:997270154490679348>';
                }
            } else {
                pastille = '<:Wait:997268180911280158>';
            }

            let edtMessageContent;
            if (!edt[edtDate].desc) {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps de la semaine prochaine**`, files: [edt[edtDate].link] };
            } else {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps de la semaine prochaine**\n**Détails:**\n${edt[edtDate].desc.replace(/\\n/g, '\n')}`, files: [edt[edtDate].link] };
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                await interaction.editReply(edtMessageContent).catch(() => { });
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
            if (!edt3Cooldown.has(interaction.user.id)) {
                edt3Cooldown.add(interaction.user.id);
                setTimeout(() => {
                    edt3Cooldown.delete(interaction.user.id);
                }, 120000);
                try {
                    myges = await getAgendaCrypted({ start: moment(datefinale, "DD/MM/YYYY").format("YYYY-MM-DD"), end: moment(datefinale, "DD/MM/YYYY").add(7, "days").format("YYYY-MM-DD") });
                    pastille = (edt[edtDate].myges == myges ? '<:Check:866581082551615489>' : '<:Uncheck:866581082870513684>');
                    if (pastille == "<:Uncheck:866581082870513684>") sendEdtAlert(interaction.user.id, client);
                } catch {
                    pastille = '<:Question:997270154490679348>';
                }
            } else {
                pastille = '<:Wait:997268180911280158>';
            }

            let edtMessageContent;
            if (!edt[edtDate].desc) {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps dans deux semaines**`, files: [edt[edtDate].link] };
            } else {
                edtMessageContent = { content: `🗓️ **__${datefinale}__ 🗓️\n${pastille} Voici l'emploi du temps dans deux semaines**\n**Détails:**\n${edt[edtDate].desc.replace(/\\n/g, '\n')}`, files: [edt[edtDate].link] };
            }

            if (type == "BUTTON") {
                await interaction.user.send(edtMessageContent).catch(() => { });
            } else {
                await interaction.editReply(edtMessageContent).catch(() => { });
            }
            return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 3 sent to ${interaction.user.username}`).catch(() => { })
        }
    }
}

module.exports = { edt }