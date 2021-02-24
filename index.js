const fs = require('fs');
const Discord = require(`discord.js`);
const { Attachement } = require(`discord.js`);
const config = require(`./config/config.json`);
let prefix = config.prefix;
let version = "1.1.0";

// website
const express = require('express'); const app = express(); const port = 3000; app.get('/', (req, res) => res.send('✅ Glede Version ' + version + ` !`)); app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// DATA BASE
let customprefix = require(`./data/prefix.json`);
let lang = require(`./data/lang.json`);
let profile = require(`./data/profile.json`);
let clan = require(`./data/clan.json`);
let notification = require(`./data/notification.json`);
let guildnotification = require(`./data/guildnotification.json`);
let guildmessage = require(`./data/guildmessage.json`);

client.on('ready', () => {
    console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + ` ✅\n-----`);
    client.user.setPresence({
        activity: {
            name: '&help',
            type: `WATCHING`
        }
    });
});

// read / set commands files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

fs.readdir(`./commands/`, (error, files) => {
    if (error) { return console.log(`Error while trying to get the commmands.`); };
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });
});

// user mention
function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

// for get something here inside a command file
function getca(thing, msg, arg1, arg2, arg3) {
    switch (thing) {
        case `changeprefix`:
            changeprefix(arg1, msg); break;
        case `changelanguage`:
            changelanguage(arg1, msg); break;
        case `createclan`:
            createclan(arg1, msg); break;
        case `clandescription`:
            clandescription(arg1, arg2, msg); break;
        case `clandescriptionreset`:
            clandescriptionreset(msg); break;
        case `clandelete`:
            clandelete(arg1, msg); break;
        case `clanleave`:
            clanleave(msg); break;
        case `clanjoin`:
            clanjoin(arg1, msg); break;
        case `clankick`:
            clankick(msg, arg1); break;
        case `clanpublic`:
            clanpublic(arg1, msg); break;
        case `clanprivate`:
            clanprivate(arg1, msg); break;
        case `clancolor`:
            clancolor(arg1, arg2, msg); break;
        case `clanpicture`:
            clanpicture(arg1, arg2, msg); break;
        case `clanpicturereset`:
            clanpicturereset(arg1); break;
        case `claninvite`:
            claninvite(arg1, arg2, msg); break;
        case `profilecolor`:
            profilecolor(msg, arg1); break;
        case `profilepicture`:
            profilepicture(msg, arg1); break;
        case `profilepicturereset`:
            profilepicturereset(msg); break;
        case `profiledescription`:
            profiledescription(msg, arg1); break;
        case `profiledescriptionreset`:
            profiledescriptionreset(msg); break;
        case `profilerename`:
            profilerename(msg, arg1); break;
        case `notificationoff`:
            notificationoff(msg); break;
        case `notificationon`:
            notificationon(msg); break;
        case `guildnotificationoff`:
            guildnotificationoff(msg); break;
        case `guildnotificationon`:
            guildnotificationon(msg); break;
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
        default:
            break;
    }
}
// functions for edit json files | data base
function changeprefix(pref, msg) { // prefix
    customprefix[msg.guild.id] = pref
    fs.writeFile(`./data/prefix.json`, JSON.stringify(customprefix), err => {
        if (err) throw err;
    });
}
function changelanguage(language, msg) { // languages
    lang[msg.author.id] = language
    fs.writeFile(`./data/lang.json`, JSON.stringify(lang), err => {
        if (err) throw err;
    });
}
function createclan(name, msg) { // clans
    // create clan
    clan[name] = {
        version: "1.1.0",
        owner: msg.author.id,
        picture: false,
        members: [msg.author.id],
        membersexperience: [0],
        status: true,
        membersnb: 1,
        membersnblimit: 5,
        description: ``,
        picture: `https://i.imgur.com/7jUvHRY.png`,
        color: 0,
        level: 1,
        messages: 1,
        experience: 0
    }; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    // user in the clan
    profile[msg.author.id].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clandescription(desc, name, msg) {
    clan[name].description = desc; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function clandescriptionreset(msg) {
    clan[profile[msg.author.id].clan].description = ""; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function clanleave(msg) {
    (clan[profile[msg.author.id].clan].membersexperience).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), (clan[profile[msg.author.id].clan].members).indexOf(msg.author.id)); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].membersnb -= 1; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[profile[msg.author.id].clan].members).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), (clan[profile[msg.author.id].clan].members).indexOf(msg.author.id)); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = false; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clanjoin(name, msg) {
    clan[name].membersnb += 1; (clan[name].membersexperience).push(0); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[name].members).push(msg.author.id); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clandelete(name, msg) {
    for (i in clan[name].members) {
        var userKick = client.users.cache.get((clan[name].members)[i]);
        profile[((clan[name].members)[i])].clan = false; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
        if (userKick) {
            if (lang[userKick.id] == `FR`) userKick.send(`Le clan **__${name}__** vient d'être supprimé, vous n'êtes plus dans un clan désormais.`).catch(() => { ; });
            else if (lang[userKick.id] == `NO`) userKick.send(`Klanen **__${name}__** er nettopp slettet, du er ikke i en klan lenger.`).catch(() => { ; });
            else userKick.send(`The clan **__${name}__** has just been deleted, you are not in a clan anymore.`).catch(() => { ; });
        }
    }
    // delete all clan informations in clan.json
    delete clan[name]; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function clankick(msg, userid) {
    clan[profile[msg.author.id].clan].membersnb -= 1; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].membersexperience.splice((clan[profile[msg.author.id].clan].members).indexOf(userid), (clan[profile[msg.author.id].clan].members).indexOf(userid)); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].members.splice((clan[profile[msg.author.id].clan].members).indexOf(userid), (clan[profile[msg.author.id].clan].members).indexOf(userid)); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[userid].clan = false; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
    var userKick = client.users.cache.get(userid);
    if (userKick) {
        if (lang[userid] == `FR`) userKick.send(`Vous avez été exclu du clan **__${profile[msg.author.id].clan}__**.`).catch(() => { ; });
        else if (lang[userid] == `NO`) userKick.send(`Du har blitt ekskludert fra klanen **__${profile[msg.author.id].clan}__**.`).catch(() => { ; });
        else userKick.send(`You have been excluded from the clan **__${profile[msg.author.id].clan}__**.`).catch(() => { ; });
    }
}
function clanpublic(name, msg) {
    clan[name].status = true; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function clanprivate(name, msg) {
    clan[name].status = false; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function claninvite(name, userid, msg) {
    clan[name].membersnb += 1; (clan[name].membersexperience).push(0); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[name].members).push(userid); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[userid].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clancolor(name, color, msg) {
    clan[name].color = color; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}
function clanpicture(name, picture, msg) {
    clan[name].picture = picture; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function profilecolor(msg, color) {
    profile[msg.author.id].color = color; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profilepicture(msg, picture) {
    profile[msg.author.id].picture = picture; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profilepicturereset(msg) {
    profile[msg.author.id].picture = `${msg.author.avatarURL({ format: `png`, dynamic: true, size: 128 })}`; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profiledescription(msg, description) {
    profile[msg.author.id].description = description + `\n­`; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profiledescriptionreset(msg) {
    profile[msg.author.id].description = ""; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profilerename(msg, name) {
    profile[msg.author.id].name = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
    profile[msg.author.id].namechangement -= 1; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}

function notificationon(msg) {
    notification[msg.author.id] = `on`; fs.writeFile(`./data/notification.json`, JSON.stringify(notification), err => { if (err) throw err; });
}
function notificationoff(msg) {
    notification[msg.author.id] = `off`; fs.writeFile(`./data/notification.json`, JSON.stringify(notification), err => { if (err) throw err; });
}
function guildnotificationon(msg) {
    guildnotification[msg.guild.id] = `on`; fs.writeFile(`./data/guildnotification.json`, JSON.stringify(guildnotification), err => { if (err) throw err; });
}
function guildnotificationoff(msg) {
    guildnotification[msg.guild.id] = `off`; fs.writeFile(`./data/guildnotification.json`, JSON.stringify(guildnotification), err => { if (err) throw err; });
}

// on message = commands let's find the command file
function commandLaunch(msg) {
    // custom prefix
    let prefix = config.prefix;
    if (!customprefix[msg.guild.id]) {
        prefix = config.prefix;
    } else {
        prefix = customprefix[msg.guild.id];
    }
    if (msg.content.toLowerCase() == `&prefix`) return msg.reply(`${prefix} is the current prefix.`)
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    // alias
    switch (commandName) {
        case 'ann': // annonce effi
            commandName = 'annonce'; break;
        case 'hide':
        case 'show':
        case 'close':
        case 'open':
        case 'join': // efficom
            commandName = 'salonjules'; break;
        case 'pierrefeuilleciseau':
        case 'pierrefeuilleciseaux':
            commandName = 'pfc'; break;
        case 'aide':
        case 'hjelp': // help
            commandName = 'help'; break;
        case 'rmd':
        case 'rmdm':
        case 'rmdme':
        case 'rm': // remind me
            commandName = 'remindme'; break;
        case 'lang':
        case 'langue':
        case 'språk':
        case 'sprak': // language
            commandName = 'language'; break;
        case 'invite':
        case 'invitasjon':
        case 'invitere ': // invitation
            commandName = 'invitation'; break;
        case 'p':
        case 'profil': // profile
            commandName = 'profile'; break;
        case 'not':
            commandName = 'notification'; break;
        case 'klan':
        case 'c': // clan
            commandName = 'clan'; break;
        case 'suggestions':
        case 'sugg': // suggestion
            commandName = 'suggestion'; break;
        case 'server':
        case 'serveur':
        case 'g':
        case 'guilde': // guild
            commandName = 'guild'; break;
        default:
            break;
    }
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && msg.channel.type !== 'text') {
        return msg.reply('Je ne peux pas éxecuter cette commande dans les messages privés !');
    }

    if (command.args && !args.length) {
        return msg.channel.send(`Votre commande est incorrecte, tapez \`${prefix}aide ${commandName}\` pour savoir comment marche cette commande.`);
    }

    try {
        command.execute(msg, args, client, prefix, getca, version);
    } catch (error) {
        console.error(error);
        msg.channel.send(`Error CD1`);
    }
};

// XP System
// Cooldown
const userCooldown = new Set();
// Level Up Message
function levelUpMessage(msg, level) {
    const levelUpEmote = client.emojis.cache.get(`805161888584826900`).toString();
    var levelUpClanXp = ((Math.floor(Math.random() * (300 - 150 + 1)) + 150) * level);
    var messageClan = profile[msg.author.id].clan ? `${profile[msg.author.id].clan} +${levelUpClanXp} XP` : `Aucun`;
    if (profile[msg.author.id].clan != false) {
        clan[profile[msg.author.id].clan].membersexperience[(clan[profile[msg.author.id].clan].members).indexOf(msg.author.id)] += levelUpClanXp; clan[profile[msg.author.id].clan].experience += levelUpClanXp; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    }
    var userPicture = ((profile[msg.author.id].picture) == 'null') ? "https://cdn.discordapp.com/avatars/802976208261218334/4b4d936a9a495fd17a6f32905fa5ffcd.png?size=128" : profile[msg.author.id].picture;
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
    const levelUpEmote = client.emojis.cache.get(`805161888584826900`).toString();
    // xp boost
    switch (level) {
        case 1: var xpBoost = "× 1.1"; break;
        case 2: var xpBoost = "× 1.2"; break;
        case 3: var xpBoost = "× 1.3"; break;
        case 4: var xpBoost = "× 1.4"; break;
        case 5: var xpBoost = "× 1.5"; break;
        case 6: var xpBoost = "× 1.7"; break;
        case 7: var xpBoost = "× 2.0"; break;
        case 8: var xpBoost = "× 2.5"; break;
        case 9: var xpBoost = "× 2.7"; break;
        case 10: var xpBoost = "× 3.0"; break;
        default: var xpBoost = "× 3.0"; break;
    }
    for (j in clan[name].members) {
        var userToPM = client.users.cache.get(((clan[name].members)[j]).toString());
        if (userToPM) {
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
client.on('message', msg => {
    if (msg.author.bot || msg.channel.type != `text`) return; if (msg.content.length <= 1) return;
    // UPDATE
    {
        if (!profile[msg.author.id]) {
            // don't do the update
        } else { // update
            // profile
            if (profile[msg.author.id].version != "1.1.0") {
                profile[msg.author.id].version = "1.1.0"; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
            }
            // clan
            if (!clan[profile[msg.author.id].clan]) { ; } else {
                if (clan[profile[msg.author.id].clan].version != "1.1.0") {
                    clan[profile[msg.author.id].clan].version = "1.1.0"; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
                }
            }
        }
    }
    // command after the update
    commandLaunch(msg);
    if (!userCooldown.has(msg.author.id)) {
        // guild
        if (!guildmessage[msg.guild.id]) {
            // add the guild
            guildmessage[msg.guild.id] = {
                members: [msg.author.id],
                messages: [1]
            };
            fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        } else if (!(guildmessage[msg.guild.id].members).includes(msg.author.id)) {
            // add the user
            (guildmessage[msg.guild.id].messages).push(1); (guildmessage[msg.guild.id].members).push(msg.author.id); fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        } else {
            // add 1 message to the user
            guildmessage[msg.guild.id].messages[(guildmessage[msg.guild.id].members).indexOf(msg.author.id)] += 1; fs.writeFile(`./data/guildmessage.json`, JSON.stringify(guildmessage), err => { if (err) throw err; });
        }
        xpWon = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
        // verify if author has a account
        if (!profile[msg.author.id]) {
            // random color
            var randomColor = (('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)).toString(16))
            // create account
            profile[msg.author.id] = {
                version: "1.1.0",
                experience: xpWon,
                level: 1,
                name: `${msg.author.username}#${msg.author.discriminator}`,
                namechangement: 3,
                color: randomColor,
                picture: `${msg.author.avatarURL({ format: `png`, dynamic: true, size: 128 })}`,
                description: "",
                messages: 1,
                banned: [],
                status: true,
                clan: false
            }
            fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => {
                if (err) throw err;
            });
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
                    for (i in levelTableClan) {
                        a = levelTableClan[i].split(`-`); // a[0] a[1]
                        a[0] = parseInt(a[0]); a[1] = parseInt(a[1]);
                        if ((a[1] > (clan[profile[msg.author.id].clan].experience)) && ((clan[profile[msg.author.id].clan].experience) > a[0])) {
                            i = parseInt(i);
                            if ((clan[profile[msg.author.id].clan].level) != (i + 1)) {
                                clanLevelUpMessage(profile[msg.author.id].clan, msg, (i + 1));
                                clan[profile[msg.author.id].clan].level = parseInt(i + 1); clan[profile[msg.author.id].clan].membersnblimit += 5; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
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
                    case 6: xpWon = xpWon * 1.7; break;
                    case 7: xpWon = xpWon * 2.0; break;
                    case 8: xpWon = xpWon * 2.5; break;
                    case 9: xpWon = xpWon * 2.7; break;
                    case 10: xpWon = xpWon * 3; break;
                    default: xpWon = xpWon * 3; break;
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
            for (i in levelTable) {
                a = levelTable[i].split(`-`); // a[0] a[1]
                a[0] = parseInt(a[0]); a[1] = parseInt(a[1]);
                if ((a[1] > (profile[msg.author.id].experience)) && ((profile[msg.author.id].experience) > a[0])) {
                    i = parseInt(i); if (profile[msg.author.id].level != (i + 1)) { levelUpMessage(msg, (i + 1)); profile[msg.author.id].level = (i + 1); fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; }); } break;
                }
            }
        }
        userCooldown.add(msg.author.id);
        setTimeout(() => {
            // Removes the user from the set
            userCooldown.delete(msg.author.id);
        }, 2000);
    }
});

// login
client.login(process.env.TOKEN);