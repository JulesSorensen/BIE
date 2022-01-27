import { MessageAttachment } from 'discord.js';
import { createData, getAllData, updateData } from '../../firebase/firebase';
import { DiscordMessage } from '../../interface/DiscordMessage';

// ajouter une stat pour un devoir
const statsAddDevoir = async (matiereArray: Array<any>) => {
    const stats: any = await getAllData('stats')
    matiereArray.map((matiereObj) => {
        let nb = 1;
        let matiere = matiereObj.matiere;
        if (stats.allStats.allDevoirs[`${matiere}`]) {
            nb = (stats.allStats.allDevoirs[`${matiere}`] + 1)
        }
        stats.allStats.allDevoirs[`${matiere}`] = nb;
    })
    console.log("update", stats.allStats.allDevoirs)
    await updateData('stats', 'allStats', { allDevoirs: stats.allStats.allDevoirs })
}

// ajouter une stat devoir
const statsAddDevoirAsked = async () => {
    const stats: any = await getAllData('stats')
    stats.allStats.devoir = stats.allStats.devoir + 1;
    await updateData('stats', 'allStats', { devoir: stats.allStats.devoir })
}
// ajouter une stat edt
const statsAddEdt = async () => {
    const stats: any = await getAllData('stats')
    stats.allStats.edt = stats.allStats.edt + 1;
    await updateData('stats', 'allStats', { edt: stats.allStats.edt })
}

// ajouter une stat remind
const statsAddRemind = async () => {
    const stats: any = await getAllData('stats')
    stats.allStats.remind = stats.allStats.remind + 1;
    await updateData('stats', 'allStats', { remind: stats.allStats.remind })
}

export { statsAddDevoir, statsAddDevoirAsked, statsAddEdt, statsAddRemind }