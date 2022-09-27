const { getAllData } = require("../firebase/firebase");

const devstats = async (params) => {
    const { interaction, version } = params;

    await interaction.deferReply();
    const stats = (await getAllData('stats'));
    const devoir = stats.allStats.allDevoirs;
    let devoirNb = 0;
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
                text: `Version ${version}`
            }
        }]
    }).catch(() => { ; });
}

module.exports = { devstats }