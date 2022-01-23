import { DiscordMessage } from '../../interface/DiscordMessage';

// création d'un rôle par l'utilisateur via Glede
function roleCreateUser(msg: DiscordMessage, pos: number) {
    customrole[msg.author.id] = { guild: [0], role: [0] };
    fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    roleAddUser(msg, pos);
}

// ajouter un rôle à un utilisateur
function roleAddUser(msg: DiscordMessage, pos: number) {
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

// modification du nom du rôle
function roleEditName(msg: DiscordMessage, name, indexId) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[indexId].roleid);
    try { userrole.edit({ name: `${name}` }); } catch (error) { };
    customrole[msg.author.id].role[indexId].name = name; fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} Le nom de votre rôle <@${msg.author.id}> est désormais \`${name}\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} Navnet på rollen din <@${msg.author.id}> er nå \`${name}\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} Your role's name <@${msg.author.id}> is now \`${name}\`.`).catch(() => { ; });
}

// modifie la couleur du rôle
function roleEditColor(msg: DiscordMessage, color, indexId) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[indexId].roleid);
    try { userrole.edit({ color: `${color}` }); } catch (error) { };
    customrole[msg.author.id].role[indexId].color = color; fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} La couleur de votre rôle <@${msg.author.id}> est désormais \`${color}\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} Fargen på rollen din <@${msg.author.id}> er nå \`${color}\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} Your role's color <@${msg.author.id}> is now \`${color}\`.`).catch(() => { ; });
}

// supprime le rôle
function roleDelete(msg: DiscordMessage, index) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    var userrole = msg.guild.roles.cache.get(customrole[msg.author.id].role[index].roleid);
    customrole[msg.author.id].role.splice(index, 1);
    customrole[msg.author.id].guild.splice(index, 1); fs.writeFile(`./data/customrole.json`, JSON.stringify(customrole), err => { if (err) throw err; });
    try { userrole.delete() } catch (error) { };
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> votre rôle a bien été supprimé !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> rollen din er slettet!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> your role has been deleted!`).catch(() => { ; });
}

// mettre actif les custom role
function roleOn(msg: DiscordMessage) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    servperm[msg.guild.id] = 1; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien activé cette fonctionnalité !\nChaque utilisateur pourra créer et personnaliser son propre rôle.\nPour changer la position des rôles, tapez la commande \`&role position [nombre]\`.`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har aktivert denne funksjonen!\nHver bruker vil kunne lage og tilpasse sin egen rolle.\nFor å endre posisjonen til rollene, skriv inn kommandoen \`&role position [antall]\`.`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have enabled this feature!\nEach user will be able to create and customise their own role.\nTo change the position of the roles, type the command \`&role position [number]\`.`).catch(() => { ; });
}

function roleOff(msg: DiscordMessage) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    delete servperm[msg.guild.id]; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien désactivé cette fonctionnalité !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har deaktivert denne funksjonen!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have deactivated this feature!`).catch(() => { ; });
}

// mettre la position du custom role dans la liste des rôles
function rolePosition(msg: DiscordMessage, pos: number) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    servperm[msg.guild.id] = pos; fs.writeFile(`./data/servperm.json`, JSON.stringify(servperm), err => { if (err) throw err; });
    if (lang[msg.author.id] === "FR") return msg.channel.send(`${checkIcon} <@${msg.author.id}> la position des rôles sera \`${pos}\` désormais !`).catch(() => { ; });
    else if (lang[msg.author.id] === "NO") return msg.channel.send(`${checkIcon} <@${msg.author.id}> stillingen til rollene vil nå være \`${pos}\`!`).catch(() => { ; });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> the position of the roles will be \`${pos}\` from now!`).catch(() => { ; });
}