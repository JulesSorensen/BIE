const { Client, Message, MessageActionRow, MessageButton } = require('discord.js');

const sendBIEMessage = async (params) => {
    const { interaction, client } = params;

    await interaction.deferReply({ ephemeral: true });

    const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("EDT1").setEmoji("893889890108981278").setLabel("EDT 1").setStyle('SUCCESS'),
        new MessageButton().setCustomId("EDT2").setEmoji("893889890108981278").setLabel("EDT 2").setStyle('SUCCESS'),
        new MessageButton().setCustomId("EDT3").setEmoji("893889890108981278").setLabel("EDT 3").setStyle('SUCCESS'),
        new MessageButton().setCustomId("DEV").setEmoji("893971159933145140").setLabel("Devoirs").setStyle('PRIMARY'),
        new MessageButton().setCustomId("STATS").setEmoji("934423720875941918").setLabel("Stats").setStyle('SECONDARY'),
    )

    client.channels.cache.get(`991371617043222638`).send({
        content: `
**Bonjour à tout les <@&775833208012800050> ! <:hi_gil:874358424538869791>**
    
<a:screen:934522071126540390> **Commandes :**
Pour connaître la liste des commandes disponibles par le robot, utilisez la commande \`/aide\`

🔰 **Icônes :**
Voici la liste des icônes que vous pouvez obtenir en demandant l'emploi du temps:
    - <:Check:866581082551615489> L'emploi du temps est fiable, vérifié via l'API de MyGes
    - <:Question:997270154490679348> API de MyGes indisponible
    - <:Uncheck:866581082870513684> L'emploi du temps n'est plus valide
    - <:Wait:997268180911280158> Merci d'attendre 2 minutes avant de pouvoir contacter l'API
*Dans le cas ou vous n'avez pas de pastille verte, le dernier emploi du temps enregistré vous sera envoyé*

<a:thumbsup:893920077974499388> **Réactions**
Sélectionnez...
    <:greencalendar:934492755244245052> afin de recevoir automatiquement l'emploi du temps de la semaine suivante tout les vendredi soirs
    🔔 afin d'être notifié tout les soirs à 19h de l'heure à laquelle vous commencez le lendemain
    💯 afin d'être notifié dès qu'une nouvelle note apparaît sur MyGes
    📔 afin d'être notifié à l'ajout d'un nouveau devoir

<:button:934424455831253022> **Boutons**
Vous pouvez utiliser les boutons ci-dessous pour éxécuter les commandes en message privé !
        `, components: [row]
    }).then(async (msgb) => {
        await msgb.react(`934492755244245052`);
        await msgb.react(`🔔`);
        await msgb.react(`💯`);
        await msgb.react(`📔`);
    });

    return await interaction.editReply({
        content: `<:Check:866581082551615489> Message envoyé !`
    });
}

module.exports = { sendBIEMessage }