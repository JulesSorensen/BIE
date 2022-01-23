import { DiscordMessage } from '../../interface/DiscordMessage';

function createClan(name: string, msg: DiscordMessage) { // clans
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

function clanDescription(desc: string, name: string, msg: DiscordMessage) {
    clan[name].description = desc; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanDescriptionReset(msg: DiscordMessage) {
    clan[profile[msg.author.id].clan].description = ""; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanLeave(msg: DiscordMessage) {
    (clan[profile[msg.author.id].clan].membersexperience).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    clan[profile[msg.author.id].clan].membersnb -= 1; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[profile[msg.author.id].clan].members).splice((clan[profile[msg.author.id].clan].members).indexOf(msg.author.id), 1); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = false; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}

function clanJoin(name: string, msg: DiscordMessage) {
    clan[name].membersnb += 1; (clan[name].membersexperience).push(0); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[name].members).push(msg.author.id); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[msg.author.id].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}

function clanDelete(name: string, msg: DiscordMessage) {
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

function clanKick(msg: DiscordMessage, userid: number) {
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

function clanPublic(name: string, msg: DiscordMessage) {
    clan[name].status = true; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanPrivate(name: string, msg: DiscordMessage) {
    clan[name].status = false; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanInvite(name: string, userid: number, msg: DiscordMessage) {
    clan[name].membersnb += 1; (clan[name].membersexperience).push(0); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    (clan[name].members).push(userid); fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
    profile[userid].clan = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
}

function clanColor(name:string, color: number, msg: DiscordMessage) {
    clan[name].color = color; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanPicture(name: string, picture, msg: DiscordMessage) {
    clan[name].picture = picture; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}

function clanPictureReset(name: string) {
    clan[name].picture = "https://i.imgur.com/7jUvHRY.png"; fs.writeFile(`./data/clan.json`, JSON.stringify(clan), err => { if (err) throw err; });
}