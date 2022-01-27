import { MessageActionRow, MessageButton } from 'discord.js';
import moment from 'moment';
import { getAllData } from "../../firebase/firebase";

const devstats = async (interaction, client, version) => {

    await interaction.deferReply();
    const stats: any = (await getAllData('stats'));
    const devoir: any = stats.allStats.allDevoirs;
    let devoirNb: any = 0;
    function sortObject(obj) {
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                devoirNb += obj[prop];
                arr.push({
                    'name': `${prop}`,
                    'value': `${obj[prop]}`,
                    inline: true
                });
            }
        }
        arr.sort(function (a, b) { return b.value - a.value; });
        return arr;
    }
    const matieresFields = sortObject(devoir);
    await interaction.editReply({
        embeds: [{
            color: 7844437,
            title: `📗 Statistiques des devoirs`,
            description: `Voici le nombre de total de devoirs en fonction de leurs matières par ordre croissant\nDevoirs effectués au total: ${devoirNb}\n­`,
            fields: matieresFields,
            timestamp: new Date(),
            footer: {
                icon_url: interaction.user.avatarURL(),
                text: `BIE V.${version} | Devoirs demandé par ${interaction.user.tag}`
            }
        }]
    }).catch(() => { ; });
}

export { devstats }