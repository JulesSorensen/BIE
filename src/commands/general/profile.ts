import { getProfile } from '../../functions/general/profile';

// print profile
const printProfile = async (userid: string, msg: any, client: any) => {
    const lang = {}
    const profile = await getProfile(msg, msg.author.id)
    // xp progression
    var levelTable = [`0-99`, `100-199`, `200-349`, `350-499`, `500-749`, `750-999`, `1000-1499`, `1500-1999`, `2000-2499`, `2500-3999`, `4000-4499`, `4500-4999`, `5000-5499`, `5500-6749`, `6750-7999`, `8000-9499`, `9500-10999`, `11000-12999`, `13000-15499`, `15500-17999`, `18000-20999`, `21000-23999`, `24000-29999`, `30000-34999`, `35000-44999`, `45000-49999`, `50000-6499`, `65000-82499`, `82500-99999`, `100000-149999`, `150000-199999`, `200000-299999`, `300000-499999`, `400000-499999`, `500000-699999`, `700000-899999`, `900000-1999999`, `1100000-1299999`, `1300000-1499999`, `1500000-1999999`, `2000000-24999999`, `2500000-2999999`, `3000000-3499999`, `3500000-3999999`, `4000000-4999999`, `5000000-5999999`, `6000000-6999999`, `7000000-6999999`, `8000000-9999999`, `10000000-100000000000000`];
    var levelStatus = `▰▰▰▰▰▰▰▰▰▰`;
    for (var i in levelTable) {
        var a: Array<any> = levelTable[i].split(`-`);
        if ((profile.experience >= a[0]) && (a[1] >= profile.experience)) {
            a[0] = parseInt(a[0]);
            a[1] = parseInt(a[1]);
            var pourc = (((profile.experience - a[0]) * 100) / (a[1] - a[0]));
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
    // badge
    switch (true) {
        case (profile.level < 20): var badge = client.emojis.cache.get(`842418674861735958`).toString(); break;
        case (profile.level < 30): var badge = client.emojis.cache.get(`842418674476122154`).toString(); break;
        case (profile.level < 35): var badge = client.emojis.cache.get(`842418674840240128`).toString(); break;
        case (profile.level < 40): var badge = client.emojis.cache.get(`842418674744295515`).toString(); break;
        case (profile.level < 45): var badge = client.emojis.cache.get(`842418674828836924`).toString(); break;
        case (profile.level < 50): var badge = client.emojis.cache.get(`842418674483724349`).toString(); break;
        case (profile.level >= 50): var badge = client.emojis.cache.get(`842418674487787552`).toString(); break;
        default: var badge = client.emojis.cache.get(`842418674861735958`).toString(); break;
    }
    // languages
    if (lang[userid] == `FR`) {
        var levelMessage = `Niveau`; var messagesMessage = `Messages`; var clanMessage = `Clan`; var clanName = profile.clan ? profile.clan : `Aucun`;
    } else if (lang[userid] == `NO`) {
        var levelMessage = `Nivå`; var messagesMessage = `Meldinger`; var clanMessage = `Klan`; var clanName = profile.clan ? profile.clan : `Ingen`;
    } else {
        var levelMessage = `Level`; var messagesMessage = `Messages`; var clanMessage = `Clan`; var clanName = profile.clan ? profile.clan : `None`;
    }
    // for the clan name
    if (!client.users.cache.get(userid)) { var userPicture = `https://i.imgur.com/ST5Q7hj.jpg`; } else { userPicture = ((profile.picture) == 'default') ? (client.users.cache.get(userid)).avatarURL({ format: `png`, dynamic: true, size: 128 }) : profile.picture; };
    if (profile.experience >= 1000000) { var expText = Math.floor(profile.experience * 0.000001) + "," + (Math.floor(profile.experience)).toString().substr(-6, 1) + "M"; } else if (profile.experience >= 1000) { var expText = Math.floor(profile.experience * 0.001) + "k"; } else { expText = profile.experience; }
    if (profile.messages >= 1000000) { var msgText = Math.floor(profile.messages * 0.000001) + "," + (Math.floor(profile.messages)).toString().substr(-6, 3) + "M"; } else if (profile.messages >= 1000) { var msgText = Math.floor(profile.messages * 0.001) + "," + (Math.floor(profile.messages)).toString().substr(-3, 1) + "k"; } else { msgText = profile.messages; }
    msg.channel.send({
        embeds: [{
            color: profile.color,
            thumbnail: { url: userPicture },
            description: `${badge} **${profile.name}**\n\n${profile.description}`,
            fields: [{
                name: `${levelMessage}`,
                value: `${profile.level}`,
                inline: true
            }, {
                name: `${messagesMessage}`,
                value: `${msgText}`,
                inline: true
            }, {
                name: `${clanMessage}`,
                value: `${clanName}`,
                inline: true
            }, {
                name: `XP`,
                value: `${levelStatus} | ${expText}`,
                inline: true
            }
            ]
        }]
    }).catch((error) => { console.log("err",error); });
}

module.exports = {
    name: 'profile',
    guildOnly: true,
    execute(msg, args, client, prefix, getca, version) {
        // check + cross icon
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
        // getter
        let profile = {};
        let lang = {};
        let userLang = lang[msg.author.id];
        // bannedNames
        let bannedNames = ["­", "kick", "delete", "create", "owner", "kick", "remove", "ban", "description", "member", "members", "leaderboard", "join", "leave", "private", "public", "color", "image", "picture", "name", "rename", "username", "colour", "aucun", "none", "ingen", "false", "profile", "profil"];
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
        if (!args[0]) {
            printProfile(msg.author.id, msg, client);

            // if (!profile[msg.author.id]) { // new account
            //     if (userLang == `FR`) return msg.channel.send(`<@${msg.author.id}> votre compte vient d'être crée, tapez la commande à nouveau pour voir votre profil.`).catch(() => { ; });
            //     else if (userLang == `NO`) return msg.channel.send(`<@${msg.author.id}> kontoen din har nettopp blitt opprettet, skriv inn kommandoen igjen for å se profilen din.`).catch(() => { ; });
            //     else return msg.channel.send(`<@${msg.author.id}> your account has just been created, type the command again to see your profile.`).catch(() => { ; });
            // } else {
            //     printProfile(msg.author.id, msg); return;
            // }

        }
        // else if (args[0].toLowerCase() == `name` || args[0].toLowerCase() == `rename` || args[0].toLowerCase() == `username` || args[0].toLowerCase() == `n` || args[0].toLowerCase() == `r`) { // name changement
        //     if (!args[1]) {
        //         if (userLang == `FR`) return msg.channel.send(`Vous devez mettre votre nouveau nom après la commande <@${msg.author.id}>.`).catch(() => { ; });
        //         else if (userLang == `NO`) return msg.channel.send(`Du må sette ditt nye navn etter kommandoen <@${msg.author.id}>.`).catch(() => { ; });
        //         else return msg.channel.send(`You have to put your new name after the command <@${msg.author.id}>.`).catch(() => { ; });
        //     }
        //     var userName = ""; for (let i = 1; i < args.length; i++) { if (i == 1) { userName = userName + args[i] } else { userName = userName + " " + args[i] } };
        //     if (!(15 >= userName.length && 3 <= userName.length) || /*clanName.toLowerCase().includes("­") ||*/ bannedNames.includes(userName.toLowerCase())) {
        //         if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Ce nom n'est pas autorisé. Pour rappel, il doit avoir entre 3 et 15 caractères <@${msg.author.id}>.`).catch(() => { ; });
        //         else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Dette navnet er ikke tillatt. Som en påminnelse må den være på mellom 3 og 15 tegn <@${msg.author.id}>.`).catch(() => { ; });
        //         else return msg.channel.send(`${uncheckIcon} This name is not allowed. It must be between 3 and 15 characters long. <@${msg.author.id}>.`).catch(() => { ; });
        //     }
        //     for (var i in profile) {
        //         if ((profile[i].name).toLowerCase() == userName.toLowerCase()) {
        //             if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Quelqu'un s'appelle déjà comme ça <@${msg.author.id}>...`).catch(() => { ; });
        //             else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Noen har allerede dette navnet <@${msg.author.id}>...`).catch(() => { ; });
        //             else return msg.channel.send(`${uncheckIcon} Someone already has this name <@${msg.author.id}>...`).catch(() => { ; });
        //         }
        //     }
        //     // if it not finish like discord name #0000
        //     if ((userName.substr(userName.length - 5) == `#` + userName.substr(userName.length - 4)) && (msg.author.discriminator) != (userName.substr(userName.length - 4))) {
        //         if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous ne pouvez pas utiliser de pseudonyme de ce genre (avec un #) <@${msg.author.id}>, à part si c'est votre pseudonyme Discord.`).catch(() => { ; });
        //         else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du kan ikke bruke et slikt pseudonym (med et #) <@${msg.author.id}>, med mindre det er ditt Discord-pseudonym.`).catch(() => { ; });
        //         else return msg.channel.send(`${uncheckIcon} You cannot use this name (with a #) <@${msg.author.id}>, unless it is your Discord pseudonym.`).catch(() => { ; });
        //     }
        //     // name changement confirmation
        //     msg.react(`${checkIcon}`).catch(() => { ; });
        //     msg.react(`${uncheckIcon}`).catch(() => { ; });
        //     if (userLang == `FR`) msg.channel.send(`Cliquez sur la réaction ${checkIcon} si vous voulez changer de pseudonyme <@${msg.author.id}>.\n**${userName}** sera votre nouveau pseudonyme.\nVous pouvez encore changer de pseudonyme __${profile[msg.author.id].namechangement}__ fois.`).catch(() => { ; });
        //     else if (userLang == `NO`) msg.channel.send(`Klikk på reaksjonen ${checkIcon} hvis du vil endre navnet ditt <@${msg.author.id}>.\n**${userName}** vil være ditt nye navn.\nDu kan fremdeles endre navnet ditt __${profile[msg.author.id].namechangement}__ ganger til.`).catch(() => { ; });
        //     else msg.channel.send(`Click on the reaction ${checkIcon} if you want to change your name <@${msg.author.id}>.\n**${userName}** will be your new name.\nYou can still change your name __${profile[msg.author.id].namechangement}__ more times.`).catch(() => { ; });
        //     // First argument is a filter function
        //     msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
        //         { max: 1, time: 15000 }).then(collected => {
        //             if (collected.first().emoji.name == `Check`) {
        //                 if (profile[msg.author.id].name == userName || profile[msg.author.id].namechangement <= 0) return;
        //                 if (userLang == `FR`) msg.channel.send(`${checkIcon} Vous vous appellez **${userName}** désormais <@${msg.author.id}>.`).catch(() => { ; });
        //                 else if (userLang == `NO`) msg.channel.send(`${checkIcon} Ditt navn er nå **${userName}** <@${msg.author.id}>.`).catch(() => { ; });
        //                 else msg.channel.send(`${checkIcon} Your name is now **${userName}** <@${msg.author.id}>.`).catch(() => { ; });
        //                 getca(`profilerename`, msg, userName); return;
        //             }
        //             else
        //                 if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas changé de pseudonyme <@${msg.author.id}>.`).catch(() => { ; });
        //                 else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke endret kallenavnet ditt. <@${msg.author.id}>.`).catch(() => { ; });
        //                 else return msg.channel.send(`${uncheckIcon} You have not changed your name <@${msg.author.id}>.`).catch(() => { ; });
        //         }).catch(() => {
        //             if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas changé de pseudonyme <@${msg.author.id}>.`).catch(() => { ; });
        //             else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke endret kallenavnet ditt. <@${msg.author.id}>.`).catch(() => { ; });
        //             else return msg.channel.send(`${uncheckIcon} You have not changed your name <@${msg.author.id}>.`).catch(() => { ; });
        //         });
        // } else if (args[0].toLowerCase() == `picture` || args[0].toLowerCase() == `image` || args[0].toLowerCase() == `p` || args[0].toLowerCase() == `i`) {  // profile picture
        //     try {
        //         if (args[1].toLowerCase() == `reset`) {
        //             getca(`profilepicturereset`, msg);
        //             if (userLang == `FR`) return msg.channel.send(`${checkIcon} Votre photo a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
        //             else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Bildet ditt er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
        //             else return msg.channel.send(`${checkIcon} Your picture has been reset <@${msg.author.id}>.`).catch(() => { ; });
        //         }
        //     } catch { ; };
        //     if (!args[1] || (validURL(args[1]) == false)) {
        //         if (userLang == `FR`) return msg.channel.send(`Vous devez mettre le lien vers votre image <@${msg.author.id}>.`).catch(() => { ; });
        //         else if (userLang == `NO`) return msg.channel.send(`Du må sette linken til bildet ditt <@${msg.author.id}>.`).catch(() => { ; });
        //         else return msg.channel.send(`You must put the link to your image <@${msg.author.id}>.`).catch(() => { ; });
        //     }
        //     if (userLang == `FR`) msg.channel.send(`${checkIcon} L'image a bien été mise à jour <@${msg.author.id}> ! La voici :`).catch(() => { ; });
        //     else if (userLang == `NO`) msg.channel.send(`${checkIcon} Bildet er godt oppdatert <@${msg.author.id}>! Her er det:`).catch(() => { ; });
        //     else msg.channel.send(`${checkIcon} The image has been well updated <@${msg.author.id}>! Here it is:`).catch(() => { ; });
        //     msg.channel.send(`${args[1]}`).catch(() => { ; });
        //     getca(`profilepicture`, msg, args[1]); return;

        // } else if (args[0].toLowerCase() == `color` || args[0].toLowerCase() == `colour` || args[0].toLowerCase() == `c`) { // profile color
        //     try { args[1] = (args[1].startsWith(`#`) == true) ? args[1].toString(16) : parseInt(args[1]); } catch { ; };
        //     if ((!args[1]) || (args[1].length > 8) || args[1] == `NaN`) {
        //         if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous devez mettre une couleur en code décimal, ou hexadecimal (avec un # devant) <@${msg.author.id}>.`).catch(() => { ; });
        //         else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du må sette en farge i desimal kode eller heksadesimal kode (med et # foran) <@${msg.author.id}>.`).catch(() => { ; });
        //         else return msg.channel.send(`${uncheckIcon} You have to put a color in decimal code, or hexadecimal code (with a # in front) <@${msg.author.id}>.`).catch(() => { ; });
        //     }
        //     if (userLang == `FR`) msg.channel.send(`${checkIcon} La couleur de votre profil à bien changé en \`${args[1]}\` <@${msg.author.id}> !`).catch(() => { ; });
        //     else if (userLang == `NO`) msg.channel.send(`${checkIcon} Fargen på profilen din har endret seg til \`${args[1]}\` <@${msg.author.id}>!`).catch(() => { ; });
        //     else msg.channel.send(`${checkIcon} The color of your profile has changed into \`${args[1]}\` <@${msg.author.id}>!`).catch(() => { ; });
        //     getca(`profilecolor`, msg, args[1]); return;

        // } else if (args[0].toLowerCase() == `description` || args[0].toLowerCase() == `d`) { // profile description
        //     if (!args[1]) return;
        //     if (args[1].toLowerCase() == `reset`) {
        //         getca(`profiledescriptionreset`, msg);
        //         if (userLang == `FR`) return msg.channel.send(`${checkIcon} Votre description a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
        //         if (userLang == `NO`) return msg.channel.send(`${checkIcon} Beskrivelsen din er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
        //         else return msg.channel.send(`${checkIcon} Your description has been reset <@${msg.author.id}>.`).catch(() => { ; });
        //     }
        //     var desc = ``;
        //     for (let i = 1; i < args.length; i++) {
        //         if (i == 1) { desc = desc + args[i] } else { desc = desc + ` ` + args[i] }
        //     }
        //     getca(`profiledescription`, msg, desc);
        //     if (userLang == `FR`) return msg.channel.send(`${checkIcon} La description \`${desc}\` a bien été ajoutée <@${msg.author.id}> !`).catch(() => { ; });
        //     if (userLang == `NO`) return msg.channel.send(`${checkIcon} Beskrivelsen \`${desc}\` er lagt til <@${msg.author.id}>!`).catch(() => { ; });
        //     else return msg.channel.send(`${checkIcon} The description \`${desc}\` has been added <@${msg.author.id}>!`).catch(() => { ; });

        // } else { // find profile of a user
        //     if (args[0].startsWith(`<@`)) {
        //         args[0] = args[0].slice(2, -1);
        //         if (args[0].startsWith(`!`)) args[0] = args[0].slice(1);
        //         if (!profile[args[0]]) { // user is not in DB
        //             if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'a pas de profil <@${msg.author.id}>. Si vous voulez voir le votre, tapez simplement \`${prefix}profil\``).catch(() => { ; });
        //             if (userLang == `NO`) return msg.channel.send(`Brukeren har ingen profil <@${msg.author.id}>. Hvis du vil se din, skriver du ganske enkelt inn \`${prefix}profil\``).catch(() => { ; });
        //             else return msg.channel.send(`The user does not have a profile <@${msg.author.id}>. If you want to see yours, simply type \`${prefix}profile\``).catch(() => { ; });
        //         } else { // user is in DB
        //             printProfile(args[0], msg); return;
        //         }
        //     } else {
        //         var userName = ""; for (let i = 0; i < args.length; i++) { if (i == 0) { userName = userName + args[i] } else { userName = userName + " " + args[i] } };
        //         for (var i in profile) {
        //             if ((profile[i].name).toLowerCase() == userName.toLowerCase()) {
        //                 printProfile(i, msg); return;
        //             }
        //         }
        //         if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'a pas de profil <@${msg.author.id}>. Si vous voulez voir le votre, tapez simplement \`${prefix}profil\``).catch(() => { ; });
        //         if (userLang == `NO`) return msg.channel.send(`Brukeren har ingen profil <@${msg.author.id}>. Hvis du vil se din, skriver du ganske enkelt inn \`${prefix}profil\``).catch(() => { ; });
        //         else return msg.channel.send(`The user does not have a profile <@${msg.author.id}>. If you want to see yours, simply type \`${prefix}profile\``).catch(() => { ; });
        //     }
        // }
    }
};