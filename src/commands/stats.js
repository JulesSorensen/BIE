const { getAllData } = require("../firebase/firebase");

const stats = async (params) => {
    const { interaction, client, type, version } = params;

    if (type == "BUTTON") {
        await interaction.deferUpdate();
    } else {
        await interaction.deferReply({ ephemeral: false });
    }

    const stats = (await getAllData('stats')).allStats;

    const statsContent = {
        embeds: [{
            color: 16777215,
            title: `📈 Statistiques du robot`,
            description: `Voici le nombre d'utilisation des fonctionnalités proposés par le robot !\nToutes ces donnés sont enregistrés anonymement dans la base de donnée d'analyser les statistiques ci-dessous\n­`,
            fields: [
                {
                    name: '📅 Emploi du temps',
                    value: `${stats.edt}`,
                    inline: true
                }, {
                    name: '🔔 Rappels d\'horraires',
                    value: `${stats.remind}`,
                    inline: true
                }, {
                    name: '📔 Devoirs',
                    value: `${stats.devoir}\n­`,
                    inline: true
                },
            ],
            timestamp: new Date(),
            footer: {
                text: `Version ${version}`
            }
        }]
    }

    if (type == "BUTTON") {
        await interaction.user.send(statsContent).catch(() => { });
    } else {
        await interaction.editReply(statsContent).catch(() => { });
    }

    (client.channels.cache.get(`874251822045487125`)).send(`📊 Stats sent to ${interaction.user.username}`).catch(() => { ; });
}

module.exports = { stats }