import { Client, Message, MessageActionRow, MessageButton } from 'discord.js';

module.exports = {
    name: 'bie',
    guildOnly: true,
    execute(msg, args, client, prefix, getca, version) {
        if (msg.author.id != `676690539126718467`) return;

        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("EDT1").setEmoji("893889890108981278").setLabel("EDT 1").setStyle('SUCCESS'),
            new MessageButton().setCustomId("EDT2").setEmoji("893889890108981278").setLabel("EDT 2").setStyle('SUCCESS'),
            new MessageButton().setCustomId("EDT3").setEmoji("893889890108981278").setLabel("EDT 3").setStyle('SUCCESS'),
            new MessageButton().setCustomId("DEV").setEmoji("893971159933145140").setLabel("Devoirs").setStyle('PRIMARY'),
            new MessageButton().setCustomId("STATS").setEmoji("934423720875941918").setLabel("Stats").setStyle('SECONDARY'),
        )

        msg.channel.send({ content: `**Bonjour à tout les <@&775833208012800050> ! <:hi_gil:874358424538869791>**\n\n<a:screen:934522071126540390> **Voici les commandes importantes à connaître concernant Efficom :**\n\`&emploidutemps [1/2/3]\` pour recevoir l'emploi du temps de la semaine précisé (raccourci: \`&edt [1/2/3]\`)\n\`&devoirs\` pour recevoir les prochains devoirs à faire (\`&devoirs add [matière] [description]\` pour en ajouter)\n\`&teams [LienDeRéunion] [HeureDebut] [HeureFin] [NomDuCours]\` pour prévenir la classe d'une réunion Teams\n\`&note [Matière]\` pour prévenir la classe d'une nouvelle note sur MyGes\n\n<a:thumbsup:893920077974499388> **Réactions**\nCliquez sur <:greencalendar:934492755244245052> pour recevoir automatiquement l'emploi du temps de la semaine suivante tout les vendredi soirs\nCliquez sur 🔔 pour être notifié tout les soirs à 19h30 de l'heure à laquelle vous commencez le lendemain\nCliquez sur 💯 pour être notifié dès qu'une nouvelle note apparaît sur MyGes\nCliquez sur 📔 pour être notifié à l'ajout d'un nouveau devoir\nCliquez sur <:teams:875369282207354920> pour être notifié à chaque réunion Teams\n\n<:button:934424455831253022> **Boutons**\nVous pouvez utiliser les boutons ci-dessous pour éxécuter les commandes en message privé !`, components: [row] })
            .then(msgb => { msgb.react(`934492755244245052`).catch(() => { ; }); msgb.react(`🔔`).catch(() => { ; }); msgb.react(`💯`).catch(() => { ; }); msgb.react(`📔`).catch(() => { ; }); msgb.react(`875369282207354920`).catch(() => { ; }); }).catch((e) => { console.log(e); });
        return;
    }
};