const start = Date.now();
import fs from 'fs';
import Discord from 'discord.js';
import config from './config/config.json';
import sha1 from 'sha1';
let prefix = config.prefix;
let version = "2.1.0";
require('dotenv').config()

require('discord-reply');
import moment from 'moment';
const client: any = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], });
client.commands = new Discord.Collection();
import disbut from 'discord-buttons';
disbut(client);
import { MessageMenuOption, MessageMenu } from 'discord-buttons';
import fetch from 'node-fetch';

// DATA BASE
let customprefix = require('./data/prefix.json');
let lang = require('./data/lang.json');
let profile = require('./data/profile.json');
let clan = require('./data/clan.json');
let notification = require('./data/notification.json');
let guildnotification = require('./data/guildnotification.json');
let guildmessage = require('./data/guildmessage.json');
let customrole = require('./data/customrole.json');
let servperm = require('./data/servperm.json');
let reminder = require('./data/reminder.json');
let gpname = require('./data/gpname.json');
// efficom
let edt = require('./data/edt.json');
let edtremind = require('./data/edtremind.json');
let devoir = require('./data/devoir.json');

function gameverify() {
    fetch('https://www.gamerpower.com/api/giveaways?platform=pc').then(res => res.json()).then(json => {
        var tab = [];
        var stop = false;
        var firstName = false;
        json.forEach((item) => {
            if (!firstName) { firstName = sha1(item.title); }
            if (!stop) {
                if (sha1(item.title) == gpname['name']) {
                    stop = true;
                } else tab.push(item);
            }
        });
        tab = tab.reverse();
        gpname['name'] = firstName; fs.writeFile(`./data/gpname.json`, JSON.stringify(gpname), err => { if (err) throw err; });
        let channelForGames = client.channels.cache.get("840106181661163522");
        tab.forEach((item, index) => {
            var enddate = item.end_date == `N/A` ? `Unknown` : `${((item.end_date).split(' '))[0]}\n${((item.end_date).split(' '))[1]}`;
            var oldprice = item.worth == `N/A` ? `­` : `~~${item.worth}~~`;
            channelForGames.send(`@ FREE GAME`, {
                embed: {
                    color: 5794282,
                    thumbnail: {
                        url: `${item.image}`
                    },
                    author: {
                        name: `New ${item.type}\n`
                    },
                    title: `⇒ ${item.title} ⇐\n`,
                    url: item.open_giveaway,
                    description: `On ${item.platforms}\n${item.description}\n`,
                    fields: [{
                        name: `💰  ­  Price  ­  💰`,
                        value: `FREE!\n${oldprice}`,
                        inline: true
                    }, {
                        name: `🕛  ­  End  ­  🕛`,
                        value: enddate,
                        inline: true
                    }],
                    footer: {
                        text: `Free Games Notifications By Nekewo#0001`
                    }
                }
            }).then(msgb => { msgb.crosspost().catch(() => { ; }); }).catch(() => { ; });
        });
    }).catch(() => { ; });
}
function reminderCheck() {
    var date = new Date();
    var datesplit = (date.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
    datesplit.forEach((item, index) => {
        if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
    });
    var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;

    for (var value in reminder) {
        try {
            reminder[value].forEach((item, index) => {
                if (item.date == datefinale) {
                    var role = item.roleID ? `<@&${item.roleID}> ` : ``;
                    (client.channels.cache.get(item.channelID)).send(`${role}<a:bell:868901922483097661> **${item.name}**`).catch(() => { ; });
                    reminder[value].splice(reminder[value].indexOf(item), 1); fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; });
                    if (!(reminder[value].length >= 1)) { delete reminder[value]; fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; }); throw Error(); }
                }
            })
        } catch (e) { ; };
    };
}
function edtremindfunction() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    var datesplit = (date.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
    datesplit.forEach((item, index) => {
        if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
    });
    var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
    if (!edtremind[datefinale]) return;
    if (date.getHours() >= 19 && date.getMinutes() >= 30) {
        let channel = client.channels.cache.get(`762698661892849714`);
        channel.send(`<@&871298355161092186> <a:bell:868901922483097661> Vous commencez à **${edtremind[datefinale]}** demain !`).catch(() => { ; });
        delete edtremind[datefinale]; fs.writeFile(`./data/edtremind.json`, JSON.stringify(edtremind), err => { if (err) throw err; });
    }
}

client.on('ready', () => {
    const thisDate = new Date();
    const dI = { hour: (thisDate.getHours()), min: thisDate.getMinutes(), day: thisDate.getDate(), mounth: (thisDate.getMonth() + 1) };
    var millis: string | number = Date.now() - start; var sec = Math.floor((millis / 1000) % 60); millis = (millis.toString()).substring((millis.toString().length - 3));
    console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + ` ✅\nStart: ${sec}.${millis}s (${dI.day}/${dI.mounth} ${dI.hour}:${dI.min})\n-----\n`);
    client.user.setPresence({
        activity: {
            name: '&help',
            type: `WATCHING`
        }
    });
    setInterval(function () {
        // gameverify(); // not stable
        edtremindfunction();
        reminderCheck();
    }, 55000);
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
        case `rolecreateuser`:
            rolecreateuser(msg, arg1); break;
        case `roleadduser`:
            roleadduser(msg, arg1); break;
        case `roleeditname`:
            roleeditname(msg, arg1, arg2); break;
        case `roleeditcolor`:
            roleeditcolor(msg, arg1, arg2); break;
        case `roleon`:
            roleon(msg); break;
        case `roleoff`:
            roleoff(msg); break;
        case `rolepos`:
            roleposition(msg, arg1); break;
        case `roledelete`:
            roledelete(msg, arg1); break;
        case `reminderadd`:
            reminderadd(msg, arg1); break;
        case `reminderlist`:
            reminderlist(msg); break;
        case `reminderdelete`:
            reminderdelete(msg, arg1); break;
        case `edtreset`:
            edtreset(msg); break;
        case `edtadd`:
            edtadd(msg, arg1, arg2, arg3); break;
        case `edtremindadd`:
            edtremindadd(msg, arg1, arg2); break;
        case `edtremindshow`:
            edtremindshow(msg); break;
        case `edtremindreset`:
            edtremindreset(msg); break;
        case `devoiradd`:
            devoiradd(msg, arg1, arg2, arg3); break;
        case `devoirdelete`:
            devoirdelete(msg, arg1, arg2); break;
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
        version: "2.0",
        owner: msg.author.id,
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
    (clan[profile[msg.author.id].clan].membersexperience).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].membersnb -= 1; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[profile[msg.author.id].clan].members).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = false; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clanjoin(name, msg) {
    clan[name].membersnb += 1; (clan[name].membersexperience).push(0); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[name].members).push(msg.author.id); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function clandelete(name, msg) {
    for (var i in clan[name].members) {
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
    clan[profile[msg.author.id].clan].membersexperience.splice((clan[profile[msg.author.id].clan].members).indexOf(userid), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].members.splice((clan[profile[msg.author.id].clan].members).indexOf(userid), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
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
function clanpicturereset(name) {
    clan[name].picture = "https://i.imgur.com/7jUvHRY.png"; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function profilecolor(msg, color) {
    profile[msg.author.id].color = color; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profilepicture(msg, picture) {
    profile[msg.author.id].picture = picture; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}
function profilepicturereset(msg) {
    profile[msg.author.id].picture = `default`; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
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

function rolecreateuser(msg, pos) {
    customrole[msg.author.id] = { guild: [0], role: [0] };
    fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    roleadduser(msg, pos);
}
function roleadduser(msg, pos) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    try {
        msg.guild.roles.create({ data: { name: `${msg.author.username}#${msg.author.discriminator}`, color: `#000000`, }, reason: `Bot custom role creation, one role per user` }).then(role => {
            for (var roleselected of role.guild.roles.cache) {
                if (roleselected[1].name == `${msg.author.username}#${msg.author.discriminator}`) {
                    var roleid = roleselected[1].id;
                }
            }
            (msg.guild.roles.cache.get(roleid)).setPosition(pos);
            msg.member.roles.add(msg.guild.roles.cache.get(roleid).id);
            customrole[msg.author.id].guild.push(msg.guild.id)
            customrole[msg.author.id].role.push({
                realname: `${msg.author.username}#${msg.author.discriminator}`,
                name: `${msg.author.username}#${msg.author.discriminator}`,
                color: `#000000`,
                roleid: `${roleid}`
            });
            fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
            if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} Votre rôle a bien été crée <@${msg.author.id}>.\nTapez \`&role name [nom]\` pour changer son nom, ou \`&role color [#HEXcode]\` pour changer sa couleur.`).catch(() => { ; });
            else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} Rollen din er opprettet <@${msg.author.id}>.\nSkriv \`&role name [nom]\` for å endre navnet hans, eller \`&role color [#HEXcode]\` for å endre farge.`).catch(() => { ; });
            else return msg.channel.send(`${checkIcon} Your role has been created <@${msg.author.id}>.\nType \`&role name [nom]\` to change its name, or \`&role color [#HEXcode]\` to change its colour.`).catch(() => { ; });
        });
    } catch (error) { };
}
function roleeditname(msg, name, indexId) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[indexId].roleid);
    try { userrole.edit({ name: `${name}` }); } catch (error) { };
    customrole[msg.author.id].role[indexId].name = name; fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} Le nom de votre rôle <@${msg.author.id}> est désormais \`${name}\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} Navnet på rollen din <@${msg.author.id}> er nå \`${name}\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} Your role's name <@${msg.author.id}> is now \`${name}\`.`).catch(() => { ; });
}
function roleeditcolor(msg, color, indexId) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[indexId].roleid);
    try { userrole.edit({ color: `${color}` }); } catch (error) { };
    customrole[msg.author.id].role[indexId].color = color; fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} La couleur de votre rôle <@${msg.author.id}> est désormais \`${color}\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} Fargen på rollen din <@${msg.author.id}> er nå \`${color}\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} Your role's color <@${msg.author.id}> is now \`${color}\`.`).catch(() => { ; });
}
function roledelete(msg, index) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[index].roleid);
    customrole[msg.author.id].role.splice(index, 1);
    customrole[msg.author.id].guild.splice(index, 1); fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    try { userrole.delete() } catch (error) { };
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> votre rôle a bien été supprimé !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> rollen din er slettet!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> your role has been deleted!`).catch(() => { ; });
}
function roleon(msg) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    servperm[msg.guild.id] = 1; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien activé cette fonctionnalité !\nChaque utilisateur pourra créer et personnaliser son propre rôle.\nPour changer la position des rôles, tapez la commande \`&role position [nombre]\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har aktivert denne funksjonen!\nHver bruker vil kunne lage og tilpasse sin egen rolle.\nFor å endre posisjonen til rollene, skriv inn kommandoen \`&role position [antall]\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have enabled this feature!\nEach user will be able to create and customise their own role.\nTo change the position of the roles, type the command \`&role position [number]\`.`).catch(() => { ; });
}
function roleoff(msg) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    delete servperm[msg.guild.id]; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien désactivé cette fonctionnalité !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har deaktivert denne funksjonen!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have deactivated this feature!`).catch(() => { ; });
}
function roleposition(msg, pos) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    servperm[msg.guild.id] = pos; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> la position des rôles sera \`${pos}\` désormais !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> stillingen til rollene vil nå være \`${pos}\`!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> the position of the roles will be \`${pos}\` from now!`).catch(() => { ; });
}

function reminderadd(msg, args) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    if (!reminder[msg.guild.id]) {
        var id = 1;
        var roleID = !args[3] ? false : args[3];
        reminder[msg.guild.id] = [{ "id": 1, "date": args[0], "name": args[1], "channelID": args[2], "roleID": roleID }]; fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; });
    } else {
        var id: number = (reminder[msg.guild.id].length >= 1) ? ((reminder[msg.guild.id][reminder[msg.guild.id].length - 1].id) + 1) : (1);
        var roleID = !args[3] ? false : args[3];
        reminder[msg.guild.id].push({ "id": id, "date": args[0], "name": args[1], "channelID": args[2], "roleID": roleID }); fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; });
    }
    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien créer le rappel \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har opprettet påminnelsen \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have created the reminder \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
}
function reminderlist(msg) {
    let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
    if (!reminder[msg.guild.id]) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    } else if (!(reminder[msg.guild.id].length >= 1)) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    }
    var sentence = `\n`;
    reminder[msg.guild.id].forEach((item, index) => {
        var role = (item.roleID) ? ` ROLE-ID: \`${item.roleID}\`` : ``;
        sentence += `ID: \`${item.id.toString()}\` DATE: \`${item.date}\` NAME: \`${item.name}\` CHANNEL: <#${item.channelID}>${role}\n`;
    })
    if (lang[msg.author.id] === `FR`) return msg.channel.send(`Voici la liste de vos rappels:\n${sentence}`).catch(() => { ; });
    else if (lang[msg.author.id] === `FR`) return msg.channel.send(`Her er listen over tilbakekallinger:\n${sentence}`).catch(() => { ; });
    else return msg.channel.send(`Here is the list of your reminders:\n${sentence}`).catch(() => { ; });
}
function reminderdelete(msg, id) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
    if (!reminder[msg.guild.id]) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    } else {
        var guildIndex = false;
        var reminderName = false;
        reminder[msg.guild.id].forEach((item, index) => {
            if (item.id == id) {
                guildIndex = index.toString();
                reminderName = item.name;
            }
        });
        if (!guildIndex) {
            if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> cet ID est introuvable...`).catch(() => { ; });
            else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> denne IDen ble ikke funnet...`).catch(() => { ; });
            else return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> this ID can't be found...`).catch(() => { ; });
        } else {
            reminder[msg.guild.id].splice(parseInt(guildIndex), 1); fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; });
            if (lang[msg.author.id] === `FR`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> j'ai bien supprimé le rappel \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
            else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> jeg slettet påminnelsen \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
            else return msg.channel.send(`${checkIcon} <@${msg.author.id}> I removed the reminder \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
        }
    }
}

function edtreset(msg) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    edt = {}; fs.writeFile(`./data/edt.json`, JSON.stringify(edt), err => { if (err) throw err; }); msg.react(checkIcon);
}
function edtadd(msg, date, link, desc) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    edt[date] = { link: link, desc: desc }; fs.writeFile(`./data/edt.json`, JSON.stringify(edt), err => { if (err) throw err; }); msg.react(checkIcon);
}
function edtremindadd(msg, date, heure) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    edtremind[date] = heure; fs.writeFile(`./data/edtremind.json`, JSON.stringify(edtremind), err => { if (err) throw err; }); msg.react(checkIcon);
}
function edtremindshow(msg) {
    msg.channel.send("**LAST EDT-REMIND DATA FILE**", { files: ["data/edtremind.json"] });
}
function edtremindreset(msg) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    edtremind = {}; fs.writeFile(`./data/edtremind.json`, JSON.stringify(edtremind), err => { if (err) throw err; }); msg.react(checkIcon);
}
function devoiradd(msg, date, matiere, text) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    if (!devoir[date]) {
        devoir[date] = {}; devoir[date][matiere] = text; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
    } else {
        devoir[date][matiere] = text; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
    }
}
function devoirdelete(msg, date, matiere) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    if (!devoir[date]) return msg.reply(`aucun devoir détecté pour cette date`);
    if (!devoir[date][matiere]) return msg.reply(`matière non trouvé sur cette date`);
    delete devoir[date][matiere]; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
}

// private menu
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
function commandLaunch(msg) {
    // custom prefix
    let prefix = config.prefix;
    if (msg.channel.type != `dm`) {
        if (!customprefix[msg.guild.id]) {
            prefix = config.prefix;
        } else {
            prefix = customprefix[msg.guild.id];
        }
    } else prefix = config.prefix;
    if (msg.content.toLowerCase() == `&prefix`) return msg.reply(`\`${prefix}\` is the current prefix.`).catch(() => { ; });
    if (!msg.content.startsWith(prefix)) return;
    let args = msg.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();
    // alias
    switch (commandName) {
        case 'h':
        case 'aide':
        case 'hjelp': // help
            commandName = 'help'; break;
        case 'rmd':
        case 'rmdm':
        case 'rmdme': // remind me
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
        case 'ro':
        case 'r': // role
            commandName = 'role'; break;
        case 'remind':
        case 'autoremind':
        case 'autoreminder':
        case 'rm':
        case 'reminder': // reminder
            commandName = 'reminder'; try { if (args[0].toLowerCase() == `add`) { args = msg.content.split('"'); args[0] = args[0].split(" ")[2]; var secondArgs = args[2].split(" "); args[2] = secondArgs[1]; args.push(secondArgs[2]); break; } } catch (error) { if (lang[msg.author.id] === `FR`) return msg.channel.send(`La commande est \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, le rôle à mentionner n'est pas obligatoire !`).catch(() => { ; }); else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Ordren er \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, rollen som skal nevnes er ikke obligatorisk!`).catch(() => { ; }); else return msg.channel.send(`The command is \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, the role to be mentioned is not mandatory!`).catch(() => { ; }); }; break;
        case 'save': // save command PRIVATE
            if (msg.author.id == `676690539126718467`) { msg.channel.send("**LAST DATA FILES**", { files: ["data/clan.json", "data/customrole.json", "data/gpname.json", "data/guildmessage.json", "data/guildnotification.json", "data/lang.json", "data/notification.json", "data/prefix.json", "data/profile.json", "data/reminder.json", "data/servperm.json"] }).catch(() => { ; }); } return;
        case 'edt':
        case 'emploidutemps': // edt command PRIVATE
            commandName = 'edt'; break;
        case 'devoirs': // devoir command PRIVATE
            commandName = 'devoir'; break;
        case 'bie': // bie command PRIVATE
            {
                if (msg.author.id != `676690539126718467`) return;
                let option1 = new MessageMenuOption().setLabel(`EDT - Cette semaine`).setEmoji('893889890108981278').setValue(`edt1`).setDescription(`Recevoir l'emploi du temps de cette semaine`);
                let option2 = new MessageMenuOption().setLabel(`EDT - Semaine prochaine`).setEmoji('893889890108981278').setValue(`edt2`).setDescription(`Recevoir l'emploi du temps de la semaine prochaine`);
                let option3 = new MessageMenuOption().setLabel(`Devoirs - Actuels`).setEmoji('893971159933145140').setValue(`devoir`).setDescription(`Recevoir la liste des prochains devoirs`);
                let option4 = new MessageMenuOption().setLabel(`Recharger les options`).setEmoji('868852714690478090').setValue(`reload`).setDescription(`Pour pouvoir choisir de nouveau une autre option`);
                let select = new MessageMenu().setID(`customid`).setPlaceholder(`🧑‍💻 Choisissez une commande`).addOption(option1).addOption(option2).addOption(option3).addOption(option4);

                msg.channel.send(`**Bonjour <@&775833208012800050> ! :wave:**\n\n<a:gear:893920078024831017> **Voici les commandes importantes à connaître concernant Efficom :**\n\`&emploidutemps\` pour recevoir l'emploi du temps de la semaine actuelle (raccourci: \`&edt\`)\n\`&emploidutemps suivant\` pour recevoir l'emploi du temps de la semaine prochaine (r: \`&edt s\`)\n\`&devoirs\` pour recevoir les prochains devoirs à faire (\`&devoirs stats\` pour avoir plus de statisques)\n\n\`&teams [LienDeRéunion] [HeureDebut] [HeureFin] [NomDuCours]\` pour prévenir la classe d'une réunion Teams\n\`&note [Matière]\` pour prévenir la classe d'une nouvelle note sur MyGes\n\n<a:thumbsup:893920077974499388> **Réactions**\nCliquez sur 🔔 pour être notifié tout les soirs à 19h30 de l'heure à laquelle vous commencez le lendemain\nCliquez sur 💯 pour être notifié dès qu'une nouvelle note apparaît sur MyGes\nCliquez sur 📔 pour être notifié à l'ajout d'un nouveau devoir\nCliquez sur <:teams:875369282207354920> pour être notifié à chaque réunion Teams\n\n<a:gift:893921102361931807> **D'autres commandes:**\n\`&role create\` pour créer un rôle personnalisé pour vous sur le serveur (r: \`&r cr\`)\n\`&role nom [VotreNom]\` pour changer le nom de votre rôle (r: \`&r n [VotreNom]\`)\n\`&role couleur [#Couleur]\` pour changer la couleur de votre rôle (r: \`&r c [#Couleur]\`), vous devez mettre un code hexadécimal commençant par un #, ou une couleur comme \`rouge\`, \`bleu\` etc...\n­`, select).then(msgb => { msgb.react(`🔔`).catch(() => { ; }); msgb.react(`💯`).catch(() => { ; }); msgb.react(`📔`).catch(() => { ; }); msgb.react(`875369282207354920`).catch(() => { ; }); }).catch((e) => { console.log(e); });
                return;
            }
        default:
            break;
    }
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    if (command.guildOnly && msg.channel.type != 'text') {
        return msg.reply('Vous devez taper cette commande dans un serveur Discord !').catch(() => { ; });
    }

    try {
        command.execute(msg, args, client, prefix, getca, version);
    } catch (error) {
        console.error(error);
        msg.channel.send(`Error CMD[${sha1(commandName.toLowerCase())}] was generated`).catch(() => { ; });
    }
};

// XP System
// Cooldown
const userCooldown = new Set();
// Level Up Message
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
    // UPDATE
    // {
    //     if (!profile[msg.author.id]) {
    //         // don't do the update
    //     } else { // update
    //         // profile
    //         if (profile[msg.author.id].version != "2.0") {
    //             profile[msg.author.id].version = "2.0"; fs.writeFile(`./data/profile.json`, JSON.stringify(profile),err=>{if(err) throw err;});
    //         }
    //         // clan
    //         if (!clan[profile[msg.author.id].clan]) { ; } else {
    //             if (clan[profile[msg.author.id].clan].version != "2.0") {
    //                 clan[profile[msg.author.id].clan].version = "2.0"; fs.writeFile(`./data/clan.json`, JSON.stringify(profile),err=>{if(err) throw err;});
    //             }
    //         }
    //     }
    // }
    // command after the update
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
// reactions
client.on('messageReactionAdd', (reaction, user) => {
    if (user.id == `839602909942906891`) return;
    if (reaction.message.channel.id == `868524232898908190`) {
        if (reaction.emoji.name == `🔔`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`871298355161092186`).id); } catch (error) { ; };
        } else if (reaction.emoji.name == `💯`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`871298481233494027`).id); } catch (error) { ; };
        } else if (reaction.emoji.name == `📔`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`893923446940123137`).id); } catch (error) { ; };
        } else if (reaction.emoji.id == `875369282207354920`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`875369959503581244`).id); } catch (error) { ; };
        }
    }
})
client.on('messageReactionRemove', (reaction, user) => {
    if (user.id == `839602909942906891`) return;
    if (reaction.message.channel.id == `868524232898908190`) {
        if (reaction.emoji.name == `🔔`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`871298355161092186`).id); } catch (error) { ; };
        } else if (reaction.emoji.name == `💯`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`871298481233494027`).id); } catch (error) { ; };
        } else if (reaction.emoji.name == `📔`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`893923446940123137`).id); } catch (error) { ; };
        } else if (reaction.emoji.id == `875369282207354920`) {
            try { reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`875369959503581244`).id); } catch (error) { ; };
        }
    }
})

// login
client.login(process.env.TOKEN);