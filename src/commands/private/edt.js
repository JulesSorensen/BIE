const { MessageAttachment } = require('discord.js');
const { edtAdd, edtShow, edtRemindAdd, edtRemindShow } = require("../../functions/edt");
const moment = require("moment");
const { statsAddEdt } = require('../../functions/stats');
const { getAllData, deleteData } = require('../../firebase/firebase');

const getCustomizedDate = (semaine = 0) => {
    const date = moment().add(semaine, "weeks");

    if (date.isoWeekday() >= 6) {
        date.add(1, 'weeks');
    }
    return date.isoWeekday(1);
}

const addEdt = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: false });

    const [date, link, desc] = [interaction?.options?.get("date")?.value, interaction?.options?.get("link")?.attachment?.url, interaction?.options?.get("description")?.value];

    if (link !== undefined) {
        if (moment(date, 'DD/MM/YYYY', true).isValid()) {
            await edtAdd(moment(date, 'DD/MM/YYYY').format("YYYY-MM-DD"), link, desc, client);
            return await interaction.editReply({
                content: `<:Check:866581082551615489> EDT **${date}** mis à jour`,
                files: [new MessageAttachment(link)]
            });
        } else {
            return await interaction.editReply({
                content: "<:Uncheck:866581082870513684> Date non valide !"
            });
        }
    } else {
        return await interaction.editReply({
            content: "<:Uncheck:866581082870513684> Url non valide !"
        });
    }
}

const showEdt = async (params) => {
    const { interaction } = params;

    await interaction.deferReply({ ephemeral: false });

    return await interaction.editReply(await edtShow());
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
        myges = await getAgendaCrypted({ start: date, end: moment(date, "YYYY-MM-DD").add(1, "weeks").format("YYYY-MM-DD") });
        pastille = (edt[edtDate].myges == myges ? '<:Check:866581082551615489>' : '<:Question:997270154490679348>');
    } catch {
        pastille = '<:Uncheck:866581082870513684>';
    }

    const semaine = number == 1 ? "de cette semaine" : (number == 2 ? "de la semaine prochaine" : "dans deux semaines");
    const edt = await getAllData("edt");
    const userToSend = client.users?.cache?.get(userId);
    if (edt[edtDate] && edt[edtDate].myges != "UNDEFINED") {
        if (edt[edtDate].desc == false) {
            await userToSend?.send({ content: `🗓️ **__${date}__ 🗓️\n${pastille} Voici l'emploi du temps ${semaine}**`, files: [new MessageAttachment(edt[edtDate].link)] }).catch(() => { ; });
        } else {
            await userToSend?.send({ content: `🗓️ **__${date}__ 🗓️\n${pastille} Voici l'emploi du temps ${semaine}**\n**Détails:**\n${edt[edtDate].desc.replace(/\\n/g, '\n')}`, files: [new MessageAttachment(edt[edtDate].link)] }).catch(() => { ; });
        }
        return await interaction.editReply({ content: `<:Check:866581082551615489> EDT envoyé à <@${userId}> avec succès` });
    } else {
        return await interaction.editReply({ content: `<:Uncheck:866581082870513684> Cet EDT du **${date}** n'existe pas` });
    }
}

const rmdEdt = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: false });

    const [semaine, horraires] = [interaction?.options?.get("semaine")?.value, interaction?.options?.get("horraire")?.value];

    let edtremind = await getAllData('edtremind')
    const horraire = horraires.split(`,`);
    let success = true;
    horraire.forEach((h, i) => {
        if (!(h.includes("?") || h.split("h").length == 2)) {
            success = false;
            interaction.editReply({ content: `<:Uncheck:866581082870513684> Erreur dans l'horraire du jour **${i + 1}** car \`${h}\` n'est pas correct` });
        }
    });

    if (!success) return;

    const date = getCustomizedDate(semaine - 1);
    await Promise.all(horraire.map(async (item, index) => {
        if (index != 0) date.add(1, "days");

        if (!item.includes(`?`)) {
            await edtRemindAdd(date.format("YYYY-MM-DD"), item);
        } else {
            if (edtremind[date.format("YYYY-MM-DD")]?.hour) {
                await deleteData('edtremind', date.format("YYYY-MM-DD"));
            }
        }
    }));

    return await interaction.editReply({
        content: `<:Check:866581082551615489> Horraires mise à jours avec succès`
    });
}

const rmdShowEdt = async (params) => {
    const { interaction } = params;

    await interaction.deferReply({ ephemeral: false });

    return await interaction.editReply(await edtRemindShow());
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
            content: `<:Check:866581082551615489> Prévenu avec succès de la semaine **n°${nb}**`
        });
    } catch (err) {
        await interaction.editReply({
            content: `<:Uncheck:866581082870513684> Erreur inconnue de la semaine **n°${nb}**`
        });
        throw err;
    }
}

module.exports = { addEdt, showEdt, sendmpEdt, rmdEdt, rmdShowEdt, chmEdt }