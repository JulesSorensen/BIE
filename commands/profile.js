module.exports = {
    name: 'profile',
    description: 'Information about the arguments provided.',
    args: false,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        // check + cross icon
        let checkIcon = client.emojis.cache.get(`806094704206676019`).toString(); let uncheckIcon = client.emojis.cache.get(`806094704190029856`).toString();
        // getter
        let profile = getca(`profile`);
        let lang = getca(`language`);
        let userLang = lang[msg.author.id];
        // function if url
        function validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(str);
        }
        // print profile
        function printProfile(userid, msg) {
            // xp progression
            var levelTable = [`0-99`, `100-199`, `200-349`, `350-499`, `500-749`, `750-999`, `1000-1499`, `1500-1999`, `2000-2499`, `2500-3999`, `4000-4499`, `4500-4999`, `5000-5499`, `5500-6749`, `6750-7999`, `8000-9499`, `9500-10999`, `11000-12999`, `13000-15499`, `15500-17999`, `18000-20999`, `21000-23999`, `24000-29999`, `30000-34999`, `35000-44999`, `45000-49999`, `50000-6499`, `65000-82499`, `82500-99999`, `100000-149999`, `150000-199999`, `200000-299999`, `300000-499999`, `400000-499999`, `500000-699999`, `700000-899999`, `900000-1999999`, `1100000-1299999`, `1300000-1499999`, `1500000-1999999`, `2000000-24999999`, `2500000-2999999`, `3000000-3999999`, `4000000-4999999`, `5000000-7499999`, `7500000-9999999`, `10000000-19999999`, `20000000-29999999`, `35000000-49999999`, `50000000-1000000000`];
            var levelStatus = `▰▰▰▰▰▰▰▰▰▰`;
            for (i in levelTable) {
                a = levelTable[i].split(`-`);
                if ((profile[userid].experience >= a[0]) && (a[1] >= profile[userid].experience)) {
                    a[0] = parseInt(a[0]);
                    a[1] = parseInt(a[1]);
                    var pourc = (((profile[userid].experience - a[0]) * 100) / (a[1] - a[0]));
                    switch (true) {
                        case (pourc >= 0 && 10 > pourc):
                            levelStatus = `▰▱▱▱▱▱▱▱▱▱`; break;
                        case (pourc >= 10 && 20 > pourc):
                            levelStatus = `▰▰▱▱▱▱▱▱▱▱`; break;
                        case (pourc >= 20 && 30 > pourc):
                            levelStatus = `▰▰▰▱▱▱▱▱▱▱`; break;
                        case (pourc >= 30 && 40 > pourc):
                            levelStatus = `▰▰▰▰▱▱▱▱▱▱`; break;
                        case (pourc >= 40 && 50 > pourc):
                            levelStatus = `▰▰▰▰▰▱▱▱▱▱`; break;
                        case (pourc >= 50 && 60 > pourc):
                            levelStatus = `▰▰▰▰▰▰▱▱▱▱`; break;
                        case (pourc >= 60 && 70 > pourc):
                            levelStatus = `▰▰▰▰▰▰▰▱▱▱`; break;
                        case (pourc >= 70 && 80 > pourc):
                            levelStatus = `▰▰▰▰▰▰▰▰▱▱`; break;
                        case (pourc >= 80 && 90 > pourc):
                            levelStatus = `▰▰▰▰▰▰▰▰▰▱`; break;
                        case (pourc >= 90 && 100 >= pourc):
                            levelStatus = `▰▰▰▰▰▰▰▰▰▰`; break;
                        default:
                            levelStatus = `▰▰▰▰▰▰▰▰▰▰`; break;
                    }
                }
            }
            // languages
            if (lang[userid] == `FR`) {
                var profileMessage = `Profil`; var levelMessage = `Niveau`; var messagesMessage = `Messages`; var clanMessage = `Clan`; var clanName = profile[userid].clan ? profile[userid].clan : `Aucun`;
            } else if (lang[userid] == `NO`) {
                var profileMessage = `Profil`; var levelMessage = `Nivå`; var messagesMessage = `Meldinger`; var clanMessage = `Klan`; var clanName = profile[userid].clan ? profile[userid].clan : `Ingen`;
            } else {
                var profileMessage = `Profile`; var levelMessage = `Level`; var messagesMessage = `Messages`; var clanMessage = `Clan`; var clanName = profile[userid].clan ? profile[userid].clan : `None`;
            }
            // for the clan name
            var userPicture = ((profile[userid].picture) == 'null') ? `https://cdn.discordapp.com/avatars/802976208261218334/4b4d936a9a495fd17a6f32905fa5ffcd.png?size=128` : profile[userid].picture;
            msg.channel.send({
                embed: {
                    color: profile[userid].color,
                    author: {
                        name: `${profile[userid].name} - ${profileMessage}`
                    },
                    thumbnail: { url: userPicture },
                    description: `${profile[userid].description}`,
                    fields: [{
                        name: `${levelMessage}`,
                        value: `${profile[userid].level}`,
                        inline: true
                    }, {
                        name: `${messagesMessage}`,
                        value: `${profile[userid].messages}`,
                        inline: true
                    }, {
                        name: `${clanMessage}`,
                        value: `${clanName}`,
                        inline: true
                    }, {
                        name: `XP`,
                        value: `${levelStatus} | ${profile[userid].experience}`,
                        inline: true
                    }
                    ]
                }
            }).catch(() => { ; });
        }
        if (!args[0]) {
            if (!profile[msg.author.id]) { // new account
                if (userLang == `FR`) return msg.channel.send(`<@${msg.author.id}> votre compte vient d'être crée, tapez la commande à nouveau pour voir votre profil.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`<@${msg.author.id}> kontoen din har nettopp blitt opprettet, skriv inn kommandoen igjen for å se profilen din.`).catch(() => { ; });
                else return msg.channel.send(`<@${msg.author.id}> your account has just been created, type the command again to see your profile.`).catch(() => { ; });
            } else {
                printProfile(msg.author.id, msg); return;
            }

        } else if (args[0].toLowerCase() == `name` || args[0].toLowerCase() == `rename` || args[0].toLowerCase() == `username`) { // name changement
            if (!args[1]) {
                if (userLang == `FR`) return msg.channel.send(`Vous devez mettre votre nouveau nom après la commande <@${msg.author.id}>.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`Du må sette ditt nye navn etter kommandoen <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`You have to put your new name after the command <@${msg.author.id}>.`).catch(() => { ; });
            }
            var userName = ""; for (let i = 1; i < args.length; i++) { if (i == 1) { userName = userName + args[i] } else { userName = userName + " " + args[i] } };
            if (!(15 >= userName.length && 2 <= userName.length) || userName.includes(`­`) || userName.toLowerCase() == (`kick`) || userName.toLowerCase() == (`delete`) || userName.toLowerCase() == (`remove`) || userName.toLowerCase() == (`ban`) || userName.toLowerCase() == (`description`) || userName.toLowerCase() == (`member`) || userName.toLowerCase() == (`members`) || userName.toLowerCase() == (`leaderboard`) || userName.toLowerCase() == (`join`) || userName.toLowerCase() == (`leave`) || userName.toLowerCase() == (`private`) || userName.toLowerCase() == (`public`) || userName.toLowerCase() == (`color`) || userName.toLowerCase() == (`image`) || userName.toLowerCase() == (`picture`) || userName.toLowerCase() == (`name`) || userName.toLowerCase() == (`rename`) || userName.toLowerCase() == (`username`) || userName.toLowerCase() == (`colour`)) {
                if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Ce nom n'est pas autorisé. Pour rappel, il doit avoir entre 2 et 15 caractères <@${msg.author.id}>.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Dette navnet er ikke tillatt. Som en påminnelse må den være på mellom 2 og 15 tegn <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`${uncheckIcon} This name is not allowed. It must be between 2 and 15 characters long. <@${msg.author.id}>.`).catch(() => { ; });
            }
            for (i in profile) {
                if ((profile[i].name).toLowerCase() == userName.toLowerCase()) {
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Quelqu'un s'appelle déjà comme ça <@${msg.author.id}>...`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Noen har allerede dette navnet <@${msg.author.id}>...`).catch(() => { ; });
                    else return msg.channel.send(`${uncheckIcon} Someone already has this name <@${msg.author.id}>...`).catch(() => { ; });
                }
            }
            // if it not finish like discord name #0000
            if ((userName.substr(userName.length - 5) == `#` + userName.substr(userName.length - 4)) && (msg.author.discriminator) != (userName.substr(userName.length - 4))) {
                if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous ne pouvez pas utiliser de pseudonyme de ce genre (avec un #) <@${msg.author.id}>, à part si c'est votre pseudonyme Discord.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du kan ikke bruke et slikt pseudonym (med et #) <@${msg.author.id}>, med mindre det er ditt Discord-pseudonym.`).catch(() => { ; });
                else return msg.channel.send(`${uncheckIcon} You cannot use this name (with a #) <@${msg.author.id}>, unless it is your Discord pseudonym.`).catch(() => { ; });
            }
            // name changement confirmation
            msg.react(`${checkIcon}`).catch(() => { ; });
            msg.react(`${uncheckIcon}`).catch(() => { ; });
            if (userLang == `FR`) msg.channel.send(`Cliquez sur la réaction ${checkIcon} si vous voulez changer de pseudonyme <@${msg.author.id}>.\n**${userName}** sera votre nouveau pseudonyme.\nVous pouvez encore changer de pseudonyme __${profile[msg.author.id].namechangement}__ fois.`).catch(() => { ; });
            else if (userLang == `NO`) msg.channel.send(`Klikk på reaksjonen ${checkIcon} hvis du vil endre navnet ditt <@${msg.author.id}>.\n**${userName}** vil være ditt nye navn.\nDu kan fremdeles endre navnet ditt __${profile[msg.author.id].namechangement}__ ganger til.`).catch(() => { ; });
            else msg.channel.send(`Click on the reaction ${checkIcon} if you want to change your name <@${msg.author.id}>.\n**${userName}** will be your new name.\nYou can still change your name __${profile[msg.author.id].namechangement}__ more times.`).catch(() => { ; });
            // First argument is a filter function
            msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
                { max: 1, time: 15000 }).then(collected => {
                    if (collected.first().emoji.name == `Check`) {
                        if (profile[msg.author.id].name == userName || profile[msg.author.id].namechangement <= 0) return;
                        if (userLang == `FR`) msg.channel.send(`${checkIcon} Vous vous appellez **${userName}** désormais <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) msg.channel.send(`${checkIcon} Ditt navn er nå **${userName}** <@${msg.author.id}>.`).catch(() => { ; });
                        else msg.channel.send(`${checkIcon} Your name is now **${userName}** <@${msg.author.id}>.`).catch(() => { ; });
                        getca(`profilerename`, msg, userName); return;
                    }
                    else
                        if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas changé de pseudonyme <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke endret kallenavnet ditt. <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`${uncheckIcon} You have not changed your name <@${msg.author.id}>.`).catch(() => { ; });
                }).catch(() => {
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas changé de pseudonyme <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke endret kallenavnet ditt. <@${msg.author.id}>.`).catch(() => { ; });
                    else return msg.channel.send(`${uncheckIcon} You have not changed your name <@${msg.author.id}>.`).catch(() => { ; });
                });
        } else if (args[0].toLowerCase() == `picture` || args[0].toLowerCase() == `image`) {  // profile picture
            try {
                if (args[1].toLowerCase() == `reset`) {
                    getca(`profilepicturereset`, msg);
                    if (userLang == `FR`) return msg.channel.send(`${checkIcon} Votre photo a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Bildet ditt er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
                    else return msg.channel.send(`${checkIcon} Your picture has been reset <@${msg.author.id}>.`).catch(() => { ; });
                }
            } catch { ; };
            if (!args[1] || (validURL(args[1]) == false)) {
                if (userLang == `FR`) return msg.channel.send(`Vous devez mettre le lien vers votre image <@${msg.author.id}>.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`Du må sette linken til bildet ditt <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`You must put the link to your image <@${msg.author.id}>.`).catch(() => { ; });
            }
            if (userLang == `FR`) msg.channel.send(`${checkIcon} L'image a bien été mise à jour <@${msg.author.id}> ! La voici :`).catch(() => { ; });
            else if (userLang == `NO`) msg.channel.send(`${checkIcon} Bildet er godt oppdatert <@${msg.author.id}>! Her er det:`).catch(() => { ; });
            else msg.channel.send(`${checkIcon} The image has been well updated <@${msg.author.id}>! Here it is:`).catch(() => { ; });
            msg.channel.send(`${args[1]}`).catch(() => { ; });
            getca(`profilepicture`, msg, args[1]); return;

        } else if (args[0].toLowerCase() == `color` || args[0].toLowerCase() == `colour`) { // profile color
            try { args[1] = (args[1].startsWith(`#`) == true) ? args[1].toString(16) : parseInt(args[1]); } catch { ; };
            if ((!args[1]) || (args[1].length > 8) || args[1] == `NaN`) {
                if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous devez mettre une couleur en code décimal, ou hexadecimal (avec un # devant) <@${msg.author.id}>.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du må sette en farge i desimal kode eller heksadesimal kode (med et # foran) <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`${uncheckIcon} You have to put a color in decimal code, or hexadecimal code (with a # in front) <@${msg.author.id}>.`).catch(() => { ; });
            }
            if (userLang == `FR`) msg.channel.send(`${checkIcon} La couleur de votre profil à bien changé en \`${args[1]}\` <@${msg.author.id}> !`).catch(() => { ; });
            else if (userLang == `NO`) msg.channel.send(`${checkIcon} Fargen på profilen din har endret seg til \`${args[1]}\` <@${msg.author.id}>!`).catch(() => { ; });
            else msg.channel.send(`${checkIcon} The color of your profile has changed into \`${args[1]}\` <@${msg.author.id}>!`).catch(() => { ; });
            getca(`profilecolor`, msg, args[1]); return;

        } else if (args[0].toLowerCase() == `description`) { // profile description
            if (!args[1]) return;
            if (args[1].toLowerCase() == `reset`) {
                getca(`profiledescriptionreset`, msg);
                if (userLang == `FR`) return msg.channel.send(`${checkIcon} Votre description a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
                if (userLang == `NO`) return msg.channel.send(`${checkIcon} Beskrivelsen din er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`${checkIcon} Your description has been reset <@${msg.author.id}>.`).catch(() => { ; });
            }
            var desc = ``;
            for (let i = 1; i < args.length; i++) {
                if (i == 1) { desc = desc + args[i] } else { desc = desc + ` ` + args[i] }
            }
            getca(`profiledescription`, msg, desc);
            if (userLang == `FR`) return msg.channel.send(`${checkIcon} La description \`${desc}\` a bien été ajoutée <@${msg.author.id}> !`).catch(() => { ; });
            if (userLang == `NO`) return msg.channel.send(`${checkIcon} Beskrivelsen \`${desc}\` er lagt til <@${msg.author.id}>!`).catch(() => { ; });
            else return msg.channel.send(`${checkIcon} The description \`${desc}\` has been added <@${msg.author.id}>!`).catch(() => { ; });

        } else { // find profile of a user
            if (args[0].startsWith(`<@`)) {
                args[0] = args[0].slice(2, -1);
                if (args[0].startsWith(`!`)) args[0] = args[0].slice(1);
                if (!profile[args[0]]) { // user is not in DB
                    if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'a pas de profil <@${msg.author.id}>. Si vous voulez voir le votre, tapez simplement \`${prefix}profil\``).catch(() => { ; });
                    if (userLang == `NO`) return msg.channel.send(`Brukeren har ingen profil <@${msg.author.id}>. Hvis du vil se din, skriver du ganske enkelt inn \`${prefix}profil\``).catch(() => { ; });
                    else return msg.channel.send(`The user does not have a profile <@${msg.author.id}>. If you want to see yours, simply type \`${prefix}profile\``).catch(() => { ; });
                } else { // user is in DB
                    printProfile(args[0], msg); return;
                }
            } else {
                var userName = ""; for (let i = 0; i < args.length; i++) { if (i == 0) { userName = userName + args[i] } else { userName = userName + " " + args[i] } };
                for (i in profile) {
                    if ((profile[i].name).toLowerCase() == userName.toLowerCase()) {
                        printProfile(i, msg); return;
                    }
                }
                if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'a pas de profil <@${msg.author.id}>. Si vous voulez voir le votre, tapez simplement \`${prefix}profil\``).catch(() => { ; });
                if (userLang == `NO`) return msg.channel.send(`Brukeren har ingen profil <@${msg.author.id}>. Hvis du vil se din, skriver du ganske enkelt inn \`${prefix}profil\``).catch(() => { ; });
                else return msg.channel.send(`The user does not have a profile <@${msg.author.id}>. If you want to see yours, simply type \`${prefix}profile\``).catch(() => { ; });
            }
        }
    }
};