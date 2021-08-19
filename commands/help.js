module.exports = {
    name: 'help',
    guildOnly: true,
    execute(msg, args, client, prefix, getca, version) {
        lang = getca("language", msg)
        const arrow = client.emojis.cache.get("842384331329634304").toString();
        if (!args[0]) { // help
            if (lang[msg.author.id] === "FR") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "https://glede.sitew.fr/",
                        description: "Voici la liste des catégories de BIE ! \nPour voir les commandes des catégories, tapez `" + prefix + "aide [categorie]`.\nVous pouvez aussi taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: arrow + " Profil",
                            value: "Saviez-vous que vous avez un profil ?\n­"
                        },
                        {
                            name: arrow + " Clan",
                            value: "Les clans vous permettent de gagner plus d'expérience, c'est génial !\n­"
                        },
                        {
                            name: arrow + " Role",
                            value: "Avoir un rôle customisé dans vos serveur, c'est possible !\n­"
                        },
                        {
                            name: arrow + " Divers",
                            value: "Pour toujours plus de commandes !\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Demande d'aide demandé par " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else if (lang[msg.author.id] === "NO") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "https://glede.sitew.fr/",
                        description: "Her er listen over BIEs kategorier! \nHvis du vil se listen over kommandoer i en kategori, skriver `" + prefix + "hjelpe [kategori]`.\nDu kan også skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: arrow + " Profile",
                            value: "Did you know you had a profile?\n­"
                        },
                        {
                            name: arrow + " Clan",
                            value: "The clans allow you to gain more experience, it's great!\n­"
                        },
                        {
                            name: arrow + " Role",
                            value: "Å ha en tilpasset rolle på serveren din er mulig!\n­"
                        },
                        {
                            name: arrow + " Misc",
                            value: "For always more commands!\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "https://glede.sitew.fr/",
                        description: "Here is the list of BIE's categories! \nTo see the list of commands in a category, type `" + prefix + "help [category]`.\nYou can also type `" + prefix + "help language` to find out how to change my language.\n­",
                        fields: [{
                            name: arrow + " Profile",
                            value: "Did you know you had a profile?\n­"
                        },
                        {
                            name: arrow + " Clan",
                            value: "The clans allow you to gain more experience, it's great!\n­"
                        },
                        {
                            name: arrow + " Role",
                            value: "Having a custom role in your server is possible!\n­"
                        },
                        {
                            name: arrow + " Misc",
                            value: "For always more commands!\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            }
        }
        // categories
        if (args[0].toLowerCase() === "ping") {
            // ping
        } else if (args[0].toLowerCase() === "profil" || args[0].toLowerCase() === "profile" || args[0].toLowerCase() === "p") {
            // profil
            if (lang[msg.author.id] === "FR") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "https://glede.sitew.fr/",
                        description: "Voici la catégorie de profil, avec toutes ses commandes !\nVous pouvez taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: prefix + "profil",
                            value: "Permet d'afficher votre profil, vous pouvez aussi taper `­" + prefix + "p`\nPour voir le profile de quelqu'un d'autre, vous pouvez taper `­" + prefix + "profil [@utilisateur]`, en le mentionnant ou en tappant son nom complet.\n­"
                        }, {
                            name: prefix + "profil rename [Nouveau Nom]",
                            value: "Permet de changer votre pseudonyme sur BIE, attention vous pouvez le changer 3 fois seulement !\n­"
                        }, {
                            name: prefix + "profil image [Lien]",
                            value: "Permet de changer votre image de profil sur BIE, atttention il faut mettre un lien qui redirige vers votre image ! Les GIF sont autorisés.\n­"
                        }, {
                            name: prefix + "profil description [Petit texte à propos de vous...]",
                            value: "Permet de changer votre description de profil sur BIE. Tapez `" + prefix + "profil description reset` pour retirer votre description.\n­"
                        }, {
                            name: prefix + "profil color [Code Couleur]",
                            value: "Permet de changer votre couleur de profil sur BIE.\nLe code doit être décimal, ou bien hexadécimel (qui commence par un # du coup).\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Commande d'aide demandé par " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else if (lang[msg.author.id] === "NO") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "https://glede.sitew.fr/",
                        description: "Her er profilkategorien, med alle kommandoene!\nDu kan skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: prefix + "profil",
                            value: "Lar deg vise profilen din, du kan også skrive `­" + prefix + "p`.\nFor å se andres profil, kan du skrive `­" + prefix + "profil [@bruker]`, ved å nevne ham eller ved å skrive inn fullt navn.\n­"
                        }, {
                            name: prefix + "profil rename [Nytt Navn]",
                            value: "Lar deg endre kallenavnet ditt på BIE, vær forsiktig så du kan endre det bare 3 ganger!\n­"
                        }, {
                            name: prefix + "profil picture [Lenken]",
                            value: "Lar deg endre profilbildet ditt på BIE, vær forsiktig, du må sette en lenke som omdirigerer til bildet ditt! GIF er tillatt. \n­"
                        }, {
                            name: prefix + "profil description [En kort beskrivelse om deg... ]",
                            value: "Lar deg endre profilbeskrivelsen din på BIE. Skriv `" + prefix + "profil description reset` for å fjerne beskrivelsen.\n­"
                        }, {
                            name: prefix + "profil color [Fargekode]",
                            value: "Lar deg endre profilfargen din på BIE.\nKoden må være desimal eller heksadesimal (begynner med #).\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "https://glede.sitew.fr/",
                        description: "Here is the profile category, with all its commands!\nYou can type `" + prefix + "help language` to find out how to change languages.\n­",
                        fields: [{
                            name: prefix + "profile",
                            value: "Allows you to display your profile, you can also type `­" + prefix + "p`.\nTo see someone else's profile, you can type `­" + prefix + "profile [@user]`, by mentioning him or by typing his full name.\n­"
                        }, {
                            name: prefix + "profile rename [New Name]",
                            value: "Allows you to change your nickname on BIE, be careful you can change it only 3 times!\n­"
                        }, {
                            name: prefix + "profile picture [Link]",
                            value: "Allows you to change your profile picture on BIE, be careful, you have to put a link that redirects to your image! GIFs are allowed.\n­"
                        }, {
                            name: prefix + "profile description [A short description about you...]",
                            value: "Allows you to change your profile description on BIE. Type `" + prefix + "profile description reset` to remove your description.\n­"
                        }, {
                            name: prefix + "profile color [Color Code]",
                            value: "Allows you to change your profile color on BIE.\n The code must be decimal, or hexadecimal (starting with a #).\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            }
        } else if (args[0].toLowerCase() === "clan" || args[0].toLowerCase() === "clans" || args[0].toLowerCase() === "c") {
            // clan
            if (lang[msg.author.id] === "FR") {
                msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "https://glede.sitew.fr/",
                        description: "Voici la catégorie de clans, avec toutes ses commandes !\nVous pouvez taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: prefix + "clan",
                            value: "Permet d'afficher votre clan\nPour voir le clan de quelqu'un d'autre, vous pouvez taper `­" + prefix + "clan [Nom]`.\n­"
                        }, {
                            name: prefix + "clan create [Nom]",
                            value: "Permet de créer votre clan gratuitement.\n­"
                        }, {
                            name: prefix + "clan join [Nom]",
                            value: "Permet de rejoindre un clan. Attention, vous ne pouvez pas rejoindre les clans privés sans y être invité.\n­"
                        }, {
                            name: prefix + "clan leave",
                            value: "Permet de quitter votre clan.\n­"
                        }, {
                            name: prefix + "clan members",
                            value: "Permet de voir la liste des membres de votre clan, ou d'un autre clan en rajoutant son nom après la commande.\n­"
                        }, {
                            name: prefix + "clan leaderboard",
                            value: "Permet de voir la liste des clans qui ont le plus gros niveau.\n­"
                        }
                        ]
                    }
                }).catch(() => { ; });
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        description: "Voici les commandes réservés aux propriétaires de clans.\n­",
                        fields: [{
                            name: prefix + "clan invite [@Nom]",
                            value: "Permet d'inviter la personne mentionnée dans votre clan. Cette personne être présente pour accepter votre invitation.\n­"
                        }, {
                            name: prefix + "clan description [Petit texte qui décrit le clan]",
                            value: "Mets une description pour votre clan.\n­"
                        }, {
                            name: prefix + "clan image [lien]",
                            value: "Change l'image du clan. Attention, le lien doit redirigé vers votre image.\n­"
                        }, {
                            name: prefix + "clan color [Code Couleur]",
                            value: "Change la couleur de votre clan. Le code couleur peut être décimal, ou hexadécimal (si il commence par un #).\n­"
                        }, {
                            name: prefix + "clan public",
                            value: "Mets le statut de votre clan en publique. Sachez qu'il l'est par défaut.\n­"
                        }, {
                            name: prefix + "clan private",
                            value: "Mets le statut de votre clan en privé. Personne ne pourra rejoindre sans votre invitation.\n­"
                        }, {
                            name: prefix + "clan kick [@Nom ou Nom]",
                            value: "Permet d'exclure la personne de votre clan. Vous n'êtes pas obligé de mentionner la personne si vous avez son nom complet.\n­"
                        }, {
                            name: prefix + "clan delete",
                            value: "Permet de supprimer votre clan. Toutes les personnes seront exclus du clan dont vous aussi, comme si votre clan n'avait jamais existé.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Commande d'aide demandé par " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else if (lang[msg.author.id] === "NO") {
                msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "https://glede.sitew.fr/",
                        description: "Her er klankategorien, med alle kommandoene!\nDu kan skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: prefix + "clan",
                            value: "Lar deg se klanen din.\nFor å se andres klan kan du skrive `­" + prefix + "clan [Navn]`.\n­"
                        }, {
                            name: prefix + "clan create [Navn]",
                            value: "Lar deg lage din klan gratis.\n­"
                        }, {
                            name: prefix + "clan join [Navn]",
                            value: "Lar deg bli med i en klan. Advarsel! Du kan ikke bli med i private klaner uten å bli invitert.\n­"
                        }, {
                            name: prefix + "clan leave",
                            value: "Lar deg forlate klanen din.\n­"
                        }, {
                            name: prefix + "clan members",
                            value: "Lar deg se listen over medlemmene i klanen din, eller en annen klan ved å legge til navnet etter kommandoen.\n­"
                        }, {
                            name: prefix + "clan leaderboard",
                            value: "Lar deg se listen over klaner som har høyest nivå.\n­"
                        }
                        ]
                    }
                }).catch(() => { ; });
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        description: "Her er kommandoene reservert for klaneiere.\n­",
                        fields: [{
                            name: prefix + "clan invite [@Bruker]",
                            value: "Lar deg invitere personen som er nevnt i klanen din. Denne personen må være til stede for å godta invitasjonen din.\n­"
                        }, {
                            name: prefix + "clan description [Kort tekst som beskriver klanen ]",
                            value: "Sett en beskrivelse for klanen din.\n­"
                        }, {
                            name: prefix + "clan picture [Lenke]",
                            value: "Endrer bildet av klanen. Vær forsiktig, lenken må omdirigere til bildet ditt.\n­"
                        }, {
                            name: prefix + "clan color [Fargekode]",
                            value: "Endre fargen på klanen din. Fargekoden kan være desimal eller heksadesimal (hvis den begynner med et #).\n­"
                        }, {
                            name: prefix + "clan public",
                            value: "Gjør klanens status offentlig. Vet at det er som standard.\n­"
                        }, {
                            name: prefix + "clan private",
                            value: "Gjør klanens status privat. Ingen kan være med uten invitasjonen din.\n­"
                        }, {
                            name: prefix + "clan kick [@Bruker or Bruker]",
                            value: "Lar deg ekskludere Bruker fra klanen din. Du trenger ikke å nevne Bruker hvis du har fullt navn.\n­"
                        }, {
                            name: prefix + "clan delete",
                            value: "Lar deg slette klanen din. Alle vil bli ekskludert fra klanen, inkludert deg, som om klanen din aldri hadde eksistert.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else {
                msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "https://glede.sitew.fr/",
                        description: "Here is the clan category, with all its commands!\nYou can type `" + prefix + "help language` to find out how to change languages.\n­",
                        fields: [{
                            name: prefix + "clan",
                            value: "Allows you to view your clan.\nTo view someone else's clan, you can type `­" + prefix + "clan [Name]`.\n­"
                        }, {
                            name: prefix + "clan create [Name]",
                            value: "Allows you to create your clan for free.\n­"
                        }, {
                            name: prefix + "clan join [Name]",
                            value: "Allows you to join a clan. Warning, you cannot join private clans without being invited.\n­"
                        }, {
                            name: prefix + "clan leave",
                            value: "Allows you to leave your clan.\n­"
                        }, {
                            name: prefix + "clan members",
                            value: "Allows you to see the list of the members of your clan, or of another clan by adding its name after the command.\n­"
                        }, {
                            name: prefix + "clan leaderboard",
                            value: "Allows you to see the list of clans that have the highest level.\n­"
                        }
                        ]
                    }
                }).catch(() => { ; });
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        description: "Here are the commands reserved for clan owners.\n­",
                        fields: [{
                            name: prefix + "clan invite [@User]",
                            value: "Allows you to invite the user mentioned in your clan. This user must be present to accept your invitation.\n­"
                        }, {
                            name: prefix + "clan description [Short text describing the clan]",
                            value: "Put a description for your clan.\n­"
                        }, {
                            name: prefix + "clan picture [Link]",
                            value: "Changes the image of the clan. Be careful, the link must redirect to your image.\n­"
                        }, {
                            name: prefix + "clan color [Color Code]",
                            value: "Change the color of your clan. The color code can be decimal, or hexadecimal (if it starts with a #).\n­"
                        }, {
                            name: prefix + "clan public",
                            value: "Make your clan's status public. Know that it is by default.\n­"
                        }, {
                            name: prefix + "clan private",
                            value: "Make your clan's status private. No one will be able to join without your invitation.\n­"
                        }, {
                            name: prefix + "clan kick [@User or User]",
                            value: "Allows you to exclude the user from your clan. You do not have to mention the user if you have their full name.\n­"
                        }, {
                            name: prefix + "clan delete",
                            value: "Allows you to delete your clan. Everyone will be excluded from the clan, including you, as if your clan had never existed.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            }
        } else if (args[0].toLowerCase() === "role" || args[0].toLowerCase() === "r") {
            // role
            if (lang[msg.author.id] === "FR") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "https://glede.sitew.fr/",
                        description: "Voici la catégorie des rôles personnalisés, avec toutes ses commandes !\nVous pouvez taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: prefix + "role [on/off]",
                            value: "Active la fonctionnalitée des rôles personnalisés. Vous devez être administrateur du serveur pour faire cette commande.\n­"
                        }, {
                            name: prefix + "role position [nombre]",
                            value: "Change la position de la création des rôles (position en partant du dernier rôle). Vous devez être administrateur du serveur pour faire cette commande.\n­"
                        }, {
                            name: prefix + "role create",
                            value: "Créer votre rôle personnalisé.\n­"
                        }, {
                            name: prefix + "role nom [Votre Nom]",
                            value: "Change le nom de votre rôle.\n­" 
                        }, {
                            name: prefix + "role color [#HEXcode]",
                            value: "Change la couleur de votre rôle en code hexadécimal.\n­" 
                        }, {
                            name: prefix + "role delete",
                            value: "Supprime votre rôle personnalisé.\n­" 
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Commande d'aide demandé par " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else if (lang[msg.author.id] === "NO") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "https://glede.sitew.fr/",
                        description: "Her er kategorien tilpassede roller, med alle kommandoene!\nDu kan skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: prefix + "role [on/off]",
                            value: "Aktiverer funksjonaliteten til egendefinerte roller. Du må være serveradministrator for å utføre denne kommandoen.\n­"
                        }, {
                            name: prefix + "role position [antall]",
                            value: "Endre posisjonen til rolleopprettelse (posisjon fra den siste rollen). Du må være serveradministrator for å utføre denne kommandoen.\n­"
                        }, {
                            name: prefix + "role create",
                            value: "Lag din egen rolle.\n­"
                        }, {
                            name: prefix + "role name [Navnet Ditt]",
                            value: "Endre navnet på rollen din.\n­" 
                        }, {
                            name: prefix + "role color [#HEXcode]",
                            value: "Endre fargen på rollen din til en heksadesimal kode.\n­" 
                        }, {
                            name: prefix + "role delete",
                            value: "Fjerner din tilpassede rolle.\n­" 
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "https://glede.sitew.fr/",
                        description: "Here is the category of custom roles, with all its commands!\nYou can type `" + prefix + "help language` to find out how to change languages.\n­",
                        fields: [{
                            name: prefix + "role [on/off]",
                            value: "Enables the custom roles feature. You must be a server administrator to do this command.\n­"
                        }, {
                            name: prefix + "role position [number]",
                            value: "Changes the position of the role creation (position starting from the last role). You must be a server administrator to do this command.\n­"
                        }, {
                            name: prefix + "role create",
                            value: "Create your own role.\n­"
                        }, {
                            name: prefix + "role name [Your Name]",
                            value: "Change the name of your role.\n­" 
                        }, {
                            name: prefix + "role color [#HEXcode]",
                            value: "Changes the colour of your role to hexadecimal code.\n­" 
                        }, {
                            name: prefix + "role delete",
                            value: "Deletes your custom role.\n­" 
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            }
        } else if (args[0].toLowerCase() === "misc" || args[0].toLowerCase() === "divers" || args[0].toLowerCase() === "language" || args[0].toLowerCase() === "langage" || args[0].toLowerCase() === "m") {
            // misc
            if (lang[msg.author.id] === "FR") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Commande d'aide",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Cliquez ici pour accéder au site officiel",
                        url: "https://glede.sitew.fr/",
                        description: "Voici la catégorie des commandes diverses !\nVous pouvez taper `" + prefix + "help language` pour savoir comment changer de langue.\n­",
                        fields: [{
                            name: prefix + "reminder add [dd/mm/yyyy] \"[NomDuRappel]\" [#SalonTextuel] [@RoleAMentionner]",
                            value: "Permet d'ajouter un rappel sur le serveur dans un salon spécifique. Faites attention aux \"\" autour de la phrase à rappeler. Le rôle à mentionner n'est pas obligatoire ! Ne vous trompez pas dans le format de la date, qui est jj/mm/aaaa.\n­"
                        }, {
                            name: prefix + "reminder list",
                            value: "Permet de récupérer la liste des futurs rappels sur le serveurs. Une fois passés, ils seront automatiquement supprimés.\n­"
                        }, {
                            name: prefix + "reminder delete [id]",
                            value: "Permet de supprimer un rappel via son ID, vous pouvez le récupérer grâce à la commande précédente.\n­"
                        }, {
                            name: prefix + "notification [on/off]",
                            value: "Permet d'activer les notification par message privé quand vous ou votre clan gagnez un niveau.\n­"
                        }, {
                            name: prefix + "notification reaction [on/off]",
                            value: "Permet d'activer les notifications de réaction quand vous passez un niveau sur un serveur Discord. Vous devez être administrateur du serveur pour faire cette commande.\n­"
                        }, {
                            name: prefix + "remindme [Temps] [Message]",
                            value: "Vous défini un rappel dans le temps indiqué. Exemple : `remindme 5h6m je dois aller à l'école`. Seulement les heures (h), les minutes (m) et les secondes (s) marchent. Si vous voulez mettre des secondes, il ne faut pas indiquer d'heure ni de minutes.\n­"
                        }, {
                            name: prefix + "prefix [Nouveau Préfixe]",
                            value: "Permet de changer le préfix de BIE sur votre serveur. Vous devez évidemment avoir la permission administrateur pour pouvoir faire cette commande.\n­"
                        }, {
                            name: prefix + "langage [EN/NO/FR]",
                            value: "Permet de changer la langue du robot pour vous. Les langues disponibles sont l'Anglais (EN), le Français (FR) et le Norvégien (NO).\n­"
                        }, {
                            name: prefix + "suggestion [Votre Suggestion]",
                            value: "Envoi votre suggestion sur le serveur officiel de BIE. Tout les utilisateurs pourront voter pour donner leur avis.\n­"
                        }, {
                            name: prefix + "guilde",
                            value: "Affiche le classement des membres ayant envoyé le plus de messages dans le serveur Discord dans lequel vous tappez la commande.\n­"
                        }, {
                            name: prefix + "ping",
                            value: "Affiche la latence du robot.\n­"
                        }, {
                            name: prefix + "version",
                            value: "Affiche la dernière version du robot.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Commande d'aide demandé par " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else if (lang[msg.author.id] === "NO") {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Hjelpe kommando",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Klikk her for å gå til det offisielle nettstedet",
                        url: "https://glede.sitew.fr/",
                        description: "Her er kategorien diverse bestillinger!\nDu kan skrive `" + prefix + "hjelpe language` for å finne ut hvordan jeg kan endre språket mitt.\n­",
                        fields: [{
                            name: prefix + "reminder add [dd/mm/yyyy] \"[ReminderTitle]\" [#TextChannel] [@RoleToMention]",
                            value: "Lar deg legge til en påminnelse på serveren i et bestemt rom. Vær oppmerksom på \"\" rundt setningen som skal tilbakekalles. Rollen som skal nevnes er ikke obligatorisk! Gjør ingen feil om datoformatet, som er dd/mm/åååå.\n­"
                        }, {
                            name: prefix + "reminder list",
                            value: "Lar deg hente listen over fremtidige tilbakeringinger på serverne. Når de er bestått, blir de automatisk slettet.\n­"
                        }, {
                            name: prefix + "reminder delete [id]",
                            value: "Lar deg slette en påminnelse via ID -en, du kan hente den ved hjelp av den forrige kommandoen.\n­"
                        }, {
                            name: prefix + "notification [on/off]",
                            value: "Gjør det mulig å varsle private meldinger når du eller din klan får et nivå.\n­"
                        }, {
                            name: prefix + "notification reaction [on/off]",
                            value: "Aktiverer reaksjon varsler når du passerer et nivå på en Discord-server. Du må være serveradministrator for å kunne utføre denne kommandoen.\n­"
                        }, {
                            name: prefix + "remindme [Tid] [Beskjed]",
                            value: "Angi en påminnelse innen den angitte tiden. Eksempel: `remindme 5h6m om at jeg må gå på skolen`. Bare timer (h), minutter (m) og sekunder (er) fungerer. Hvis du vil sette sekunder, trenger du ikke å angi timer eller minutter.\n­"
                        }, {
                            name: prefix + "prefix [Nytt Prefiks]",
                            value: "Lar deg endre prefikset til BIE på serveren din. Du trenger administratortillatelse for å utføre denne kommandoen. \n­"
                        }, {
                            name: prefix + "language [EN/NO/FR]",
                            value: "Lar deg endre språket til roboten for deg. De tilgjengelige språkene er engelsk (EN), fransk (FR) og norsk (NO).\n­"
                        }, {
                            name: prefix + "suggestion [Ditt Forslag]",
                            value: "Send ditt forslag til den offisielle BIE-serveren. Alle brukere vil kunne stemme for å si sin mening.\n­"
                        }, {
                            name: prefix + "guild",
                            value: "Viser rangeringen av medlemmene som sendte flest meldinger til Discord-serveren der du skriver kommandoen.\n­"
                        }, {
                            name: prefix + "ping",
                            value: "Viser latenstiden til roboten.\n­"
                        }, {
                            name: prefix + "version",
                            value: "Viser den siste versjonen av roboten.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Hjelpe kommando forespurt av " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            } else {
                return msg.channel.send({
                    embed: {
                        color: 10767175,
                        author: {
                            name: msg.guild.name + " | Help command",
                            icon_url: msg.guild.iconURL()
                        },
                        title: "Click here to go to the official website",
                        url: "https://glede.sitew.fr/",
                        description: "This is the miscellaneous commands category!\nYou can type `" + prefix + "help language` to find out how to change languages.\n­",
                        fields: [{
                            name: prefix + "reminder add [dd/mm/yyyy] \"[ReminderTitle]\" [#TextChannel] [@RoleToMention]",
                            value: "Allows you to add a reminder on the server in a specific channel. Pay attention to the \"\" around the sentence to remind. The role to be mentioned is not mandatory ! Do not make a mistake in the date format, which is dd/mm/yyyy.\n­"
                        }, {
                            name: prefix + "reminder list",
                            value: "Allows you to retrieve the list of future reminders on the server. Once passed, they will be automatically deleted.\n­"
                        }, {
                            name: prefix + "reminder delete [id]",
                            value: "Allows you to delete a reminder via its ID, you can recover it with the previous command.\n­"
                        }, {
                            name: prefix + "notification [on/off]",
                            value: "Enables private message notification when you or your clan gains a level.\n­"
                        }, {
                            name: prefix + "notification reaction [on/off]",
                            value: "Enables reaction notifications when you pass a level on a Discord server. You must be a server administrator to make this command.\n­"
                        }, {
                            name: prefix + "remindme [Time] [Message]",
                            value: "Set a reminder within the specified time. Example: `remindme 5h6m I have to go to school`. Only the hours (h), minutes (m) and seconds (s) will work. If you want to put seconds, you don't have to indicate hours or minutes.\n­"
                        }, {
                            name: prefix + "prefix [New Prefix]",
                            value: "Allows you to change the prefix of BIE on your server. You need administrator permission to make this command.\n­"
                        }, {
                            name: prefix + "language [EN/NO/FR]",
                            value: "Allows you to change the language of the robot for you. The available languages are English (EN), French (FR) and Norwegian (NO).\n­"
                        }, {
                            name: prefix + "suggestion [Your Suggestion]",
                            value: "Send your suggestion to the official BIE server. All users will be able to vote to give their opinion.\n­"
                        }, {
                            name: prefix + "guild",
                            value: "Shows the ranking of the members who sent the most messages to the Discord server where you type the command.\n­"
                        }, {
                            name: prefix + "ping",
                            value: "Displays the robot's latency.\n­"
                        }, {
                            name: prefix + "version",
                            value: "Displays the latest version of the robot.\n­"
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: msg.author.avatarURL(),
                            text: "Help command requested by " + msg.author.tag
                        }
                    }
                }).catch(() => { ; });
            }
        }
    }
};