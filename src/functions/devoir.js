const { createData, deleteData, getAllData } = require('../firebase/firebase');

// ajouter un devoir
const devoirAdd = async (date, matiere, text) => {
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
    } else {
        devoir[date].matieres.push({
            matiere: matiere,
            devoir: text
        })
        await createData('devoir', date, devoir[date])
    }
}

// supprime un devoir
const devoirDelete = async (date, matiere) => {
    const devoir = await getAllData('devoir')
    if (!devoir[date]) return { error: true, message: 'Aucun devoir détecté pour cette date' };
    devoir[date].matieres = devoir[date].matieres.filter((el, index) => {
        if (el.matiere == matiere) {
            return false;
        } else return true;
    });
    if (devoir[date]?.matieres?.length > 0) {
        await createData('devoir', date, devoir[date])
    } else {
        await deleteData('devoir', date)
    }
    return { error: false };
}

const devoirAllDelete = async (date) => {
    const devoir = await getAllData('devoir')
    if (devoir[date]) {
        await deleteData('devoir', date)
    }
}

// affiche les alarmes de l'emploi du temps
const devoirShow = async (msg) => {
    const devoir = JSON.stringify(await getAllData("devoir"))
    let attachment = new AttachmentBuilder(Buffer.from(devoir, 'utf-8'), 'devoir.json');
    msg.channel.send({ content: `**LAST DEVOIR DATA FILE**`, files: [attachment] })
}

module.exports = { devoirAdd, devoirDelete, devoirAllDelete, devoirShow }