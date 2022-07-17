const { Constants } = require('discord.js');

const setAllCommands = async (guildId, client) => {
    const guild = client.guilds.cache.get(guildId);

    if (guild) {
        const commands = guild.commands

        await commands.create(({
            name: 'aide',
            description: 'Affiche la liste des commandes disponibles par le robot'
        }));

        await commands.create(({
            name: 'edt',
            description: 'Affiche l\'emploi du temps sélectionné',
            options: [
                {
                    "type": Constants.ApplicationCommandOptionTypes.STRING,
                    "name": "semaine",
                    "description": "Semaine concernée",
                    "choices": [
                        {
                            "name": "Semaine actuelle",
                            "value": "1"
                        },
                        {
                            "name": "Semaine prochaine",
                            "value": "2"
                        },
                        {
                            "name": "Dans deux semaines",
                            "value": "3"
                        }
                    ],
                    "required": true
                }
            ]
        }));

        if (guildId != "831823187213680682") { // NOT A PRIVATE COMMAND
            await commands.create(({
                name: 'devoirs',
                description: 'Gestion des devoirs',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "afficher",
                        "description": "Affiche les devoirs actuels"
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "ajouter",
                        "description": "Demande l'ajout d'un nouveau devoir",
                        "options": [
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "date",
                                "description": "Date au format JJ/MM/AAAA",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "matiere",
                                "description": "Nom de la matière concernée",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "description",
                                "description": "Détails du devoir à effectuer",
                                "required": true
                            }
                        ]
                    }
                ]
            }));
        }

        await commands.create(({
            name: 'stats',
            description: 'Affiche les statistiques enregistrées par le robot',
            options: [
                {
                    "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    "name": "globales",
                    "description": "Statistiques globales"
                },
                {
                    "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    "name": "devoirs",
                    "description": "Statistiques concernant uniquement les devoirs"
                }
            ]
        }));

        if (guildId == "831823187213680682") { // PRIVATE COMMANDS
            await commands.create(({
                name: 'edtadd',
                description: 'Ajout manuel d\'un emploi du temps',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "date",
                        "description": "Date format DD/MM/YYYY",
                        "required": true
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.ATTACHMENT,
                        "name": "link",
                        "description": "Photo de l'emploi du temps",
                        "required": true
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "description",
                        "description": "Description de l'emploi du temps",
                        "required": false
                    }
                ]
            }));

            await commands.create(({
                name: 'edtshow',
                description: 'Montre la BDD de l\'emploi du temps'
            }));

            await commands.create(({
                name: 'edtsendmp',
                description: 'Envoie manuellement l\'emploi du temps en message privé',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.USER,
                        "name": "userid",
                        "description": "ID de l'utilisateur",
                        "required": true
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "semaine",
                        "description": "Semaine concernée",
                        "choices": [
                            {
                                "name": "Semaine actuelle",
                                "value": "1"
                            },
                            {
                                "name": "Semaine prochaine",
                                "value": "2"
                            },
                            {
                                "name": "Dans deux semaines",
                                "value": "3"
                            }
                        ],
                        "required": true
                    }
                ]
            }));

            await commands.create(({
                name: 'edtrmd',
                description: 'Ajoute manuellement les horraires de la semaine',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "semaine",
                        "description": "Semaine concernée",
                        "choices": [
                            {
                                "name": "Semaine actuelle",
                                "value": "1"
                            },
                            {
                                "name": "Semaine prochaine",
                                "value": "2"
                            },
                            {
                                "name": "Dans deux semaines",
                                "value": "3"
                            }
                        ],
                        "required": true
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "horraire",
                        "description": "Horraires de la semaine (h1,h2,??,h3)",
                        "required": true
                    }
                ]
            }));

            await commands.create(({
                name: 'edtrmdshow',
                description: 'Montre la BDD des horraires'
            }));

            await commands.create(({
                name: 'edtchm',
                description: 'Envoie manuellement une notification de changement majeur d\'emploi du temps',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.STRING,
                        "name": "semaine",
                        "description": "Semaine concernée",
                        "choices": [
                            {
                                "name": "Semaine actuelle",
                                "value": "1"
                            },
                            {
                                "name": "Semaine prochaine",
                                "value": "2"
                            },
                            {
                                "name": "Dans deux semaines",
                                "value": "3"
                            }
                        ],
                        "required": true
                    }
                ]
            }));

            await commands.create(({
                name: 'note',
                description: 'Annonce manuellement l\'ajout d\'une nouvelle note',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "add",
                        "description": "Annoncer l'ajout d'une nouvelle note",
                        "options": [
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "matiere",
                                "description": "Nom de la matière",
                                "required": true
                            }
                        ]
                    }
                ]
            }));

            await commands.create(({
                name: 'devoirs',
                description: 'Gestion des devoirs',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "afficher",
                        "description": "Affiche les devoirs actuels"
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "ajouter",
                        "description": "Demande l'ajout d'un nouveau devoir",
                        "options": [
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "date",
                                "description": "Date au format JJ/MM/AAAA",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "matiere",
                                "description": "Nom de la matière concernée",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "description",
                                "description": "Détails du devoir à effectuer",
                                "required": true
                            }
                        ]
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "forceadd",
                        "description": "Ajoute un nouveau devoir",
                        "options": [
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "date",
                                "description": "Date au format JJ/MM/AAAA",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "matiere",
                                "description": "Nom de la matière concernée",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "description",
                                "description": "Détails du devoir à effectuer",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.USER,
                                "name": "userid",
                                "description": "Utilisateur qui a ajouté ce devoir",
                                "required": false
                            }
                        ]
                    },
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "forcedelete",
                        "description": "Supprime un devoir",
                        "options": [
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "date",
                                "description": "Date au format JJ/MM/AAAA",
                                "required": true
                            },
                            {
                                "type": Constants.ApplicationCommandOptionTypes.STRING,
                                "name": "matiere",
                                "description": "Nom de la matière concernée",
                                "required": true
                            }
                        ]
                    }
                ]
            }));

            await commands.create(({
                name: 'bie',
                description: 'Commande de gestion BIE',
                options: [
                    {
                        "type": Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                        "name": "send",
                        "description": "Envoi le message d'utilisation du robot"
                    }
                ]
            }));
        }
    }
}

module.exports = { setAllCommands };