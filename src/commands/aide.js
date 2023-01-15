const aide = async (params) => {
    const { interaction, version } = params;
    await interaction.deferReply({
        ephemeral: false
    })

    await interaction.editReply({
        embeds: [{
            title: `Aide`,
            description: `Liste des commandes proposés par BIE\n­`,
            thumbnail: {
                url: 'https://64.media.tumblr.com/0203de9c403a0da0ef7bf61e435cee0c/tumblr_mm7gdb53IN1re7l7wo1_r1_250.gif',
            },
            color: 0x42fcff,
            fields: [
                {
                    "name": `/edt {semaine}`,
                    "value": `Permet de récupérer l'emploi du temps sélectionné. Trois semaines vous serront proposés lors de l'entrée de la commande, à savoir qu'à partir de samedi la semaine actuelle est considérée comme étant la semaine du lundi suivant.`
                },
                {
                    "name": `/salle`,
                    "value": `Permet de récupérer l'ensemble des salles de la journée ou du lendemain si il n'y en a pas le jour même. La salle actuelle y est affiché en premier.`
                },
                {
                    "name": `/devoirs afficher`,
                    "value": `Permet de récupérer l'ensemble des devoirs à effectuer. Les précédents devoirs n'y sont plus affichés.`
                },
                {
                    "name": `/merci [personnels/classement]`,
                    "value": `Permet d'afficher son propre nombre de remerciements, ou le classement des 10 premières personnes ayant le plus de remerciements.`
                },
                {
                    "name": `/stats globales`,
                    "value": `Permet d'afficher les statistiques enregistrées par le robot.`
                },
                {
                    "name": `/stats devoirs`,
                    "value": `Permet d'afficher les statistiques concernant les devoirs passés.`
                },
                {
                    "name": `/devoirs ajouter [date] [matière] [description du devoir]`,
                    "value": `Permet de faire une demande d'ajout de devoir.`
                },
                {
                    "name": `/wifi`,
                    "value": `Permet de récupérer les informations à propos de la connexion internet d'Efficom.`
                },
                {
                    "name": `/info`,
                    "value": `Permet de récupérer le ping des différents API utilisés ainsi que la version du bot.\n­`
                }
            ],
            footer: {
                text: `Version ${version}`
            }
        }]
    });
}

module.exports = { aide }