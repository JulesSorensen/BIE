import { MessageAttachment } from 'discord.js';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
import { createData, getAllData } from '../../firebase/firebase';

// reset la bdd pour l'emploi du temps
const edtReset = async (msg: any, client: any) => {
    const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
    const uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString()
    let edt = await getAllData("edt")
    edt = {};
}

// ajout de l'emploi du temps de la semaine spécifique
const edtAdd = async (msg: any, date: string, link: string, desc: string, client: any) => {
    const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
    const uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString()
    const edtMyges = btoa((await exec('myges agenda 24-01-2022')).stdout)
    let newEdt = { link: link, desc: desc, myges: edtMyges };
    createData("edt", date, newEdt).then(() => {
        msg.react(checkIcon).catch(() => { ; });
        (client.channels.cache.get(`874251822045487125`)).send(`➕ EDT ${date} ajouté`).catch(() => { ; });
    }).catch(() => {})
}

// affiche les donnés de l'emploi du temps
const edtShow = async (msg: any, client: any) => {
    const edt = JSON.stringify(await getAllData("edt"))
    let attachment = new MessageAttachment(Buffer.from(edt, 'utf-8'), 'edt.json');
    msg.channel.send({content: `all datas`, files: [attachment]})
}

// // ajouter une alarme pour l'emploi du temps
// const edtRemindAdd = async (msg: any, date: string, heure: string, client: any) => {
//     const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
//     const uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString()
//     edtremind[date] = heure;
// }

// // affiche les alarmes de l'emploi du temps
// const edtRemindShow = async (msg: any, client: any) => {
//     msg.channel.send("**LAST EDT-REMIND DATA FILE**", { files: ["data/edtremind.json"] });
// }

// // reset les alarmes de l'emploi du temps
// const edtRemindReset = async (msg: any, client: any) => {
//     const checkIcon = client.emojis.cache.get(`866581082551615489`).toString()
//     const uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString()
//     edtremind = {};
// }

export { edtAdd, edtReset, edtShow }