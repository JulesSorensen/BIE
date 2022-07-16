const { MessageAttachment } = require('discord.js');
const { getAgendaCrypted } = require('../api/mgapi');
const { createData, getAllData } = require('../firebase/firebase');
const moment = require('moment');

// ajout de l'emploi du temps de la semaine spécifique
const edtAdd = async (date, link, desc, client) => {
    const edtMyges =  await getAgendaCrypted({ start: moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"), end: moment(date, "DD-MM-YYYY").add(7, "days").format("YYYY-MM-DD") });
    let newEdt = { link: link, desc: desc, myges: edtMyges };
    createData("edt", moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"), newEdt).then(() => {
        (client.channels.cache.get(`874251822045487125`)).send(`➕ EDT ${date} ajouté`).catch(() => { ; });
    }).catch(() => { })
}

// Retourne les donnés de l'emploi du temps
const edtShow = async () => {
    const edt = JSON.stringify(await getAllData("edt"));
    let attachment = new MessageAttachment(Buffer.from(edt, 'utf-8'), 'edt.json');
    return { content: `**LAST EDT DATA FILE**`, files: [attachment] };
}

// ajouter une alarme pour l'emploi du temps
const edtRemindAdd = async (date, heure) => {
    await createData('edtremind', date, { hour: heure });
}

// affiche les alarmes de l'emploi du temps
const edtRemindShow = async () => {
    const edtremind = JSON.stringify(await getAllData("edtremind"))
    let attachment = new MessageAttachment(Buffer.from(edtremind, 'utf-8'), 'edtremind.json');
    return { content: `**LAST RMD DATA FILE**`, files: [attachment] };
}

module.exports = { edtAdd, edtShow, edtRemindAdd, edtRemindShow }