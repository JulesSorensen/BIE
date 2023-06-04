const { AttachmentBuilder } = require('discord.js');
const { createData, getAllData, updateData } = require('../firebase/firebase');

// ajouter une stat pour un devoir
const statsAddDevoir = async (matiereArray) => {
    const stats = await getAllData('stats');
    matiereArray.forEach((matiereObj) => {
        let nb = 1;
        let matiere = matiereObj.matiere;
        if (stats.allStats.allDevoirs[`${matiere}`]) {
            nb = (stats.allStats.allDevoirs[`${matiere}`] + 1)
        }
        stats.allStats.allDevoirs[`${matiere}`] = nb;
    })
    await updateData('stats', 'allStats', { allDevoirs: stats.allStats.allDevoirs })
}

// ajouter une stat devoir
const statsAddDevoirAsked = async () => {
    const stats = await getAllData('stats');
    stats.allStats.devoir = stats.allStats.devoir + 1;
    await updateData('stats', 'allStats', { devoir: stats.allStats.devoir });
}
// ajouter une stat edt
const statsAddEdt = async () => {
    const stats = await getAllData('stats');
    stats.allStats.edt = stats.allStats.edt + 1;
    await updateData('stats', 'allStats', { edt: stats.allStats.edt });
}

// ajouter une stat remind
const statsAddRemind = async () => {
    const stats = await getAllData('stats');
    stats.allStats.remind = stats.allStats.remind + 1;
    await updateData('stats', 'allStats', { remind: stats.allStats.remind });
}

module.exports = { statsAddDevoir, statsAddDevoirAsked, statsAddEdt, statsAddRemind }