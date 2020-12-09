const Discord = require('discord.js');
const client = new Discord.Client();
const { get } = require("snekfetch"); 
const fs = require('fs');
let prefix = "$"
let version = "1.4.1";
let efficomstud = ["427408019114950667", "160804942565736449", "220571668458766337", "394929882049675264", "697717795227697173", "231827158878781441", "400318649191104522", "105457483740368896", "765135022985707542", "228599908939202560", "233248965032804353", "608379884548653068", "763108903201538069", "448796874183540736", "304366314850353154", "762699664184967240", "475986569455599616", "345681524386955265", "235723505604362240", "336458121180610560"];
let swimagefichier = fs.readFileSync("./sw.txt").toString();
let swimages = swimagefichier.split("\n");
let childimagefichier = fs.readFileSync("./child.txt").toString();
let childimages = childimagefichier.split("\n");
var lancement = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username} ! Version: ` + version + " ✅");
    client.user.setPresence({
        activity: {
            name: '$help',
            type: "STREAMING",
            url: "https://www.twitch.tv/efficom_tech_school"
        }
    });
});

// emojis
function emoji(id) {
    return client.emojis.get(id).toString();
}
// reactions
client.on('messageReactionAdd', (reaction, user) => {
    let msg = reaction.message
    let emoji = reaction.emoji;
    msg.react(emoji)
});

client.on('message', msg => {
    if (msg.author.id === client.user.id) return;

    // annonce jules
    if (msg.content.toLowerCase().startsWith("$a")) {
        if (msg.author.id != "697717795227697173") return;
        const arg = msg.content.slice(prefix.length).split(' ');
        ann = ""
        for (let i = 1; i < arg.length; i++) {
            if (i == 1) { ann = ann + arg[i] } else { ann = ann + " " + arg[i] }
        }
        let efficomsalon = client.channels.cache.get("776093234005934111");
        efficomsalon.send(ann);
        return;
    }
    // teams
    if (msg.content.toLowerCase().startsWith("$teams")) {
        msg.delete({timeout:10});
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
                        text: "BIE Version " + version + " | Programmé par Jules ꓶ"
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
                        name: "Une réunion va ou vient de commencer !\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­\n­",
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
                        name: "Une réunion va ou vient de commencer !\n­",
                    },
                    title: "⮞ Rejoindre la réunion ⮜\n­\n­",
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
                    description: "📚 Cours : " + desc +"\n­",
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
    // BUREAU DE JULES
    if(msg.content.toLowerCase().startsWith("$open")) {
        if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") {return msg.reply("vous n'êtes pas autorisé à faire ceci.")}
        let salon = client.channels.cache.get("781439824665116682")
        salon.updateOverwrite(salon.guild.roles.everyone, { CONNECT: true })
        msg.reply("j'ai bien ouvert le bureau de Jules 🔓")
    }
    if(msg.content.toLowerCase().startsWith("$close")) {
        if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") {return msg.reply("vous n'êtes pas autorisé à faire ceci.")}
        let salon = client.channels.cache.get("781439824665116682")
        salon.updateOverwrite(salon.guild.roles.everyone, { CONNECT: false })
        msg.reply("j'ai bien fermé le bureau de Jules 🔒")
    }
    if (msg.content.toLowerCase().startsWith("$j")) {
        msg.channel.send("<@697717795227697173> l'utilisateur <@" + msg.author.id + "> veut rejoindre le salon.\nVous avez 5 minutes pour accepter, refuser, mettre en attente, ou bloquer la demande.").then(msg2 => {
            msg2.react('✅')
            msg2.react('❎');
            msg2.react('🕦');
            msg2.react('⛔');
            msg2.react('📄');
            msg2.awaitReactions((reaction, user) => user.id == "697717795227697173" && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎' || reaction.emoji.name == '🕦' || reaction.emoji.name == '⛔' || reaction.emoji.name == '📄'), { max: 1, time: 300000 }).then(collected => {
                                    if (collected.first().emoji.name == '✅') {
                                            msg.reply("vous avez été accepté. 😎");
                                            membreamoove = client.users.cache.get(msg.author.id);
                                            channelamoove = client.channels.cache.get("781439824665116682")
                                            // membreamoove.voice.setChannel(channelamoove);
                                    } else if (collected.first().emoji.name == '❎') {
                                            msg.reply("vous avez été refusé... 😥");
                                    } else if (collected.first().emoji.name == '🕦') {
                                            msg.reply("vous êtes en attente, contactez <@697717795227697173> pour savoir dans combien de temps il vous acceptera. 🕘");
                                    } else if (collected.first().emoji.name == '⛔') {
                                            msg.reply("vous avez été refusé...");
                                    } else if (collected.first().emoji.name == '📄') {
                                            msg.reply("vous allez être enregistré dans la liste des utilisateurs autorisés constamment. 😊");
                                    }
                        }).catch(() => {msg.reply('malheureusement il vous a ignoré... 😟');});
            })
        // personne = client.users.cache.get(msg.author.id);
        // personne.setVoiceChannel("781439824665116682");
    }

    // jeux
    // pierre feuille ciseau PFC
    if(msg.content.toLowerCase().startsWith("$pfc") || msg.content.toLowerCase().startsWith("$pierrefeuilleciseau")) {
        var finpartie = false;
        var scorejoueur = 0;
        var scorebot = 0;
        // fonctions
        function pfcrandom() {
            switch (Math.floor(Math.random() * 3) + 1) {
                case 1:
                    return "pierre";
                    break;
                case 2:
                    return "feuille";
                    break;
                case 3:
                    return "ciseau";
                    break;
            }
        };
        function scoreactuel() {
            if (scorejoueur == 3 || scorebot == 3) {
                finpartie = true;
            };
            return;
        }
        function pfcjeu() {
            msg.reply("**choississez `pierre` `feuille` ou `ciseau`, entrez votre réponse ci dessous ⤵**")
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 15000 }).then(collected => {
                repjoueur = collected.first().content;
                if (repjoueur.toLowerCase().startsWith("p")) { // si le joueur choisi pierre
                    pfcbot = pfcrandom();
                    if (pfcbot == "pierre") { // pierre contre pierre
                        msg.reply("👊 **contre** 👊, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else if (pfcbot == "feuille") {
                        scorebot ++;
                        msg.reply("👊 **contre** ✋, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else {
                        scorejoueur ++;
                        msg.reply("👊 **contre** 🤞, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    }
                } else if (repjoueur.toLowerCase().startsWith("f")) { // si le joueur choisi feuille
                    pfcbot = pfcrandom()
                    if (pfcbot == "pierre") { // feuille contre pierre
                        scorejoueur ++;
                        msg.reply("✋ **contre** 👊, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else if (pfcbot == "feuille") {
                        msg.reply("✋ **contre** ✋, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else {
                        scorebot ++;
                        msg.reply("✋ **contre** 🤞, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    }
                } else if (repjoueur.toLowerCase().startsWith("c")) { // si le joueur choisi ciseau
                    pfcbot = pfcrandom()
                    if (pfcbot == "pierre") { // ciseau contre pierre
                        scorebot ++;
                        msg.reply("🤞 **contre** 👊, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else if (pfcbot == "feuille") {
                        scorejoueur ++;
                        msg.reply("🤞 **contre** ✋, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    } else {
                        msg.reply("🤞 **contre** 🤞, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
                    }
                } else {scorebot ++; msg.reply("vous avez répondu n'importe quoi donc vous perdez un point...\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");}
                scoreactuel();
                if (finpartie == false) {
                    pfcjeu();
                } else {
                    if (scorejoueur > scorebot) {
                        return msg.channel.send("🏆 **La partie est finie, __vous avez gagné__ <@" + msg.author.id + ">...**");
                    } else if (scorejoueur < scorebot) {
                        return msg.channel.send("😎 **La partie est finie, __vous avez perdu__ <@" + msg.author.id + "> !**");
                    };
                }
            }).catch(() => { msg.reply("vous n'avez pas répondu assez vite, j'annule la partie..."); finpartie = true;});
        };
        pfcjeu();
    }

    // random
    if(msg.content.toLowerCase().startsWith('$chat') || msg.content.toLowerCase().startsWith('$cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.MessageEmbed()
				.setImage(res.body.file)
				return msg.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(err.stack);
		}
    }
    if(msg.content.toLowerCase().startsWith("$sw") || msg.content.toLowerCase().startsWith("$starwars")) {
        let rd = Math.floor(Math.random() * swimages.length);
        const embed = new Discord.MessageEmbed()
        .setImage(swimages[rd])
        return msg.channel.send({embed});
    }
    if(msg.content.toLowerCase().startsWith("$by") || msg.content.toLowerCase().startsWith("$child") || msg.content.toLowerCase().startsWith("$babyyoda")) {
        let rd = Math.floor(Math.random() * childimages.length);
        const embed = new Discord.MessageEmbed()
        .setImage(childimages[rd])
        return msg.channel.send({embed});
    }

    // ping
    if (msg.content.startsWith("$ping")) {
        var ping = Date.now() - msg.createdTimestamp + " ms";
        msg.reply("le ping a duré `" + `${Date.now() - msg.createdTimestamp}` + " ms` !");
        return;
    }

    if (msg.content.toLowerCase().startsWith("$repeat")) {
        msg.delete({ timeout: 100 });
        const arg = msg.content.slice(1).split(' ');
        ann = "";
        for (let i = 1; i < arg.length; i++) {
            if (i === 1) { ann = ann + arg[i] } else { ann = ann + " " + arg[i] }
        }
        let salon = client.channels.cache.get('762698661892849714');
        salon.send("Quelqu'un m'a dit de dire \"" + ann + "\"");
        return;
    }

    if (msg.content.toLowerCase().includes("bie ")) {return msg.channel.send("Quelqu'un m'a appelé ?");};

    // help
    if (msg.content.toLowerCase().startsWith("$aide") || msg.content.toLowerCase().startsWith("$h")) {
        const arg = msg.content.slice(prefix.length).split(' ');
        if (!arg[1]) {
            msg.channel.send({
                embed: {
                    color: 47804,
                    thumbnail: {
                        url: "https://www.efficom.fr/wp-content/themes/efficom-lille/img/presentation_ecole_04_.jpeg"
                    },
                    author: {
                        name: "Commande d'aide",
                        icon_url: msg.author.avatarURL()
                    },
                    title: "Voilà quelques commandes avec leurs significations !\n­",
                    description: "BIE est un robot développé par Jules L en 2020.\n­",
                    fields: [
                    {
                        name: "`$pfc` / `$pierrefeuilleciseau`",
                        value: "Lance une partie de pierre feuille ciseau contre moi ! Vous pouvez répondre `p` `f` ou `c` à la place de pierre feuille ou ciseau... C'est plus rapide !\n­"
                    }, {
                        name: "`$teams [Lien_cliquable/URL_cliquable] [Texte_Horraire_Début] [Texte_Horraire_Fin] [Nom_Du_Cours]`",
                        value: "Mets un message dans le salon <#762698661892849714> pour prévenir d'une réunion sur Teams qui commence. Mettez dans la variable au minimum `link`, le lien de cette réunion. Le nombre de mots dans le nom du cours est limité.\n­"
                    }, {
                        name: "`$help image` / `$help i` / `$h i`",
                        value: "Il y a plusieurs commandes pour générer des images. Grâce à ça vous pourrez avoir leur liste.\n­"
                    }, {
                        name: "`$help admin` / `$help a` / `$h a`",
                        value: "Il y a plusieurs commandes privés aux administrateurs de BIE Bot. Tappez cette commande pour voir la liste des commandes privées."
                    }, {
                        name: "`$repeat [text]`",
                        value: "Répète le texte entré dans la variable `text`. Le message sera obligatoirement renvoyé dans <#762698661892849714>.\n­"
                    }, {
                        name: "`bonjour`, `salut` / `😂`, `😆` etc...",
                        value: "BIE est un robot qui réagit ! Il vous répondera évidemment à sa façon ! :)\n­"
                    }, {
                        name: "`$ping`",
                        value: "Pour avoir le temps de réponse de votre message avec sa réception sur Discord.\n­"
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Demande d'aide réclamé par " + msg.author.tag
                    }
                }
            })
        } else if (arg[1].toLowerCase().startsWith("i")) {
            msg.channel.send({
                embed: {
                    color: 47804,
                    author: {
                        name: "Liste des commandes d'images\n­",
                        icon_url: msg.author.avatarURL()
                    },
                    fields: [
                    {
                        name: "`$sw` / `$StarWars`",
                        value: "Génère des images aléatoires de l'univers Star Wars.\n­"
                    }, {
                        name: "`$by` / `$BabyYoda` / `$child`",
                        value: "Génère une image aléatoire du surnommé \"Bébé Yoda\".\n­"
                    }, {
                        name: "`$chat` / `$cat`",
                        value: "Il y a plusieurs commandes pour générer des images. Grâce à ça vous pourrez avoir leur liste.\n­"
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Demande d'aide réclamé par " + msg.author.tag
                    }
                }
            })
        } else if (arg[1].toLowerCase().startsWith("a")) {
            msg.channel.send({
                embed: {
                    color: 47804,
                    author: {
                        name: "Liste des commandes des administrateurs\n­",
                        icon_url: msg.author.avatarURL()
                    },
                    fields: [
                    {
                        name: "`$open`",
                        value: "Ouvre le bureau de Jules à tout les membres.\n­"
                    }, {
                        name: "`$close`",
                        value: "Ferme le bureau de Jules à tout les membres.\n­"
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "BIE Version " + version + " | Demande d'aide réclamé par " + msg.author.tag
                    }
                }
            })
        }else return msg.reply("je ne reconnais pas cette commande... 😔");
    }

});

client.login(process.env.TOKEN);
