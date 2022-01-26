// const start = Date.now();
// // import * as fs from "fs";
// import Discord from 'discord.js';
// // @ts-ignore
// import config from './src/config/config.json';
// import sha1 from 'sha1';
// let prefix = config.prefix;
// let version = "2.1.0";
// require('dotenv').config()

// require('discord-reply');
// import moment from 'moment';
// const client: any = new Discord.Client({ intents: null });
// client.commands = new Discord.Collection();
// import disbut from 'discord-buttons';
// disbut(client);
// import { MessageMenuOption, MessageMenu } from 'discord-buttons';
// import fetch from 'node-fetch';

// // DATA BASE
// let customprefix = require('./data/prefix.json');
// let lang = require('./data/lang.json');
// let profile = require('./data/profile.json');
// let clan = require('./data/clan.json');
// let notification = require('./data/notification.json');
// let guildnotification = require('./data/guildnotification.json');
// let guildmessage = require('./data/guildmessage.json');
// let customrole = require('./data/customrole.json');
// let servperm = require('./data/servperm.json');
// let reminder = require('./data/reminder.json');
// let gpname = require('./data/gpname.json');
// // efficom
// let edt = require('./data/edt.json');
// let edtremind = require('./data/edtremind.json');
// let devoir = require('./data/devoir.json');

// function gameverify() {
//     fetch('https://www.gamerpower.com/api/giveaways?platform=pc').then(res => res.json()).then(json => {
//         var tab = [];
//         var stop = false;
//         var firstName = false;
//         json.forEach((item) => {
//             if (!firstName) { firstName = sha1(item.title); }
//             if (!stop) {
//                 if (sha1(item.title) == gpname['name']) {
//                     stop = true;
//                 } else tab.push(item);
//             }
//         });
//         tab = tab.reverse();
//         gpname['name'] = firstName; fs.writeFile(`./data/gpname.json`, JSON.stringify(gpname), err => { if (err) throw err; });
//         let channelForGames = client.channels.cache.get("840106181661163522");
//         tab.forEach((item, index) => {
//             var enddate = item.end_date == `N/A` ? `Unknown` : `${((item.end_date).split(' '))[0]}\n${((item.end_date).split(' '))[1]}`;
//             var oldprice = item.worth == `N/A` ? `­` : `~~${item.worth}~~`;
//             channelForGames.send(`@ FREE GAME`, {
//                 embed: {
//                     color: 5794282,
//                     thumbnail: {
//                         url: `${item.image}`
//                     },
//                     author: {
//                         name: `New ${item.type}\n`
//                     },
//                     title: `⇒ ${item.title} ⇐\n`,
//                     url: item.open_giveaway,
//                     description: `On ${item.platforms}\n${item.description}\n`,
//                     fields: [{
//                         name: `💰  ­  Price  ­  💰`,
//                         value: `FREE!\n${oldprice}`,
//                         inline: true
//                     }, {
//                         name: `🕛  ­  End  ­  🕛`,
//                         value: enddate,
//                         inline: true
//                     }],
//                     footer: {
//                         text: `Free Games Notifications By Nekewo#0001`
//                     }
//                 }
//             }).then(msgb => { msgb.crosspost().catch(() => { ; }); }).catch(() => { ; });
//         });
//     }).catch(() => { ; });
// }



// pareil qu'au dessus sauf que c'est pour le serveur Efficom
function edtremindfunction() {
    
}


// client.on('ready', () => {
//     console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + ` ✅\n-----\n`);
//     client.user.setPresence({
//         activity: {
//             name: '&help',
//             type: `WATCHING`
//         }
//     });
//     setInterval(function () {
//         // gameverify(); // not stable
//         edtremindfunction();
//         reminderCheck();
//     }, 55000);
// });

// read / set commands files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

fs.readdir(`./commands/`, (error, files) => {
    if (error) { return console.log(`Error while trying to get the commmands.`); };
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });
});

// for get something here inside a command file
function getca(thing, msg, arg1, arg2, arg3) {
    switch (thing) {
        case `changeprefix`:
            changePrefix(arg1, msg); break;
        case `changelanguage`:
            changeLanguage(arg1, msg); break;
        case `createclan`:
            createClan(arg1, msg); break;
        case `clandescription`:
            clanDescription(arg1, arg2, msg); break;
        case `clandescriptionreset`:
            clanDescriptionReset(msg); break;
        case `clandelete`:
            clanDelete(arg1, msg); break;
        case `clanleave`:
            clanLeave(msg); break;
        case `clanjoin`:
            clanJoin(arg1, msg); break;
        case `clankick`:
            clanKick(msg, arg1); break;
        case `clanpublic`:
            clanPublic(arg1, msg); break;
        case `clanprivate`:
            clanPrivate(arg1, msg); break;
        case `clancolor`:
            clanColor(arg1, arg2, msg); break;
        case `clanpicture`:
            clanPicture(arg1, arg2, msg); break;
        case `clanpicturereset`:
            clanPictureReset(arg1); break;
        case `claninvite`:
            clanInvite(arg1, arg2, msg); break;
        case `profilecolor`:
            profileColor(msg, arg1); break;
        case `profilepicture`:
            profilePicture(msg, arg1); break;
        case `profilepicturereset`:
            profilePictureReset(msg); break;
        case `profiledescription`:
            profileDescription(msg, arg1); break;
        case `profiledescriptionreset`:
            profileDescriptionReset(msg); break;
        case `profilerename`:
            profileRename(msg, arg1); break;
        case `notificationoff`:
            notificationOff(msg); break;
        case `notificationon`:
            notificationOn(msg); break;
        case `guildnotificationoff`:
            guildNotificationOff(msg); break;
        case `guildnotificationon`:
            guildNotificationOn(msg); break;
        case `rolecreateuser`:
            roleCreateUser(msg, arg1); break;
        case `roleadduser`:
            roleAddUser(msg, arg1); break;
        case `roleeditname`:
            roleEditName(msg, arg1, arg2); break;
        case `roleeditcolor`:
            roleEditColor(msg, arg1, arg2); break;
        case `roleon`:
            roleOn(msg); break;
        case `roleoff`:
            roleOff(msg); break;
        case `rolepos`:
            rolePosition(msg, arg1); break;
        case `roledelete`:
            roleDelete(msg, arg1); break;
        case `reminderadd`:
            reminderAdd(msg, arg1); break;
        case `reminderlist`:
            reminderList(msg); break;
        case `reminderdelete`:
            reminderDelete(msg, arg1); break;
        case `edtreset`:
            edtReset(msg); break;
        case `edtadd`:
            edtAdd(msg, arg1, arg2, arg3); break;
        case `edtremindadd`:
            edtRemindAdd(msg, arg1, arg2); break;
        case `edtremindshow`:
            edtRemindShow(msg); break;
        case `edtremindreset`:
            edtRemindReset(msg); break;
        case `devoiradd`:
            devoirAdd(msg, arg1, arg2, arg3); break;
        case `devoirdelete`:
            devoirDelete(msg, arg1, arg2); break;
        case `notification`:
            return notification;
        case `guildnotification`:
            return guildnotification;
        case `language`:
            return lang;
        case `customprefix`:
            return customprefix;
        case `profile`:
            return profile;
        case `clan`:
            return clan;
        case `guildmessage`:
            return guildmessage;
        case `customrole`:
            return customrole;
        case `servperm`:
            return servperm;
        case `edt`:
            return edt;
        case `edtremind`:
            return edtremind;
        case `devoir`:
            return devoir;
        default:
            break;
    }
}







// private menu Efficom
client.on('clickMenu', async (menu) => {
    let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
    if (menu.message.channel.id != `868524232898908190` && menu.message.channel.id != `874251750092206081`) return;
    if (menu.values[0] == `edt1`) {
        function getPreviousMonday() {
            var date = new Date();
            var day = date.getDay();
            var prevMonday = new Date();
            if (date.getDay() == 0) {
                prevMonday.setDate(date.getDate() - 6);
            } else {
                prevMonday.setDate(date.getDate() - (day - 1));
            }
            return prevMonday;
        }
        var datesplit = (getPreviousMonday().toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
        if (!edt[datefinale]) {
            menu.clicker.user.send(`🗓️ **__Erreur lors de la réception de l'emploi du temps__** ${searchIcon}\nVous le recevrez dès qu'il sera chargé, merci de ne pas générer à nouveau la commande`).catch(() => { ; });
            return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${menu.clicker.user.id}> attend l'EDT 1MP ${searchIcon}...\n\`&edt sendmp ${datefinale} ${menu.clicker.user.id}\``).catch(() => { ; });
        } else {
            if (edt[datefinale].desc == 0) {
                menu.clicker.user.send(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**`, { files: [edt[datefinale].link] }).catch(() => { ; });
            } else {
                menu.clicker.user.send(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**\n**Détails:**\n${edt[datefinale].desc}`, { files: [edt[datefinale].link] }).catch(() => { ; });
            }
            (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  sent to ${menu.clicker.user.username}`).catch(() => { ; });
        }
        return await menu.reply.defer().catch(() => { ; });
    }
    if (menu.values[0] == `edt2`) {
        var nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + 1);
        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
        var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
        if (!edt[datefinale]) {
            (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${menu.clicker.user.id}> attend l'EDT-2MP ${searchIcon}...\n\`&edt sendmp ${datefinale} ${menu.clicker.user.id} 2\``).catch(() => { ; });
            menu.clicker.user.send(`🗓️ **__Erreur lors de la réception de l'emploi du temps__** ${searchIcon}\nVous le recevrez dès qu'il sera chargé, merci de ne pas générer à nouveau la commande`).catch(() => { ; });
        } else {
            if (edt[datefinale].desc == 0) {
                menu.clicker.user.send(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**`, { files: [edt[datefinale].link] }).catch(() => { ; });
            } else {
                menu.clicker.user.send(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**\n**Détails:**\n${edt[datefinale].desc}`, { files: [edt[datefinale].link] }).catch(() => { ; });
            }
            (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 sent to ${menu.clicker.user.username}`).catch(() => { ; });
        }
        return await menu.reply.defer().catch(() => { ; });
    }
    if (menu.values[0] == `devoir`) {
        var today = moment(new Date(), 'DD/MM/YYYY');
        var devoirs = [];
        for (const [key, value] of Object.entries(devoir)) {
            if (moment(key, 'DD/MM/YYYY') >= today) {
                for (const [key2, value2] of Object.entries(value)) {
                    devoirs.push({ name: `${moment(key, 'DD/MM/YYYY').format('DD/MM/YYYY')} - ${key2.split(/(?=[A-Z])/).join(` `)}`, value: value2 });
                }
            }
        }
        let isS = ''; let isS2 = 'le prochain devoir';
        if (devoirs.length < 1) {
            return menu.clicker.user.send(`<@${menu.clicker.user.id}> c'est incroyable, il n'y a même pas de devoirs !`).catch(() => { ; });
        } else if (devoirs.length > 1) {
            isS = 's'; isS2 = 'la liste des prochains devoirs';
        }
        menu.clicker.user.send({
            embed: {
                color: 14261890,
                title: `📔 Devoir${isS} à venir`,
                description: `Voici ${isS2}, les anciens n'y apparaissent plus\n­`,
                fields: devoirs
            }
        }).catch(() => { ; });
        return await menu.reply.defer().catch(() => { ; });
    }
    if (menu.values[0] == `reload`) {
        await menu.reply.defer().catch(() => { ; });
        return (client.channels.cache.get(`874251822045487125`)).send(`🔃 EDT reloaded by ${menu.clicker.user.username}`).catch(() => { ; });
    }
});

// on message = commands let's find the command file
// ici reposait commandLaunch()


// XP SystemUp Message
// Cooldown
const userCooldown = new Set();
// Level 
function levelUpMessage(msg, level) {
    const levelUpEmote = client.emojis.cache.get(`868850243754688523`).toString();
    var levelUpClanXp = ((Math.floor(Math.random() * (300 - 150 + 1)) + 150) * level);
    var messageClan = profile[msg.author.id].clan ? `${profile[msg.author.id].clan} +${levelUpClanXp} XP` : `Aucun`;
    if (profile[msg.author.id].clan != false) {
        clan[profile[msg.author.id].clan].membersexperience[(clan[profile[msg.author.id].clan].members).indexOf(msg.author.id)] += levelUpClanXp; clan[profile[msg.author.id].clan].experience += levelUpClanXp; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    }
    var userPicture = ((profile[msg.author.id].picture) == 'default') ? (msg.author.avatarURL({ format: `png`, dynamic: true, size: 128 })) : profile[msg.author.id].picture;
    if (notification[msg.author.id] == `on`) { // notification message
        msg.author.send({
            embed: {
                color: profile[msg.author.id].color,
                thumbnail: { url: userPicture },
                title: `**${level}** ${levelUpEmote} ${profile[msg.author.id].name}`,
                fields: [{
                    name: `Clan`,
                    value: messageClan
                }
                ]
            }
        }).catch(() => { ; });
    } else { ; }
    if (guildnotification[msg.guild.id] == `on`) {
        msg.react(levelUpEmote).catch(() => { ; });
    } else return;
}

function clanLevelUpMessage(name, msg, level) {
    const levelUpEmote = client.emojis.cache.get(`868850243754688523`).toString();
    // xp boost
    switch (level) {
        case 1: var xpBoost = "× 1.1"; break;
        case 2: var xpBoost = "× 1.2"; break;
        case 3: var xpBoost = "× 1.3"; break;
        case 4: var xpBoost = "× 1.4"; break;
        case 5: var xpBoost = "× 1.5"; break;
        case 6: var xpBoost = "× 1.6"; break;
        case 7: var xpBoost = "× 1.7"; break;
        case 8: var xpBoost = "× 1.8"; break;
        case 9: var xpBoost = "× 1.9"; break;
        case 10: var xpBoost = "× 2.0"; break;
        default: var xpBoost = "× ?.?"; break;
    }
    for (var j in clan[name].members) {
        var userToPM = client.users.cache.get(((clan[name].members)[j]).toString());
        if (userToPM) {
            if (notification[((clan[name].members)[j]).toString()] == `on`) { // notification message
                userToPM.send({
                    embed: {
                        color: clan[name].color,
                        thumbnail: { url: clan[name].picture },
                        title: `**${level}** ${levelUpEmote} ${name}`,
                        fields: [{
                            name: `XP Boost`,
                            value: xpBoost
                        }
                        ]
                    }
                }).catch(() => { ; });
            }
        }
    }
}

client.on('message', msg => {
    if (msg.author.bot) return; if (msg.content.length <= 1) return;
    commandLaunch(msg);
    if (msg.channel.type == `dm`) return;
    if (!userCooldown.has(msg.author.id)) {
        // guild
        if (!guildmessage[msg.guild.id]) {
            // add the guild
            guildmessage[msg.guild.id] = {
                members: [msg.author.id],
                messages: [1]
            }; fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        } else if (!(guildmessage[msg.guild.id].members).includes(msg.author.id)) {
            // add the user
            (guildmessage[msg.guild.id].messages).push(1); (guildmessage[msg.guild.id].members).push(msg.author.id); fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        } else {
            // add 1 message to the user
            guildmessage[msg.guild.id].messages[(guildmessage[msg.guild.id].members).indexOf(msg.author.id)] += 1; fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        }
        var xpWon = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
        // verify if author has a account
        if (!profile[msg.author.id]) {
            // random color
            var randomColor = (('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)).toString())
            // create account
            profile[msg.author.id] = {
                version: "2.0",
                experience: xpWon,
                level: 1,
                name: `${msg.author.username}#${msg.author.discriminator}`,
                namechangement: 6,
                color: randomColor,
                picture: `default`,
                description: "",
                messages: 1,
                banned: [],
                status: true,
                clan: false
            }; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
        } else {
            // if user have a clan
            if (profile[msg.author.id].clan != false) {
                // add message to clan
                clan[profile[msg.author.id].clan].messages += 1;
                // add xp to clan
                clan[profile[msg.author.id].clan].experience += xpWon; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
                clan[profile[msg.author.id].clan].membersexperience[(clan[profile[msg.author.id].clan].members).indexOf(msg.author.id)] += xpWon; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
                // update clan level
                var levelTableClan = [`0-19999`, `20000-99999`, `100000-499999`, `500000-999999`, `1000000-1499999`, `1500000-2499999`, `2500000-4999999`, `5000000-9999999`, `10000000-49999999`, `50000000-10000000000`];
                if ((clan[profile[msg.author.id].clan].experience) >= 20000) {
                    for (var i in levelTableClan) {
                        var a: any = levelTableClan[i].split(`-`); // a[0] a[1]
                        a[0] = parseInt(a[0]); a[1] = parseInt(a[1]);
                        if ((a[1] > (clan[profile[msg.author.id].clan].experience)) && ((clan[profile[msg.author.id].clan].experience) > a[0])) {
                            var j: number = parseInt(i);
                            if ((clan[profile[msg.author.id].clan].level) != (j + 1)) {
                                clanLevelUpMessage(profile[msg.author.id].clan, msg, (j + 1));
                                clan[profile[msg.author.id].clan].level = (j + 1); clan[profile[msg.author.id].clan].membersnblimit += 5; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
                            }; break;
                        }
                    }
                }
                switch (clan[profile[msg.author.id].clan].level) {
                    case 1: xpWon = xpWon * 1.1; break;
                    case 2: xpWon = xpWon * 1.2; break;
                    case 3: xpWon = xpWon * 1.3; break;
                    case 4: xpWon = xpWon * 1.4; break;
                    case 5: xpWon = xpWon * 1.5; break;
                    case 6: xpWon = xpWon * 1.6; break;
                    case 7: xpWon = xpWon * 1.7; break;
                    case 8: xpWon = xpWon * 1.8; break;
                    case 9: xpWon = xpWon * 1.9; break;
                    case 10: xpWon = xpWon * 2.0; break;
                    default: break;
                }
                xpWon = Math.round(xpWon);
            }
            // add xp
            profile[msg.author.id].experience += xpWon;
            fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
            // add message to profile
            profile[msg.author.id].messages += 1;
            // update level
            var levelTable = [`0-99`, `100-199`, `200-349`, `350-499`, `500-749`, `750-999`, `1000-1499`, `1500-1999`, `2000-2499`, `2500-3999`, `4000-4499`, `4500-4999`, `5000-5499`, `5500-6749`, `6750-7999`, `8000-9499`, `9500-10999`, `11000-12999`, `13000-15499`, `15500-17999`, `18000-20999`, `21000-23999`, `24000-29999`, `30000-34999`, `35000-44999`, `45000-49999`, `50000-6499`, `65000-82499`, `82500-99999`, `100000-149999`, `150000-199999`, `200000-299999`, `300000-499999`, `400000-499999`, `500000-699999`, `700000-899999`, `900000-1999999`, `1100000-1299999`, `1300000-1499999`, `1500000-1999999`, `2000000-24999999`, `2500000-2999999`, `3000000-3499999`, `3500000-3999999`, `4000000-4999999`, `5000000-5999999`, `6000000-6999999`, `7000000-6999999`, `8000000-9999999`, `10000000-100000000000000`];
            //                  1         2          3          4          5         6           7            8            9             10          11             12           13          14           15           16           17            18              19            20             21             22              23             24             25             26             27           28             29               30               31               32              33               34                35               36               37                 38                39                  40                 41                   42                43                44                 45                 46                47                  48                  49                  50
            for (var i in levelTable) {
                a = levelTable[i].split(`-`); // a[0] a[1]
                a[0] = parseInt(a[0]); a[1] = parseInt(a[1]);
                if ((a[1] > (profile[msg.author.id].experience)) && ((profile[msg.author.id].experience) > a[0])) {
                    var j: number = parseInt(i); if (profile[msg.author.id].level != (j + 1)) { levelUpMessage(msg, (j + 1)); profile[msg.author.id].level = (j + 1); fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; }); } break;
                }
            }
        }
        userCooldown.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set
            userCooldown.delete(msg.author.id);
        }, 2500);
    }
});

// login
client.login(process.env.TOKEN);