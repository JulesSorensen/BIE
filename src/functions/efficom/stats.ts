import { MessageAttachment } from 'discord.js';
import { createData, getAllData } from '../../firebase/firebase';
import { DiscordMessage } from '../../interface/DiscordMessage';

// ajouter une stat devoir
const statsAddDevoir = async (matiere: string) => {
    const stats: any = await getAllData('stats')
    let nb = 1;
    if (stats.allStats.allDevoirs[matiere]) {
        nb = (stats.allStats.allDevoirs[matiere] + 1)
    }
    stats.allStats.devoir = stats.allStats.devoir + 1;
    stats.allStats.allDevoirs[matiere] = nb;
    await createData('stats', 'allStats', stats.allStats)
}

// ajouter une stat edt
const statsAddEdt = async () => {
    const stats: any = await getAllData('stats')
    stats.allStats.allDevoirs.edt = stats.allStats.allDevoirs.edt + 1;
    await createData('stats', 'allStats', stats.allStats)
}

// ajouter une stat remind
const statsAddRemind = async () => {
    const stats: any = await getAllData('stats')
    stats.allStats.allDevoirs.remind = stats.allStats.allDevoirs.remind + 1;
    await createData('stats', 'allStats', stats.allStats)
}

export { statsAddDevoir, statsAddEdt, statsAddRemind }