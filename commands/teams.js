module.exports = {
    name: 'teams',
    description: 'Information about the arguments provided.',
    args: true,
    usage: '[Lien] [HeureDuDébut] [HeureDeFin] [NomDuCours]',
    execute(msg, args, client, prefix, getca, version) {
        if (msg.guild.id != "762698485011054602") return;
        msg.delete({ timeout: 10 });
        const arg = msg.content.slice(prefix.length).split(' ');
        let efficomsalon = client.channels.cache.get("762698661892849714");
        if (arg.length == 1) return msg.channel.send("Merci de mettre un lien !")
        if (arg.length == 2) {
            var teamsurl = arg[1]
            efficomsalon.send("<@&775833208012800050>")
            efficomsalon.send({
                embed: {
                    color: 4673464,
                    thumbnail: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                    },
                    author: {
                        name: "Une réunion va ou vient de commencer !\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­\n­",
                    url: teamsurl,
                    fields: [{
                        name: "⏰ ­  Début  ­  ⏰",
                        value: "Bientôt (non spécifié)­",
                        inline: true
                    }, {
                        name: "🕛  ­  Fin  ­  🕛",
                        value: "Non spécifié\n­",
                        inline: true
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "Fonctionnalité privé | Programmé par Jules Ł"
                    }
                }
            })
        } else if (arg.length == 3) { // url [1] + heure début
            var teamsurl = arg[1]
            var heuredebut = arg[2]
            efficomsalon.send("<@&775833208012800050>")
            efficomsalon.send({
                embed: {
                    color: 4673464,
                    thumbnail: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                    },
                    author: {
                        name: "Une réunion va ou vient de commencer !\n­\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­",
                    url: teamsurl,
                    fields: [{
                        name: "⏰ ­  Début  ­  ⏰",
                        value: arg[2] + "\n­",
                        inline: true
                    }, {
                        name: "🕛  ­  Fin  ­  🕛",
                        value: "Non spécifié\n­",
                        inline: true
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Programmé par Jules ꓶ"
                    }
                }
            })
        } else if (arg.length == 4) { // URL, Heure début, et fin
            var teamsurl = arg[1]
            var heuredebut = arg[2]
            var heurefin = arg[3]
            efficomsalon.send("<@&775833208012800050>")
            efficomsalon.send({
                embed: {
                    color: 4673464,
                    thumbnail: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                    },
                    author: {
                        name: "Une réunion va ou vient de commencer !\n­\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­",
                    url: teamsurl,
                    fields: [{
                        name: "⏰ ­  Début  ­  ⏰",
                        value: arg[2] + "\n­",
                        inline: true
                    }, {
                        name: "🕛  ­  Fin  ­  🕛",
                        value: heurefin + "\n­",
                        inline: true
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Programmé par Jules ꓶ"
                    }
                }
            })
        } else if (arg.length > 4) { // et la desc :)
            var teamsurl = arg[1]
            var heuredebut = arg[2]
            var heurefin = arg[3]
            if (arg.length == 5) { //desc
                var desc = arg[4]
            } else if (arg.length == 6) {
                var desc = arg[4] + " " + arg[5]
            } else if (arg.length == 7) {
                var desc = arg[4] + " " + arg[5] + " " + arg[6]
            } else if (arg.length == 8) {
                var desc = arg[4] + " " + arg[5] + " " + arg[6] + " " + arg[7]
            } else {
                var desc = arg[4] + " " + arg[5] + " " + arg[6] + " " + arg[7] + " " + arg[8]
            }
            efficomsalon.send("<@&775833208012800050>")
            efficomsalon.send({
                embed: {
                    color: 4673464,
                    thumbnail: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/1200px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
                    },
                    author: {
                        name: "Une réunion va ou vient de commencer !\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­\n­",
                    url: teamsurl,
                    description: "📚 Cours : " + desc + "\n­",
                    fields: [{
                        name: "⏰ ­  Début  ­  ⏰",
                        value: arg[2] + "\n­",
                        inline: true
                    }, {
                        name: "🕛  ­  Fin  ­  🕛",
                        value: heurefin + "\n­",
                        inline: true
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Programmé par Jules ꓶ"
                    }
                }
            })
        } else return msg.reply("une erreure s'est produite :(")
        // efficomsalon.send("<@&775833208012800050>");
        return;
    }
};