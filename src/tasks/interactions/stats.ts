import { MessageActionRow, MessageButton } from 'discord.js';
import moment from 'moment';
import { getAllData } from "../../firebase/firebase";

const stats = async (interaction, client) => {

    await interaction.deferUpdate();
    let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
    let stats: any = (await getAllData('stats'));
    stats = stats.allStats;
    const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("DEVSTATS").setEmoji("893971159933145140").setLabel("Stats devoirs").setStyle('SECONDARY')
    )
    await interaction.user.send({
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
            timestamp: new Date()
        }], components: [row]
    }).catch(() => { });
    (client.channels.cache.get(`874251822045487125`)).send(`📊 Stats sent to ${interaction.user.username}`).catch(() => { ; });
}

export { stats }