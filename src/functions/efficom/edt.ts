import { MessageAttachment } from 'discord.js';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
import { createData, getAllData } from '../../firebase/firebase';

// reset la bdd pour l'emploi du temps
const edtReset = async (msg: any, client: any) => {
    const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
    let edt = await getAllData("edt")
}

// ajout de l'emploi du temps de la semaine spécifique
const edtAdd = async (msg: any, date: string, link: string, desc: (boolean | string), client: any) => {
    const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
    const edtMyges = btoa((await exec(`myges agenda ${date}`)).stdout)
    let newEdt = { link: link, desc: desc, myges: edtMyges };
    createData("edt", date, newEdt).then(() => {
        msg.react(checkIcon).catch(() => { ; });
        (client.channels.cache.get(`874251822045487125`)).send(`➕ EDT ${date} ajouté`).catch(() => { ; });
    }).catch(() => { })
}

// affiche les donnés de l'emploi du temps
const edtShow = async (msg: any, client: any) => {
    const edt = JSON.stringify(await getAllData("edt"))
    let attachment = new MessageAttachment(Buffer.from(edt, 'utf-8'), 'edt.json');
    msg.channel.send({ content: `**LAST EDT DATA FILE**`, files: [attachment] })
}

// ajouter une alarme pour l'emploi du temps
const edtRemindAdd = async (msg: any, date: string, heure: string, client: any) => {
    createData('edtremind', date, { hour: heure })
}

// affiche les alarmes de l'emploi du temps
const edtRemindShow = async (msg: any, client: any) => {
    const edtremind = JSON.stringify(await getAllData("edtremind"))
    let attachment = new MessageAttachment(Buffer.from(edtremind, 'utf-8'), 'edtremind.json');
    msg.channel.send({ content: `**LAST EDT-REMIND DATA FILE**`, files: [attachment] })
}

// reset les alarmes de l'emploi du temps
const edtRemindReset = async (msg: any, client: any) => {
    const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
    const edtremind = await getAllData("edtremind")
}

export { edtAdd, edtReset, edtShow, edtRemindAdd, edtRemindShow, edtRemindReset }