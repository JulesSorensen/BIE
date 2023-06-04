const { AttachmentBuilder } = require('discord.js');
const { edtAdd } = require("../../functions/edt");
const { statsAddEdt } = require('../../functions/stats');
const { getAllData } = require('../../firebase/firebase');
const { getCurrentDate } = require('../../tasks/dates');

const getCustomizedDate = (semaine = 0) => {
    const date = getCurrentDate().add(semaine, "weeks");

    if (date.isoWeekday() >= 6) date.add(1, 'weeks');
    return date.isoWeekday(1);
}

const addEdt = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: false });

    const [date, link] = [interaction?.options?.get("date")?.value, interaction?.options?.get("link")?.attachment?.url];

    if (link !== undefined) {
        if (getCurrentDate(date, 'DD/MM/YYYY', true).isValid()) {
            await edtAdd(getCurrentDate(date, 'DD/MM/YYYY').format("YYYY-MM-DD"), link, client);
            return await interaction.editReply({
                content: `<:check:866581082551615489> EDT **${date}** mis à jour`,
                files: [new AttachmentBuilder(link)]
            });
        } else {
            return await interaction.editReply({
                content: "<:uncheck:866581082870513684> Date non valide !"
            });
        }
    } else {
        return await interaction.editReply({
            content: "<:uncheck:866581082870513684> Url non valide !"
        });
    }
}

const sendmpEdt = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: false });

    const [userId, number] = [interaction?.options?.get("userid")?.value, interaction?.options?.get("semaine")?.value];

    statsAddEdt();
    const edtDate = getCustomizedDate(number - 1).format("YYYY-MM-DD");
    const date = getCustomizedDate(number - 1).format("DD/MM/YYYY");
    let pastille;
    try {
        myges = await getAgendaCrypted({ start: date, end: getCurrentDate(date, "YYYY-MM-DD").add(1, "weeks").format("YYYY-MM-DD") });
        pastille = (edt[edtDate].myges == myges ? '<:check:866581082551615489>' : '<:question:997270154490679348>');
    } catch {
        pastille = '<:uncheck:866581082870513684>';
    }

    const semaine = number == 1 ? "(Semaine actuelle)" : (number == 2 ? "(Semaine prochaine)" : "(Dans deux semaines)");
    const edt = await getAllData("edt");
    const userToSend = client.users?.cache?.get(userId);
    if (edt[edtDate] && edt[edtDate].myges != "UNDEFINED") {
        await userToSend?.send({ content: `🗓️ **__${date}__ 🗓️${pastille} ${semaine}**`, files: [new AttachmentBuilder(edt[edtDate].link)]}).catch(() => { ; });
        return await interaction.editReply({ content: `<:check:866581082551615489> EDT envoyé à <@${userId}> avec succès` });
    } else {
        return await interaction.editReply({ content: `<:uncheck:866581082870513684> Cet EDT du **${date}** n'existe pas` });
    }
}

const chmEdt = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: false });

    const nb = interaction.options.get("semaine").value;

    let msg;
    if (nb == `1`) {
        msg = { content: `🗓️ Un changement a été effectué sur l'emploi du temps de cette semaine.` };
    } else if (nb == `2`) {
        msg = { content: `🗓️ Un changement a été effectué sur l'emploi du temps de la semaine prochaine.` };
    } else if (nb == `3`) {
        msg = { content: `🗓️ Un changement a été effectué sur l'emploi du temps dans 2 semaines.` };
    }
    try {
        await (client.channels.cache.get(`762698661892849714`)).send(msg);
        return await interaction.editReply({
            content: `<:check:866581082551615489> Prévenu avec succès de la semaine **n°${nb}**`
        });
    } catch (err) {
        await interaction.editReply({
            content: `<:uncheck:866581082870513684> Erreur inconnue de la semaine **n°${nb}**`
        });
        throw err;
    }
}

module.exports = { addEdt, sendmpEdt, chmEdt }