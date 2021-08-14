module.exports = {
    name: 'suggestion',
    description: 'Information about the arguments provided.',
    args: false,
    guildOnly: false,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        // check + cross icon
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString();
        function sendSuggestion(msg, sugg) {
            let suggsalon = client.channels.cache.get("870941577881726977");
            var userPicture = ((profile[msg.author.id].picture) == 'default') ? msg.author.avatarURL({ format: `png`, dynamic: true, size: 128 }) : profile[msg.author.id].picture;
            suggsalon.send({
                embed: {
                    color: 14396152,
                    author: {
                        name: profile[msg.author.id].name,
                        icon_url: userPicture
                    },
                    description: `**__Suggestion :__**\n${sugg}`,
                    timestamp: new Date(),
                    footer: {
                        text: `BIE V-${version}`
                    }
                }
            }).then(msg2 => {
                msg2.react(checkIcon); msg2.react(uncheckIcon);
            })
        }

        if (!args[0]) return;
        // getter
        let clan = getca(`clan`);
        let profile = getca(`profile`);
        let lang = getca(`language`);
        let userLang = lang[msg.author.id];
        var suggestion = ""
        for (let i = 0; i < args.length; i++) {
            if (i == 0) { suggestion = suggestion + args[i] } else { suggestion = suggestion + " " + args[i] }
        }
        if (userLang == `FR`) msg.channel.send(`Merci de confirmer votre suggestion : \`${suggestion}\`. Si vous mettez n'importe quoi il se peut que vous soyez définivement banni de Glede !`).catch(() => { ; });
        else if (userLang == `NO`) msg.channel.send(`Bekreft ditt forslag: \`${suggestion}\`. Hvis du gjør noe dumt, risikerer du å bli utestengt fra Glede for godt!`).catch(() => { ; });
        else msg.channel.send(`Please confirm your suggestion: \`${suggestion}\`. If you do anything stupid, you risk being banned from Glede for good!`).catch(() => { ; });
        msg.react(`${checkIcon}`).catch(() => { ; });
        msg.react(`${uncheckIcon}`).catch(() => { ; });
        msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
            { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == `Check`) {
                    sendSuggestion(msg, suggestion);
                    if (userLang == `FR`) return msg.channel.send(`Votre suggestion a bien été envoyée <@${msg.author.id}>.`);
                    else if (userLang == `NO`) return msg.channel.send(`Forslaget ditt er sendt <@${msg.author.id}>.`);
                    else return msg.channel.send(`Your suggestion has been sent <@${msg.author.id}>.`);
                } else {
                    if (userLang == `FR`) return msg.channel.send(`Votre suggestion a été annulée <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`Forslaget ditt er kansellert <@${msg.author.id}>.`).catch(() => { ; });
                    else return msg.channel.send(`Your suggestion has been cancelled <@${msg.author.id}>.`).catch(() => { ; });
                }
            }).catch(() => {
                if (userLang == `FR`) return msg.channel.send(`Votre suggestion a été annulée <@${msg.author.id}>.`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`Forslaget ditt er kansellert <@${msg.author.id}>.`).catch(() => { ; });
                else return msg.channel.send(`Your suggestion has been cancelled <@${msg.author.id}>.`).catch(() => { ; });
            });
    }
};