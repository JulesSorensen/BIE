module.exports = {
    name: 'notification',
    description: 'Information about the arguments provided.',
    args: false,
    guildOnly: true,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        let notification = getca(`notification`);
        let guildnotification = getca(`guildnotification`);
        let lang = getca(`language`);
        let userLang = lang[msg.author.id];
        // check + cross icon
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
        if (!args[0]) {
            if (!notification[msg.author.id] || notification[msg.author.id] == `off`) {
                if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Les messages de gain de niveau sont **désactivés** <@${msg.author.id}>.\nPrésisez "on" ou "off" après la commande pour désactiver ou activer les messages privés quand vous passez un niveau.`).catch(()=>{;});
                if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Meldinger om nivå forsterkning er **deaktivert** <@${msg.author.id}>.\nForhåndsinnstilt "on" eller "off" etter kommandoen for å deaktivere eller aktivere private meldinger når du passerer et nivå.`).catch(()=>{;});
                else return msg.channel.send(`${uncheckIcon} Level gain messages are **disabled** <@${msg.author.id}>.\nPreset "on" or "off" after the command to disable or enable private messages when you pass a level.`).catch(()=>{;});
            }
            else if (notification[msg.author.id] == `on`) {
                if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les messages de gain de niveau sont **activés** <@${msg.author.id}>.\nPrésisez "on" ou "off" après la commande pour désactiver ou activer les messages privés quand vous passez un niveau.`).catch(()=>{;});
                if (userLang == `NO`) return msg.channel.send(`${checkIcon} Meldinger om nivå forsterkning er **aktivert** <@${msg.author.id}>.\nForhåndsinnstilt "on" eller "off" etter kommandoen for å deaktivere eller aktivere private meldinger når du passerer et nivå.`).catch(()=>{;});
                else return msg.channel.send(`${checkIcon} Level gain messages are **enabled** <@${msg.author.id}>.\nPreset "on" or "off" after the command to disable or enable private messages when you pass a level.`).catch(()=>{;});

            } else {
                return msg.channel.send(`Error NN1`).catch(()=>{;});
            }

        }
        else if (args[0].toLowerCase() == `on` || args[0].toLowerCase() == `enable`) { // enable PM notifiation
            if (!notification[msg.author.id] || notification[msg.author.id] == `off`) {getca(`notificationon`, msg);}
            if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les notifications ont bien étés **activés** <@${msg.author.id}> !`).catch(()=>{;});
            if (userLang == `NO`) return msg.channel.send(`${checkIcon} Varsler er **aktivert** <@${msg.author.id}>!`).catch(()=>{;});
            else return msg.channel.send(`${checkIcon} The notifications have been **activated** <@${msg.author.id}>!`).catch(()=>{;});
        } else if (args[0].toLowerCase() == `off` || args[0].toLowerCase() == `disable`) { // disable PM notifiation
            if (!notification[msg.author.id] || notification[msg.author.id] == `on`) {getca(`notificationoff`, msg);}
            if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les notifications ont bien étés **désactivés** <@${msg.author.id}> !`).catch(()=>{;});
            if (userLang == `NO`) return msg.channel.send(`${checkIcon} Varsler er **deaktivert** <@${msg.author.id}>!`).catch(()=>{;});
            else return msg.channel.send(`${checkIcon} The notifications have been **deactivated** <@${msg.author.id}>!`).catch(()=>{;});

        } else if (args[0].toLowerCase() == `reaction` || args[0].toLowerCase() == `r`) { // guild notification reaction level up
            if (!args[1]) {
                if (!guildnotification[msg.guild.id] || guildnotification[msg.guild.id] == `off`) {
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Les messages de gain de niveau sont **désactivés** dans ce serveur <@${msg.author.id}>.`).catch(()=>{;});
                    if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Meldinger om nivå forsterkning er **deaktivert** på denne serveren <@${msg.author.id}>.`).catch(()=>{;});
                    else return msg.channel.send(`${uncheckIcon} Level gain messages are **disabled** in this server <@${msg.author.id}>.`).catch(()=>{;});
                }
                else if (guildnotification[msg.guild.id] == `on`) {
                    if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les messages de gain de niveau sont **désactivés** dans ce serveur <@${msg.author.id}>.`).catch(()=>{;});
                    if (userLang == `NO`) return msg.channel.send(`${checkIcon} Meldinger om nivå forsterkning er **aktivert** på denne serveren <@${msg.author.id}>.`).catch(()=>{;});
                    else return msg.channel.send(`${checkIcon} Level gain messages are **enabled** in this server <@${msg.author.id}>.`).catch(()=>{;});
                } else {
                    return msg.channel.send(`Error NN1`).catch(()=>{;});
                }

            } else if (args[1].toLowerCase() == `on`) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    if (!guildnotification[msg.guild.id] || guildnotification[msg.guild.id] == `off`) {getca(`guildnotificationon`, msg);}
                    if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les notifications ont bien étés **activés** sur le serveur <@${msg.author.id}> !`).catch(()=>{;});
                    if (userLang == `NO`) return msg.channel.send(`${checkIcon} Varsler er **aktivert** på denne serveren <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${checkIcon} The notifications have been **activated** in this server <@${msg.author.id}>!`).catch(()=>{;});
                } else return msg.channel.send(`<@${msg.author.id}> you're not administrator of this server...`).catch(()=>{;});
            } else if (args[1].toLowerCase() == `off`) {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    if (!guildnotification[msg.guild.id] || guildnotification[msg.guild.id] == `on`) {getca(`guildnotificationoff`, msg);}
                    if (userLang == `FR`) return msg.channel.send(`${checkIcon} Les notifications ont bien étés **désactivés** sur le serveur <@${msg.author.id}> !`).catch(()=>{;});
                    if (userLang == `NO`) return msg.channel.send(`${checkIcon} Varsler er **deaktivert** på denne serveren <@${msg.author.id}>!`).catch(()=>{;});
                    else return msg.channel.send(`${checkIcon} The notifications have been **deactivated** in this server <@${msg.author.id}>!`).catch(()=>{;});
                } else return msg.channel.send(`<@${msg.author.id}> you're not administrator of this server...`).catch(()=>{;});
            }
        } else return;
    }
};