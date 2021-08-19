module.exports = {
	name: 'reminder',
    guildOnly: true,
	execute(msg, args, client, prefix, getca, version) {
        var action = ((msg.content.split(" "))[1]).toLowerCase();
        let lang = getca(`language`);
        if (action == `add` || action == `a`) {
            function error(msg) {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`La commande est \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, le rôle à mentionner n'est pas obligatoire !`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Ordren er \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, le rôle à mentionner n'est pas obligatoire !`).catch(()=>{;});
                else return msg.channel.send(`The command is \`&reminder add [dd/mm/yyyy] "[ReminderTitle]" [#TextChannel] [@RoleToMention]\` <@${msg.author.id}>, le rôle à mentionner n'est pas obligatoire !`).catch(()=>{;});
            }
            if(msg.member.hasPermission(`ADMINISTRATOR`) || msg.member.hasPermission(`MANAGE_CHANNELS`) || msg.member.hasPermission(`MANAGE_MESSAGES`)) {
                switch(true) {case (!args[2]):error(msg);return;case (!args[1]):error(msg);return;default:break;};
                if((args[0].split(`/`)).length != 3) {return error(msg);}
                if((args[0].split(`/`))[0].length != 2 || parseInt((args[0].split(`/`))[0]) > 31 || (args[0].split(`/`))[1].length != 2 || parseInt((args[0].split(`/`))[1]) > 12 || (args[0].split(`/`))[2].length != 4) {return error(msg);}
                if(!(args[2].startsWith(`<#`)) || !(args[2].endsWith(`>`))) {return error(msg);}
                args[2] = args[2].substring(2); args[2] = args[2].substring(0, (args[2].length - 1));
                if(args[3]){if(args[3].length == 18) {if(!(parseInt(args[3]))) {return error(msg);}} else if(!(args[3].startsWith(`<@&`)) || !(args[3].endsWith(`>`))) {return error(msg);} else {args[3] = args[3].substring(3); args[3] = args[3].substring(0, (args[3].length - 1));}}
                return getca(`reminderadd`, msg, args);
            } else {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`Vous devez être administrateur pour faire cela <@${msg.author.id}>!`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Du må være administrator for å gjøre dette <@${msg.author.id}>!`).catch(()=>{;});
                else return msg.channel.send(`You must be an administrator to do this <@${msg.author.id}>!`).catch(()=>{;});
            }
        } else if (action == `delete` || action == `remove` || action == `d` || action == `r`) {
            function error(msg) {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`La commande est \`&reminder delete [id]\`, pour trouver l'ID tapez \`&reminder list\` <@${msg.author.id}> !`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Ordren er \`&reminder delete [id]\`, for å finne ID, skrive \`&reminder list\` <@${msg.author.id}> !`).catch(()=>{;});
                else return msg.channel.send(`The command is \`&reminder delete [id]\`, to find the ID type \`&reminder list\` <@${msg.author.id}> !`).catch(()=>{;});
            }
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            if(msg.member.hasPermission(`ADMINISTRATOR`) || msg.member.hasPermission(`MANAGE_CHANNELS`) || msg.member.hasPermission(`MANAGE_MESSAGES`)) {
                if(!args[1]) {return error(msg);}
                else if(!isNumeric(args[1])) {return error(msg);}
                else {
                    var id = parseInt(args[1]);
                    if(!id || id == `NaN`) {return error(msg);}
                    return getca(`reminderdelete`, msg, id);
                }
            } else {
                if (lang[msg.author.id] === `FR`) return msg.channel.send(`Vous devez être administrateur pour faire cela <@${msg.author.id}>!`).catch(()=>{;});
                else if (lang[msg.author.id] === `NO`) return msg.channel.send(`Du må være administrator for å gjøre dette <@${msg.author.id}>!`).catch(()=>{;});
                else return msg.channel.send(`You must be an administrator to do this <@${msg.author.id}>!`).catch(()=>{;});
            }
        } else if (action == `list` || action == `show` || action == `l` || action == `s`) {
            return getca(`reminderlist`, msg);
        }
	}
};