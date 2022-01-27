import moment from 'moment';
import { getAllData } from "../../firebase/firebase";
import { devoirAllDelete } from '../../functions/efficom/devoir';
import { statsAddDevoirAsked, statsAddEdt } from "../../functions/efficom/stats";

const devoir = async (interaction, client) => {

    await interaction.deferUpdate();
    const devoir = await getAllData('devoir');
    statsAddDevoirAsked();
    var devoirs = [];
    Object.keys(devoir).map((date: any) => {
        if (moment(date, 'DD-MM-YYYY') >= moment()) {
            devoir[date].matieres.map((matiere: any) => {
                devoirs.push({ name: `${moment(date, 'DD-MM-YYYY').format('DD/MM/YYYY')} - ${matiere.matiere.split(/(?=[A-Z])/).join(` `)}`, value: matiere.devoir })
            })
        } else {
            devoirAllDelete(date);
        }
    })
    devoirs = devoirs.sort(function (a, b) {
        const [startSplit, endSplit] = [a.name.split('/'), b.name.split('/')];
        const [start, end] = [`${startSplit[2]}-${startSplit[1]}-${startSplit[0]}`, `${endSplit[2]}-${endSplit[1]}-${endSplit[0]}`];
        // @ts-ignore
        return new Date(start) - new Date(end);
    });
    let isS = ''; let isS2 = 'le prochain devoir';
    if (devoirs.length < 1) {
        await interaction.user.send(`Il n'y a pas de devoirs !`).catch(() => { ; });
    } else {
        isS = 's'; isS2 = 'la liste des prochains devoirs';
    }
    (client.channels.cache.get(`874251822045487125`)).send(`📔 Devoirs sent to ${interaction.user.username}`).catch(() => { ; });
    await interaction.user.send({
        embeds: [{
            color: 14261890,
            title: `📔 Devoir${isS} à venir`,
            description: `Voici ${isS2}, les anciens n'y apparaissent plus\n­`,
            fields: devoirs,
            timestamp: new Date()
        }]
    }).catch((e) => { });
}

export { devoir }