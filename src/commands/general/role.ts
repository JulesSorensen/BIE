module.exports = {
	name: 'role',
    guildOnly: true,
	execute(msg, args, client, prefix, getca, version) {
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
        let customrole = getca(`customrole`);
        let servperm = getca(`servperm`);
        let lang = getca(`language`);
        if(!servperm[msg.guild.id]) {
            if(!args[0]) {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`Pour activer cette fonctionnalité, un administrateur doit rentrer la commande \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`For å aktivere denne funksjonen må en administrator angi kommandoen \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
                else return msg.channel.send(`To enable this feature, an administrator must enter the command \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
            } else if (args[0].toLowerCase() == `on`) {
                if(msg.member.hasPermission(`ADMINISTRATOR`) || msg.member.hasPermission(`MANAGE_ROLES`)) {
                    return getca(`roleon`, msg);
                } else {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous devez être administrateur pour faire cela <@${msg.author.id}>!`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du må være administrator for å gjøre dette <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You must be an administrator to do this <@${msg.author.id}>!`).catch(()=>{;});
                }
            } else {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Pour activer cette fonctionnalité, un administrateur doit rentrer la commande \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} For å aktivere denne funksjonen må en administrator angi kommandoen \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
                else return msg.channel.send(`${uncheckIcon} To enable this feature, an administrator must enter the command \`${prefix}role on\` <@${msg.author.id}>.`).catch(()=>{;});
            }
        } else {
            function rolecreate(msg) {
                if(!customrole[msg.author.id]) {
                    getca(`rolecreateuser`, msg, servperm[msg.guild.id]); return true;
                } else {
                    var guildFinded = false;
                    customrole[msg.author.id].guild.forEach((item, index) => {
                        if (item == msg.guild.id) {guildFinded = index;}
                    });
                    if (guildFinded == false) {
                        getca(`roleadduser`, msg, servperm[msg.guild.id]); return true;
                    } else {
                        return false;
                    }
                }
            }
            
            if(!args[0]) {
                if (!rolecreate(msg)) {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous avez déjà un rôle <@${msg.author.id}>.\nUtilisez \`${prefix}role nom [NomDeVotreRole]\` ou \`${prefix}role color [#HEXcode]\` pour le customiser.`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du har allerede en rolle <@${msg.author.id}>.\nBruk \`${prefix}role name [RollenavnetDitt]\` eller \`${prefix}role color [#HEXcode]\` å tilpasse den.`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You already have a role <@${msg.author.id}>.\nUse \`${prefix}role name [NameOfYourRole]\` or \`${prefix}role color [#HEXcode]\` to customise it.`).catch(()=>{;});
                } else return;
            } else if (args[0].toLowerCase() == `create` || args[0].toLowerCase() == `cr`) {
                if (!rolecreate(msg)) {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous avez déjà un rôle <@${msg.author.id}>.\nUtilisez \`${prefix}role nom [NomDeVotreRole]\` ou \`${prefix}role color [#HEXcode]\` pour le customiser.`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du har allerede en rolle <@${msg.author.id}>.\nBruk \`${prefix}role name [RollenavnetDitt]\` eller \`${prefix}role color [#HEXcode]\` å tilpasse den.`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You already have a role <@${msg.author.id}>.\nUse \`${prefix}role name [NameOfYourRole]\` or \`${prefix}role color [#HEXcode]\` to customise it.`).catch(()=>{;});
                } else return;
            } else if(args[0].toLowerCase().startsWith(`pos`)) {
                if(!args[1] || Number(args[1]) != parseInt(args[1]) || args[1] < 0) {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous devez rentrer un nombre après la commande <@${msg.author.id}>!`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du må skrive inn et nummer etter bestilling <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You must enter a number after the command <@${msg.author.id}>!`).catch(()=>{;});
                } else {
                    getca(`rolepos`, msg, args[1]);
                }
            } else if(args[0].toLowerCase() == `nom` || args[0].toLowerCase() == `name` || args[0].toLowerCase() == `navn` || args[0].toLowerCase() == `n`) {
                if (!rolecreate(msg)) {
                    var guildFinded = false;customrole[msg.author.id].guild.forEach((item, index) => {if (item == msg.guild.id) {guildFinded = index;}});if (guildFinded == false) {if (lang[msg.author.id] === `FR`) return msg.channel.send(`Vous n'avez même pas de rôle ! Tapez \`${prefix}role create\` pour en créer un.`).catch(()=>{;});else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Du har ikke engang en rolle! Skriv \`${prefix}role create\` å lage en.`).catch(()=>{;});else return msg.channel.send(`You don't even have a role! Type \`${prefix}role create\` to create one.`).catch(()=>{;});}
                    if(!args[1] || args[1].length > 25 || args[1].length < 2) {
                        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous devez rentrez un nom entre 2 et 25 caractères <@${msg.author.id}>!`).catch(()=>{;});
                        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du må skrive inn et navn mellom 2 og 25 tegn <@${msg.author.id}>!`).catch(()=>{;});
                        else return msg.channel.send(`${uncheckIcon} You must enter a name between 2 and 25 characters <@${msg.author.id}>!`).catch(()=>{;});
                    } else {
                        var fullArgs = args.slice(1).join(' ');
                        getca(`roleeditname`, msg, fullArgs, guildFinded);
                    }
                } else return;
            } else if(args[0].toLowerCase() == `couleur` || args[0].toLowerCase() == `color` || args[0].toLowerCase() == `colour` || args[0].toLowerCase() == `farge` || args[0].toLowerCase() == `c`) {
                if (!rolecreate(msg)) {
                    var guildFinded = false;customrole[msg.author.id].guild.forEach((item, index) => {if (item == msg.guild.id) {guildFinded = index;}});if (guildFinded == false) {return msg.channel.send(`Vous n'avez même pas de rôle ! Tapez \`${prefix}role create\` pour en créer un.`);}
                    var colortab = {'bleu':'#0b98ce','blanc':'#d9d9db','gris':'#7e7e7e','jaune':'#deeb2e','marron':'#83521c','noir':'#020202','orange':'#ec8b13','rose':'#e773e2','rouge':'#c72b2b','vert':'#21b444','violet':'#9031d8','blue':'#0b98ce','white':'#d9d9db','gray':'#7e7e7e','yellow':'#deeb2e','brown':'#83521c','black':'#020202','pink':'#e773e2','red':'#c72b2b','green':'#21b444','purple':'#9031d8'}
                    if(!args[1]) {
                        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Veuillez rentrez un nombre hexadécimal commencant par un # <@${msg.author.id}> !`).catch(()=>{;});
                        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Skriv inn et heksadesimalt tall som begynner med et # <@${msg.author.id}>!`).catch(()=>{;});
                        else return msg.channel.send(`${uncheckIcon} Please enter a hexadecimal number starting with a # <@${msg.author.id}>!`).catch(()=>{;});
                    } else if (typeof colortab[args[1]] != 'undefined') {
                        args[1] = colortab[args[1]];
                    }
                    if (args[1].length != 7) {
                        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Veuillez rentrez un nombre hexadécimal commencant par un # <@${msg.author.id}> !`).catch(()=>{;});
                        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Skriv inn et heksadesimalt tall som begynner med et # <@${msg.author.id}>!`).catch(()=>{;});
                        else return msg.channel.send(`${uncheckIcon} Please enter a hexadecimal number starting with a # <@${msg.author.id}>!`).catch(()=>{;});
                    }
                    args[1] = (args[1].startsWith(`#`) == true) ? args[1].toString(16) : args[1] = false;
                    if (args[1]) {
                        var re = /[0-9A-Fa-f]{6}/g;
                        var inputString = 'AABBCC';

                        if(re.test(inputString)) {
                            // valid
                        } else {
                            args[1] = false;
                        }
                        re.lastIndex = 0;
                    }
                    
                    if (!args[1] || args[1] == `NaN`) {
                        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Veuillez rentrez un nombre hexadécimal commencant par un # <@${msg.author.id}> !`).catch(()=>{;});
                        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Skriv inn et heksadesimalt tall som begynner med et # <@${msg.author.id}>!`).catch(()=>{;});
                        else return msg.channel.send(`${uncheckIcon} Please enter a hexadecimal number starting with a # <@${msg.author.id}>!`).catch(()=>{;});
                    } else {
                        getca(`roleeditcolor`, msg, args[1], guildFinded);
                    }
                } else return;
            } else if (args[0].toLowerCase() == `delete`) {
                if(!customrole[msg.author.id]) {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez même pas de rôle <@${msg.author.id}> ! Tapez \`${prefix}role create\` pour en créer un.`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke engang en rolle <@${msg.author.id}>! Skriv \`${prefix}role create\` å lage en.`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You don't even have a role <@${msg.author.id}>! Type \`${prefix}role create\` to create one.`).catch(()=>{;});
                } else {
                    var guildFinded = false;
                    customrole[msg.author.id].guild.forEach((item, index) => {
                        if (item == msg.guild.id) {guildFinded = index;}
                    });
                    if (guildFinded == false) {
                        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez même pas de rôle <@${msg.author.id}> ! Tapez \`${prefix}role create\` pour en créer un.`).catch(()=>{;});
                        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke engang en rolle <@${msg.author.id}>! Skriv \`${prefix}role create\` å lage en.`).catch(()=>{;});
                        else return msg.channel.send(`${uncheckIcon} You don't even have a role <@${msg.author.id}>! Type \`${prefix}role create\` to create one.`).catch(()=>{;});
                    } else {
                        getca(`roledelete`, msg, guildFinded); return;
                    }
                }
            } else if (args[0].toLowerCase() == `off`) {
                if(msg.member.hasPermission(`ADMINISTRATOR`) || msg.member.hasPermission(`MANAGE_ROLES`)) {
                    getca(`roleoff`, msg);
                } else {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous devez être administrateur pour faire cela <@${msg.author.id}>!`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du må være administrator for å gjøre dette <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You must be an administrator to do this <@${msg.author.id}>!`).catch(()=>{;});
                }
            } else if (args[0].toLowerCase() == `on`) {
                if(msg.member.hasPermission(`ADMINISTRATOR`) || msg.member.hasPermission(`MANAGE_ROLES`)) {
                    getca(`roleon`, msg);
                } else {
                    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Vous devez être administrateur pour faire cela <@${msg.author.id}>!`).catch(()=>{;});
                    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Du må være administrator for å gjøre dette <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} You must be an administrator to do this <@${msg.author.id}>!`).catch(()=>{;});
                }
            }
        }
	}
};