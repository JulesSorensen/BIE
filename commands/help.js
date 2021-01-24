module.exports = {
    name: 'help',
    description: 'Information about the arguments provided.',
    args: false,
    usage: '[command]',
    execute(msg, args, client, prefix, getca, version) {
        lang = getca("language", msg)
        const arrow = client.emojis.cache.get("794245707259314196").toString();
        if (!args[0]) {
            if (lang[msg.author.id] === "FR") {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "http://google.com",
                        description: "Voici la liste des catégories de Glede ! \nPour voir les commandes des catégories, tapez `" + prefix + "aide [categorie]`.\nVous pouvez aussi taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: arrow + " Ping",
                            value: "Savez-vous comment me défier au ping-pong au moins ?\n­"
                        },
                        {
                            name: arrow + " Administration",
                            value: "Et oui, je peux vous aider à gérer votre serveur Discord !\n­"
                        },
                        {
                            name: arrow + " Customisation",
                            value: "Saviez-vous que je pouvais changer l'ambiance de votre serveur ?\n­"
                        },
                        {
                            name: arrow + " Divers",
                            value: "Toujours plus de commandes !\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Demande d'aide demandé par " + msg.author.tag
                        }
                    }
                })
            } else if (lang[msg.author.id] === "NO") {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "http://google.com",
                        description: "Her er listen over Gledes kategorier! \nHvis du vil se listen over kommandoer i en kategori, skriver `" + prefix + "hjelpe [kategori]`.\nDu kan også skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: arrow + " Ping",
                            value: "Vet du selv hvordan du i det minste skal utfordre meg til bordtennis?\n­"
                        },
                        {
                            name: arrow + " Administrasjon",
                            value: "Og ja, jeg kan hjelpe deg med å administrere serveren din!\n­"
                        },
                        {
                            name: arrow + " Tilpasning",
                            value: "Visste du at jeg kunne endre stemningen på serveren din?\n­"
                        },
                        {
                            name: arrow + " Diverse",
                            value: "For alltid flere kommandoer!\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                })
            } else {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "http://google.com",
                        description: "Here is the list of Glede's categories! \nTo see the list of commands in a category, type `" + prefix + "help [category]`.\nYou can also type `" + prefix + "help language` to find out how to change my language.\n­",
                        fields: [{
                            name: arrow + " Ping",
                            value: "Do you even know how to challenge me to ping-pong at least?\n­"
                        },
                        {
                            name: arrow + " Administration",
                            value: "And yes, I can help you manage your server!\n­"
                        },
                        {
                            name: arrow + " Customization",
                            value: "Did you know I could change the mood of your server?\n­"
                        },
                        {
                            name: arrow + " Misc",
                            value: "For always more commands!\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                })
            }
        }
        // categories
        if (args[0] === "ping") {
            // ping
        } else if (args[0] === "administration" || args[0] === "administrasjon") {
            // administration
            if (lang[msg.author.id] === "FR") {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "http://google.com",
                        description: "Voici la catégorie d'administration, avec toute ses commandes ! \nPour avoir la détaille d'une commande, tapez `" + prefix + "aide [commande]`.\nVous pouvez aussi taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: prefix + "ban @[utilisateur]",
                            value: "Permet de bannir l'utilisateur.\n­"
                        },
                        {
                            name: prefix + "exclure @[utilisateur]",
                            value: "Permet d'exclure l'utilisateur.\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Commande d'aide demandé par " + msg.author.tag
                        }
                    }
                })
            } else if (lang[msg.author.id] === "NO") {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "http://google.com",
                        description: "Her er listen over Gledes kategorier! \nHvis du vil se listen over kommandoer i en kategori, skriver `" + prefix + "hjelpe [kategori]`.\nDu kan også skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: arrow + " Ping",
                            value: "Vet du selv hvordan du i det minste skal utfordre meg til bordtennis?\n­"
                        },
                        {
                            name: arrow + " Administrasjon",
                            value: "Og ja, jeg kan hjelpe deg med å administrere serveren din!\n­"
                        },
                        {
                            name: arrow + " Tilpasning",
                            value: "Visste du at jeg kunne endre stemningen på serveren din?\n­"
                        },
                        {
                            name: arrow + " Diverse",
                            value: "For alltid flere kommandoer!\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                })
            } else {
                msg.channel.send({
                    embed: {
                        color: 1146986,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "http://google.com",
                        description: "Here is the list of Glede's categories! \nTo see the list of commands in a category, type `" + prefix + "help [category]`.\nYou can also type `" + prefix + "help language` to find out how to change my language.\n­",
                        fields: [{
                            name: arrow + " Ping",
                            value: "Do you even know how to challenge me to ping-pong at least?\n­"
                        },
                        {
                            name: arrow + " Administration",
                            value: "And yes, I can help you manage your server!\n­"
                        },
                        {
                            name: arrow + " Customization",
                            value: "Did you know I could change the mood of your server?\n­"
                        },
                        {
                            name: arrow + " Misc",
                            value: "For always more commands!\n­"
                        }
                        ],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                })
            }
            // ping help commands
        } else if (args[0] === "ping") {
            // ping is also a command without prefix for start...
            // administration help commands
            // custom help commands
        } else if (args[0] === "prefix" || args[0] === "préfix" || args[0] === "prefiks") {
            if (lang[msg.author.id] === "FR") {
                msg.channel.send({
                    embed: {
                        color: 2067276,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        fields: [{
                            name: prefix + "préfix",
                            value: "Permet de changer le préfix en faisant `­" + prefix + "préfix [nouveau préfix]`\nIl faut avoir la permission d'administrateur pour effectuer cette commande !\n­"
                        }],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Comamande d'aide demandé par " + msg.author.tag
                        }
                    }
                })
            } else if (lang[msg.author.id] === "NO") {
                msg.channel.send({
                    embed: {
                        color: 2067276,
                        author: {
                            name: msg.guild.name + " | Hjelp kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        fields: [{
                            name: prefix + "préfix",
                            value: "Lar deg endre prefikset ved å gjøre `­" + prefix + "prefiks [nytt prefiks]`\nAdministrator tillatelse er nødvendig for å utføre denne kommandoen !\n­"
                        }],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                })
            } else {
                msg.channel.send({
                    embed: {
                        color: 2067276,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        fields: [{
                            name: prefix + "préfix",
                            value: "Allows you to change the prefix by doing `­" + prefix + "prefix [new prefix]`\nAdministrator permission is required to perform this command !\n­"
                        }],
                        timestamp: version,
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                })
            }

        }
    }
};