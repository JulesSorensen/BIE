import { MessageAttachment } from 'discord.js';
import { createData, deleteData, getAllData } from '../../firebase/firebase';
import { DiscordMessage } from '../../interface/DiscordMessage';

// ajouter un devoir
const devoirAdd = async (msg: any, date: string, matiere: string, text: string, client: any) => {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    const devoir = await getAllData('devoir')
    if (!devoir[date]) {
        await createData('devoir', date, {
            matieres: [
                {
                    matiere: matiere,
                    devoir: text
                }
            ]
        })
        msg.react(checkIcon);
    } else {
        devoir[date].matieres.push({
            matiere: matiere,
            devoir: text
        })
        await createData('devoir', date, devoir[date])
    }
}

// supprime un devoir
const devoirDelete = async (msg: any, date: string, matiere: string, client: any) => {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    const devoir = await getAllData('devoir')
    if (!devoir[date]) return msg.reply(`Aucun devoir détecté pour cette date`);
    let trouve: any = false
    devoir[date].matieres.forEach((el: any, index: number) => {
        if (el.matiere == matiere) trouve = index;
    });
    if (!trouve) return msg.reply(`Matière non trouvé sur cette date`);
    devoir[date].matieres.splice(trouve, 1);
    if (devoir[date].length > 0) {
        await createData('devoir', date, devoir[date])
    } else {
        await deleteData('devoir', date)
    }
    msg.react(checkIcon);
}

const devoirAllDelete = async (date: string) => {
    const devoir = await getAllData('devoir')
    if (devoir[date]) {
        await deleteData('devoir', date)
    }
}

// affiche les alarmes de l'emploi du temps
const devoirShow = async (msg: any) => {
    const devoir = JSON.stringify(await getAllData("devoir"))
    let attachment = new MessageAttachment(Buffer.from(devoir, 'utf-8'), 'devoir.json');
    msg.channel.send({ content: `**LAST DEVOIR DATA FILE**`, files: [attachment] })
}

export { devoirAdd, devoirDelete, devoirAllDelete, devoirShow }