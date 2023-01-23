const { getAllData } = require("../firebase/firebase");
const { devoirAllDelete, devoirDelete, devoirAdd } = require('../functions/devoir');
const { statsAddDevoirAsked } = require("../functions/stats");
const { getCurrentDate } = require('../tasks/dates');
const moment = require("moment");

const devoir = async (params) => {
    const { interaction, client, type } = params;

    if (type == "BUTTON") {
        await interaction.deferUpdate();
    } else {
        await interaction.deferReply({ ephemeral: false });
    }

    const devoir = await getAllData('devoir');
    statsAddDevoirAsked();
    var devoirs = [];
    Object.keys(devoir).map((date) => {
        if (getCurrentDate(date, 'DD-MM-YYYY') > getCurrentDate().subtract(1, 'days')) {
            devoir[date].matieres.map((matiere) => {
                devoirs.push({ name: `${getCurrentDate(date, 'DD-MM-YYYY').format('DD/MM/YYYY')} - ${matiere.matiere}`, value: matiere.devoir })
            })
        } else {
            devoirAllDelete(date);
        }
    })
    devoirs = devoirs.sort(function (a, b) {
        const [startSplit, endSplit] = [a.name.split('/').join(" -").split(" -"), b.name.split('/').join(" -").split(" -")];
        const [start, end] = [
            moment(`${startSplit[0]}-${startSplit[1]}-${startSplit[2]}`, "DD-MM-YYYY"),
            moment(`${endSplit[0]}-${endSplit[1]}-${endSplit[2]}`, "DD-MM-YYYY")
        ];

        if (start.isBefore(end)) return -1;
        if (start.isAfter(end)) return 1;
        return 0;
    });

    let isS = ''; let isS2 = 'le prochain devoir';
    let devoirMessageContent;
    if (devoirs.length < 1) {
        devoirMessageContent = {
            embeds: [{
                color: 14261890,
                title: `📔 Devoirs à venir`,
                description: `Aucun devoir en vue !\n­`,
                fields: devoirs,
                timestamp: new Date()
            }]
        };
        if (type == "BUTTON") {
            return await interaction.user.send(devoirMessageContent).catch(() => { });
        } else {
            return await interaction.editReply(devoirMessageContent).catch(() => { });
        }
    } else {
        isS = 's'; isS2 = 'la liste des prochains devoirs';
    }
    devoirMessageContent = {
        embeds: [{
            color: 14261890,
            title: `📔 Devoir${isS} à venir`,
            description: `Voici ${isS2}, les anciens n'y apparaissent plus\n­`,
            fields: devoirs,
            timestamp: new Date()
        }]
    };

    if (type == "BUTTON") {
        return await interaction.user.send(devoirMessageContent).catch(() => { });
    } else {
        return await interaction.editReply(devoirMessageContent).catch(() => { });
    }
}

const addDevoir = async (params) => {
    const { interaction, client } = params;

    const [date, matiere, desc] = [interaction.options.get("date").value, interaction.options.get("matiere").value, interaction.options.get("description").value];

    await interaction.deferReply({ ephemeral: true });

    if (getCurrentDate(date, 'DD/MM/YYYY', true).isValid()) {
        (client.channels.cache.get("995994128234057779")).send(`<@${interaction.user.id}> (${interaction.user.id}) | Voudrait ajouter un devoir pour le \`${date}\` en ${matiere} \`${desc}\``)

        return await interaction.editReply({
            content: `<:check:866581082551615489> Votre devoir est en attente de validation par <@676690539126718467>, merci beaucoup !\nDate: \`${date}\`, matière: \`${matiere}\`, détails: \`${desc}\``
        }).catch(() => { });
    } else {
        return await interaction.editReply({
            content: `<:uncheck:866581082870513684> Impossible d'envoyer le devoir, le format de la date est incorrect. Merci de la mettre au format JJ/MM/AAAA.\nDate: \`${date}\`, matière: \`${matiere}\`, détails: \`${desc}\``
        }).catch(() => { });
    }
}

const forceAddDevoir = async (params) => {
    const { interaction, client } = params;

    const [date, matiere, desc, authorId] = [interaction.options.get("date").value, interaction.options.get("matiere").value.replace(/[A-Z&-]/g, ' $&').trim(), interaction.options.get("description").value, interaction.options.get("userid")?.value ?? interaction.user.id];

    await interaction.deferReply({ ephemeral: false });

    if (getCurrentDate(date, 'DD/MM/YYYY', true).isValid()) {
        const newDate = getCurrentDate(date, 'DD/MM/YYYY').format("DD-MM-YYYY");
        await devoirAdd(newDate, matiere, desc);
        await (client.channels.cache.get("762698661892849714")).send(`<@&996043232410599565> <a:bell:868901922483097661> Un nouveau devoir en **${matiere}** a été ajouté par <@${authorId}>`);
        return await interaction.editReply({
            content: `<:check:866581082551615489> Devoir ajouté avec succès\nDate: \`${newDate}\`, matière: \`${matiere}\`, détails: \`${desc}\`, envoyé par <@${authorId}>`
        }).catch(() => { });
    } else {
        return await interaction.editReply({
            content: `<:uncheck:866581082870513684> Impossible d'enregistrer le devoir, le format de la date est incorrect. Merci de la mettre au format JJ/MM/AAAA.\nDate: \`${newDate}\`, matière: \`${matiere}\`, détails: \`${desc}\``
        }).catch(() => { });
    }
}

const forceDeleteDevoir = async (params) => {
    const { interaction, client } = params;

    const [date, matiere] = [interaction.options.get("date").value, interaction.options.get("matiere").value.replace(/[A-Z]/g, ' $&').trim()];

    await interaction.deferReply({ ephemeral: false });

    if (getCurrentDate(date, 'DD/MM/YYYY', true).isValid()) {
        const newDate = getCurrentDate(date, 'DD/MM/YYYY').format("DD-MM-YYYY");
        const res = await devoirDelete(newDate, matiere, client);
        if (!res.error) {
            return await interaction.editReply({
                content: `<:check:866581082551615489> Devoir supprimé avec succès\nDate: \`${newDate}\`, matière: \`${matiere}\``
            }).catch(() => { });
        } else {
            return await interaction.editReply({
                content: `<:uncheck:866581082870513684> Une errur s'est produite: \`${res.message}\`\nDate: \`${newDate}\`, matière: \`${matiere}\``
            }).catch(() => { });
        }
    } else {
        return await interaction.editReply({
            content: `<:uncheck:866581082870513684> Impossible d'enregistrer le devoir, le format de la date est incorrect. Merci de la mettre au format JJ/MM/AAAA.\nDate: \`${newDate}\`, matière: \`${matiere}\`, détails: \`${desc}\``
        }).catch(() => { });
    }
}

module.exports = { devoir, addDevoir, forceAddDevoir, forceDeleteDevoir }