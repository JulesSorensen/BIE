module.exports = {
    name: 'clan',
    description: 'Information about the argsuments provided.',
    args: false,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        // check + cross icon
        let checkIcon = client.emojis.cache.get(`806094704206676019`).toString(); let uncheckIcon = client.emojis.cache.get(`806094704190029856`).toString();
        // getter
        let clan = getca(`clan`);
        let profile = getca(`profile`);
        let lang = getca(`language`);
        let userLang = lang[msg.author.id];
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
        // function for show the clan infos if !args[0] or research ...
        function printClan(clanname) {
            if (lang[clan[clanname].owner] == `FR`) {
                var clanMessage = `Clan :`; var membersMessage = `Membres`; var levelMessage = `Niveau`; var messagesMessage = `Messages`; var statusMessage = `Statut`; var statusMessage = `Statut`; var statusMessageName = clan[clanname].status ? `Publique` : `Privé`;
            } else if (lang[clan[clanname].owner] == `NO`) {
                var clanMessage = `Klan:`; var membersMessage = `Medlemmer`; var levelMessage = `Nivå`; var messagesMessage = `Meldinger`; var statusMessage = `Statusen`; var statusMessage = `Status`; var statusMessageName = clan[clanname].status ? `Åpen` : `Privat`;
            } else {
                var clanMessage = `Clan:`; var membersMessage = `Members`; var levelMessage = `Level`; var messagesMessage = `Messages`; var statusMessage = `Status`; var statusMessage = `Status`; var statusMessageName = clan[clanname].status ? `Public` : `Private`;
            }
            return msg.channel.send({
                embed: {
                    color: clan[clanname].color,
                    author: {
                        name: `${clanMessage} ${clanname}`
                    },
                    description: clan[clanname].description,
                    thumbnail: { url: clan[clanname].picture },
                    fields: [{
                        name: `${membersMessage}`,
                        value: `${clan[clanname].membersnb}/${clan[clanname].membersnblimit}\n­`,
                        inline: true
                    }, {
                        name: `${levelMessage}`,
                        value: `${clan[clanname].level}\n­`,
                        inline: true
                    }, {
                        name: `XP`,
                        value: `${clan[clanname].experience}\n­`,
                        inline: true
                    }, {
                        name: `${messagesMessage}`,
                        value: `${clan[clanname].messages}\n­`,
                        inline: true
                    }, {
                        name: `${statusMessage}`,
                        value: `${statusMessageName}`,
                        inline: true
                    }
                    ]
                }
            }).catch(() => { ; });
        }
        function printClanLeaderboard(clanname) {
            if (lang[clan[clanname].owner] == `FR`) {
                var clanMessage = `Clan :`; var membersMessage = `Membres`;
            } else if (lang[clan[clanname].owner] == `NO`) {
                var clanMessage = `Klan:`; var membersMessage = `Medlemmer`;
            } else {
                var clanMessage = `Clan:`; var membersMessage = `Members`;
            }
            var leaderboard = ``
            for (i in clan[clanname].members) {
                leaderboard += `${profile[(clan[clanname].members)[i]].clanexperience} XP ➫ ${profile[(clan[clanname].members)[i]].name}\n`
            }
            return msg.channel.send({
                embed: {
                    color: clan[clanname].color,
                    author: {
                        name: `${clanMessage} ${clanname}`
                    },
                    description: clan[clanname].description,
                    thumbnail: { url: clan[clanname].picture },
                    fields: [{
                        name: `${membersMessage}`,
                        value: `${leaderboard}`
                    }
                    ]
                }
            }).catch(() => { ; });
        }
        if (!profile[msg.author.id]) {
            if (userLang == `FR`) return msg.channel.send(`<@${msg.author.id}> votre compte vient d'être crée, tapez la commande à nouveau pour voir votre profil.`).catch(() => { ; });
            else if (userLang == `NO`) return msg.channel.send(`<@${msg.author.id}> kontoen din har nettopp blitt opprettet, skriv inn kommandoen igjen for å se profilen din.`).catch(() => { ; });
            else return msg.channel.send(`<@${msg.author.id}> your account has just been created, type the command again to see your profile.`).catch(() => { ; });
        } else {
            if (!args[0]) {
                if (profile[msg.author.id].clan != false) return printClan(profile[msg.author.id].clan);
                else if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas encore de clan <@${msg.author.id}>...`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke en klan ennå <@${msg.author.id}>...`).catch(() => { ; });
                else return msg.channel.send(`${uncheckIcon} You don't have a clan yet <@${msg.author.id}>...`).catch(() => { ; });
            } else if (args[0].toLowerCase() == `create`) { // clan create
                if (!args[1]) return;
                var clanName = ""; for (let i = 1; i < args.length; i++) { if (i == 1) { clanName = clanName + args[i] } else { clanName = clanName + " " + args[i] } };
                if (!(15 >= clanName.length && 2 <= clanName.length) || clanName.includes(`­`) || clanName.toLowerCase().startsWith(`kick`) || clanName.toLowerCase().startsWith(`delete`) || clanName.toLowerCase().startsWith(`remove`) || clanName.toLowerCase().startsWith(`ban`) || clanName.toLowerCase().startsWith(`description`) || clanName.toLowerCase().startsWith(`member`) || clanName.toLowerCase().startsWith(`members`) || clanName.toLowerCase().startsWith(`leaderboard`) || clanName.toLowerCase().startsWith(`join`) || clanName.toLowerCase().startsWith(`leave`) || clanName.toLowerCase().startsWith(`private`) || clanName.toLowerCase().startsWith(`public`) || clanName.toLowerCase().startsWith(`color`) || clanName.toLowerCase().startsWith(`image`) || clanName.toLowerCase().startsWith(`picture`) || clanName.toLowerCase().startsWith(`aucun`) || clanName.toLowerCase().startsWith(`none`) || clanName.toLowerCase().startsWith(`ingen`)) {
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Ce nom n'est pas autorisé. Pour rappel, il doit avoir entre 2 et 15 caractères <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Dette navnet er ikke tillatt. Som en påminnelse må den være på mellom 2 og 15 tegn <@${msg.author.id}>.`).catch(() => { ; });
                    else return msg.channel.send(`${uncheckIcon} This name is not allowed. As a reminder, it must be between 2 and 15 characters long <@${msg.author.id}>.`).catch(() => { ; });
                } else {
                    // if a clan already have this name
                    for (i in clan) {
                        if (i.toLowerCase() == clanName.toLowerCase()) {
                            if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Le clan **__${i}__** de **${profile[clan[i].owner].name}** existe déjà !`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} **__${i}__** klanen til **${profile[clan[i].owner].name}** eksisterer allerede!`).catch(() => { ; });
                            else return msg.channel.send(`${uncheckIcon} The clan **__${i}__** of **${profile[clan[i].owner].name}** already exists!`).catch(() => { ; });
                        }
                    }
                    // if the user is not already in a clan
                    if (profile[msg.author.id].clan == false) {
                        getca(`createclan`, msg, clanName)
                        if (userLang == `FR`) return msg.channel.send(`${checkIcon} Le clan **__${clanName}__** vient d'être crée avec succès !`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`${checkIcon} **__${clanName}__**-klanen er nettopp opprettet!`).catch(() => { ; });
                        else return msg.channel.send(`${checkIcon} Clan **__${clanName}__** has just been successfully created!`).catch(() => { ; });
                    } else {
                        if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous faites déjà parti d'un clan (**__${profile[msg.author.id].clan}__** de **${profile[clan[profile[msg.author.id].clan].owner].name}**) !`)
                        else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du tilhører allerede en klan (**__${profile[msg.author.id].clan}__** til **${profile[clan[profile[msg.author.id].clan].owner].name}**)!`)
                        else return msg.channel.send(`${uncheckIcon} You already belong to a clan (**__${profile[msg.author.id].clan}__** of **${profile[clan[profile[msg.author.id].clan].owner].name}**)!`)
                    }
                }
            } else if (args[0].toLowerCase() == `member` || args[0].toLowerCase() == `members` || args[0].toLowerCase() == `leaderboard`) { // clan leaderboard / clan members
                if (profile[msg.author.id].clan == false) return;
                if (!args[1]) {
                    printClanLeaderboard(profile[msg.author.id].clan); return;
                } else {
                    var clanName = ""; for (let i = 1; i < args.length; i++) { if (i == 1) { clanName = clanName + args[i] } else { clanName = clanName + " " + args[i] } };
                    for (i in clan) {
                        if (i.toLowerCase() == clanName.toLowerCase()) {
                            printClanLeaderboard(i); return;
                        }
                    }
                    if (userLang == `FR`) return msg.channel.send(`<@${msg.author.id}> le clan **__${clanName}__** n'existe pas.`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`<@${msg.author.id}> Klanen **__${clanName}__** eksisterer ikke.`).catch(() => { ; });
                    else return msg.channel.send(`<@${msg.author.id}> Clan **__${clanName}__** does not exist.`).catch(() => { ; });

                }
            } else if (args[0].toLowerCase() == `join`) { // if clan join
                if ((profile[msg.author.id].clan == false)) {
                    if (!args[1]) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez taper le nom du clan que vous souhaitez rejoindre <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Du må skrive inn navnet på klanen du vil bli med <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You must type the name of the clan you wish to join <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    var clanName = ""; for (let i = 1; i < args.length; i++) { if (i == 1) { clanName = clanName + args[i] } else { clanName = clanName + " " + args[i] } };
                    // search the clan
                    for (i in clan) {
                        if (i.toLowerCase() == clanName.toLowerCase()) {
                            if (clan[i].status == false) { // private clan
                                if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Le clan **__${profile[clan[i].owner].clan}__** est privé <@${msg.author.id}>, vous devez demander à **${profile[clan[i].owner].name}** de vous inviter.`).catch(() => { ; });
                                else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Klanen **__${profile[clan[i].owner].clan}__** er privat <@${msg.author.id}>, du må be **${profile[clan[i].owner].name}** om å invitere deg.`).catch(() => { ; });
                                else return msg.channel.send(`${uncheckIcon} The clan **__${profile[clan[i].owner].clan}__** is private <@${msg.author.id}>, you must ask **${profile[clan[i].owner].name}** to invite you.`).catch(() => { ; });
                            }
                            if (clan[i].membersnb >= clan[i].membersnblimit) { // full clan
                                if (userLang == `FR`) return msg.channel.send(`Le clan **__${profile[clan[i].owner].clan}__** est complet, vous ne pouvez pas le rejoindre <@${msg.author.id}>.`).catch(() => { ; });
                                else if (userLang == `NO`) return msg.channel.send(`Klanen **__${profile[clan[i].owner].clan}__** er full, du kan ikke bli med <@${msg.author.id}>.`).catch(() => { ; });
                                else return msg.channel.send(`The clan **__${profile[clan[i].owner].clan}__** is full, you can't join it <@${msg.author.id}>.`).catch(() => { ; });
                            }
                            getca(`clanjoin`, msg, i);
                            if (userLang == `FR`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez rejoint le clan **__${i}__** crée par **${profile[clan[i].owner].name}** !`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har blitt med i klanen **__${i}__** laget av **${profile[clan[i].owner].name}**!`).catch(() => { ; });
                            else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have joined the clan **__${i}__** created by **${profile[clan[i].owner].name}**!`).catch(() => { ; });
                        }
                    }
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Le clan **__${clanName}__** n'existe pas <@${msg.author.id}>...`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Klanen eksisterer ikke **__${clanName}__** eksisterer ikke <@${msg.author.id}>...`).catch(() => { ; });
                    else return msg.channel.send(`${uncheckIcon} The clan **__${clanName}__** does not exist <@${msg.author.id}>...`).catch(() => { ; });
                } else { // already in a clan
                    if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous êtes déjà dans un clan <@${msg.author.id}>...`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du er allerede i en klan <@${msg.author.id}>...`).catch(() => { ; });
                    else return msg.channel.send(`${uncheckIcon} You're already in a clan <@${msg.author.id}>...`).catch(() => { ; });
                }
            } else if (args[0].toLowerCase() == `leave`) { // if clan leave
                if ((profile[msg.author.id].clan != false)) {
                    if (clan[profile[msg.author.id].clan].owner == msg.author.id) { // clan owner can't leave
                        if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous êtes le propriétaire de votre clan <@${msg.author.id}>, tapez \`${prefix}clan delete\` pour supprimer et quitter votre clan.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du er eieren av klanen din <@${msg.author.id}>, skriv \`${prefix}clan delete\` for å slette og forlate klanen din.`).catch(() => { ; });
                        else return msg.channel.send(`${uncheckIcon} You're the owner of your clan <@${msg.author.id}>, type \`${prefix}clan delete\` to delete and leave your clan.`).catch(() => { ; });
                    }
                    msg.react(`${checkIcon}`).catch(() => { ; });
                    msg.react(`${uncheckIcon}`).catch(() => { ; });
                    if (userLang == `FR`) msg.channel.send(`Cliquez sur la réaction ${checkIcon} si vous voulez quitter le clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) msg.channel.send(`Klikk på reaksjonen ${checkIcon} hvis du vil forlate klanen **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    else msg.channel.send(`Click on the reaction ${checkIcon} if you want to leave the clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    // First argument is a filter function
                    msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
                        { max: 1, time: 30000 }).then(collected => {
                            if (collected.first().emoji.name == `Check`) {
                                if (profile[msg.author.id].clan == false) return;
                                getca(`clanleave`, msg);
                                if (userLang == `FR`) return msg.channel.send(`${checkIcon} Vous avez quitté le clan <@${msg.author.id}>.`).catch(() => { ; });
                                else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Du har forlatt klanen <@${msg.author.id}>.`).catch(() => { ; });
                                else return msg.channel.send(`${checkIcon} You have left the clan <@${msg.author.id}>.`).catch(() => { ; });
                            }
                            else {
                                if (userLang == `FR`) return msg.channel.send(`Vous n'avez pas quitté votre clan ${msg.author.username}.`).catch(() => { ; });
                                else if (userLang == `NO`) return msg.channel.send(`Du har ikke forlatt klanen din ${msg.author.username}.`).catch(() => { ; });
                                else return msg.channel.send(`You haven't left your clan ${msg.author.username}.`).catch(() => { ; });
                            }
                        }).catch(() => {
                            if (userLang == `FR`) return msg.channel.send(`Vous n'avez pas quitté votre clan ${msg.author.username}.`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`Du har ikke forlatt klanen din ${msg.author.username}.`).catch(() => { ; });
                            else return msg.channel.send(`You haven't left your clan ${msg.author.username}.`).catch(() => { ; });
                        });
                } else return;
            } else if (args[0].toLowerCase() == `kick`) { // clan kick user
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    if (!args[1]) return;
                    if (args[1].startsWith(`<@`)) {
                        args[1] = args[1].slice(2, -1);
                        if (args[1].startsWith(`!`)) args[1] = args[1].slice(1);
                        if (!profile[args[1]]) { // user is not in DB
                            if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'est même pas inscrit.`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`Brukeren er ikke engang registrert. `).catch(() => { ; });
                            else return msg.channel.send(`The user is not even registered.`).catch(() => { ; });
                        } else if (profile[args[1]].clan != profile[msg.author.id].clan) { // user not in the same clan
                            if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'est pas dans votre clan, il est dans **__${profile[args[1]].clan}__** <@${msg.author.id}>`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`Brukeren er ikke i klanen din, han er i **__${profile[args[1]].clan}__** <@${msg.author.id}>`).catch(() => { ; });
                            else return msg.channel.send(`The user is not in your clan, he is in     **__${profile[args[1]].clan}__** <@${msg.author.id}>`).catch(() => { ; });
                        } else if (profile[args[1]].clan == profile[msg.author.id].clan) {
                            if (args[1] == msg.author.id) return;
                            getca(`clankick`, msg, args[1]);
                            if (userLang == `FR`) return msg.channel.send(`${checkIcon} ${profile[args[1]].name} a bien été exclus de votre clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`${checkIcon} ${profile[args[1]].name} er ekskludert fra klanen din **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                            else return msg.channel.send(`${checkIcon} ${profile[args[1]].name} has been excluded from your clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                        } else return msg.channel.send(`Error CN-KK1`).catch(() => { ; });
                    } else { // kick by user's name
                        for (i in clan[profile[msg.author.id].clan].members) {
                            if (profile[(clan[profile[msg.author.id].clan].members)[i]].name == args[1]) {
                                if ((clan[profile[msg.author.id].clan].members)[i] == msg.author.id) return;
                                if (profile[(clan[profile[msg.author.id].clan].members)[i]].clan != profile[msg.author.id].clan) { // user not in the clan
                                    if (userLang == `FR`) return msg.channel.send(`Cet utilisateur n'est pas dans votre clan <@${msg.author.id}>...`).catch(() => { ; });
                                    else if (userLang == `NO`) return msg.channel.send(`Denne brukeren er ikke i klanen din <@${msg.author.id}>...`).catch(() => { ; });
                                    else return msg.channel.send(`This user is not in your clan <@${msg.author.id}>...`).catch(() => { ; });
                                }
                                if (userLang == `FR`) msg.channel.send(`${checkIcon} ${profile[(clan[profile[msg.author.id].clan].members)[i]].name} a bien été exclus de votre clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                                else if (userLang == `NO`) msg.channel.send(`${checkIcon} ${profile[(clan[profile[msg.author.id].clan].members)[i]].name} er ekskludert fra klanen din **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                                else msg.channel.send(`${checkIcon} ${profile[(clan[profile[msg.author.id].clan].members)[i]].name} has been excluded from your clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                                getca(`clankick`, msg, (clan[profile[msg.author.id].clan].members)[i]); return;
                            }
                        }
                        if (userLang == `FR`) return msg.channel.send(`Aucun utilisateur de votre clan ne s'appelle comme ça <@${msg.author.id}>...`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Ingen i klanen din heter det <@${msg.author.id}>...`).catch(() => { ; });
                        else return msg.channel.send(`No one in your clan is called that <@${msg.author.id}>...`).catch(() => { ; });
                    }
                }
            } else if (args[0].toLowerCase() == `delete` || args[0].toLowerCase() == `remove`) { // clan delete
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    msg.react(`${checkIcon}`).catch(() => { ; });
                    msg.react(`${uncheckIcon}`).catch(() => { ; });
                    if (userLang == `FR`) msg.channel.send(`Cliquez sur la réaction ${checkIcon} si vous voulez quitter et supprimer le clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    else if (userLang == `NO`) msg.channel.send(`Klikk på reaksjonen ${checkIcon} hvis du vil forlate og slette klanen **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    else msg.channel.send(`Click on the reaction ${checkIcon} if you want to leave and delete the clan **__${profile[msg.author.id].clan}__** <@${msg.author.id}>.`).catch(() => { ; });
                    // First argument is a filter function
                    msg.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
                        { max: 1, time: 30000 }).then(collected => {
                            if (collected.first().emoji.name == `Check`) {
                                getca(`clandelete`, msg, profile[msg.author.id].clan)
                                if (userLang == `FR`) return msg.channel.send(`${checkIcon} Vous avez quitté et supprimé le clan...`).catch(() => { ; });
                                else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Du har forlatt og slettet klanen...`).catch(() => { ; });
                                else return msg.channel.send(`${checkIcon} You have left and deleted the clan...`).catch(() => { ; });
                            }
                            else if (userLang == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas quitté et supprimé votre clan ${msg.author.username}.`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke forlatt og slettet klanen din  ${msg.author.username}.`).catch(() => { ; });
                            else return msg.channel.send(`${uncheckIcon} You haven't left and delete your clan ${msg.author.username}.`).catch(() => { ; });
                        }).catch(() => { ; });
                } else return;

            } else if (args[0].toLowerCase() == `description`) { // clan description
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    if (!args[1] || args[1].toLowerCase() == "reset") { // reset description
                        getca(`clandescriptionreset`, msg);
                        if (userLang == `FR`) return msg.channel.send(`La description du clan a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Klanbeskrivelsen er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`The clan description has been reset <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    var desc = ``
                    for (let i = 1; i < args.length; i++) {
                        if (i == 1) { desc = desc + args[i] } else { desc = desc + ` ` + args[i] }
                    }
                    getca(`clandescription`, msg, desc, profile[msg.author.id].clan)
                    if (userLang == `FR`) return msg.channel.send(`La description \`${desc}\` a bien été ajoutée <@${msg.author.id}> !`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`Beskrivelsen \`${desc}\` er lagt til <@${msg.author.id}>!`).catch(() => { ; });
                    else return msg.channel.send(`The description \`${desc}\` has been added <@${msg.author.id}>!`).catch(() => { ; });
                } else return;

            } else if (args[0].toLowerCase() == `public`) { // for to set public the clan
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    if (clan[profile[msg.author.id].clan].status == true) {
                        if (userLang == `FR`) return msg.channel.send(`Le clan **__${profile[msg.author.id].clan}__** est déjà publique <@${msg.author.id}> !`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Klanen **__${profile[msg.author.id].clan}__** er allerede offentlig <@${msg.author.id}>!`).catch(() => { ; });
                        else return msg.channel.send(`The clan **__${profile[msg.author.id].clan}__** is already public <@${msg.author.id}>!`).catch(() => { ; });
                    } else {
                        getca(`clanpublic`, msg, profile[msg.author.id].clan);
                        if (userLang == `FR`) return msg.channel.send(`${checkIcon} Le clan **__${profile[msg.author.id].clan}__** est désormais publique <@${msg.author.id}>`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Klanen **__${profile[msg.author.id].clan}__** er nå offentlig <@${msg.author.id}>`).catch(() => { ; });
                        else return msg.channel.send(`${checkIcon} The clan **__${profile[msg.author.id].clan}__** is now public <@${msg.author.id}>`).catch(() => { ; });
                    }
                } else return;

            } else if (args[0].toLowerCase() == `private`) { // for to set private the clan
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    if (clan[profile[msg.author.id].clan].status == false) {
                        if (userLang == `FR`) return msg.channel.send(`Le clan **__${profile[msg.author.id].clan}__** est déjà prvié <@${msg.author.id}> !`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Klanen **__${profile[msg.author.id].clan}__** er allerede privat <@${msg.author.id}> !`).catch(() => { ; });
                        else return msg.channel.send(`The clan **__${profile[msg.author.id].clan}__** is already private <@${msg.author.id}> !`).catch(() => { ; });
                    } else {
                        getca(`clanprivate`, msg, profile[msg.author.id].clan);
                        if (userLang == `FR`) return msg.channel.send(`${checkIcon} Le clan **__${profile[msg.author.id].clan}__** est désormais privé <@${msg.author.id}>`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Klanen **__${profile[msg.author.id].clan}__** er nå privat <@${msg.author.id}>`).catch(() => { ; });
                        else return msg.channel.send(`${checkIcon} The clan **__${profile[msg.author.id].clan}__** is now private <@${msg.author.id}>`).catch(() => { ; });
                    }
                } else return;

            } else if (args[0].toLowerCase() == `invite`) { // clan invitation
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    // if clan is full
                    if (clan[profile[msg.author.id].clan].membersnb >= clan[profile[msg.author.id].clan].membersnblimit) { // full clan
                        if (userLang == `FR`) return msg.channel.send(`Le clan **__${profile[clan[i].owner].clan}__** est complet <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Klanen **__${profile[clan[i].owner].clan}__** er full <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`The clan **__${profile[clan[i].owner].clan}__** is full <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    if (!args[1] || !args[1].startsWith(`<@`)) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez mentionner un utilisateur <@${msg.author.id}>.`).catch(() => { ; });
                        if (userLang == `NO`) return msg.channel.send(`Du må nevne en bruker <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You must mention a user <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    args[1] = args[1].slice(2, -1);
                    if (args[1].startsWith(`!`)) args[1] = args[1].slice(1);
                    if (!profile[args[1]]) { // user is not in DB
                        if (userLang == `FR`) return msg.channel.send(`L'utilisateur n'est même pas inscrit <@${msg.author.id}>.`).catch(() => { ; });
                        if (userLang == `NO`) return msg.channel.send(`Brukeren er ikke engang registrert <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`The user is not even registered <@${msg.author.id}>.`).catch(() => { ; });
                    } else if (profile[args[1]].clan != false) { // user has a clan
                        if (userLang == `FR`) return msg.channel.send(`L'utilisateur est dans le clan **__${profile[args[1]].clan}__**, vous ne pouvez donc pas l'inviter <@${msg.author.id}>...`).catch(() => { ; });
                        if (userLang == `NO`) return msg.channel.send(`Brukeren er i klan **__${profile[args[1]].clan}__**, så du kan ikke invitere ham <@${msg.author.id}>...`).catch(() => { ; });
                        else return msg.channel.send(`The user is in clan **__${profile[args[1]].clan}__**, so you can't invite him <@${msg.author.id}>...`).catch(() => { ; });
                    } else if (profile[args[1]].clan == false) {
                        if (lang[args[1]] == `FR`) msg.channel.send(`<@${args[1]}> vous êtes invité dans le clan **__${profile[msg.author.id].clan}__** crée par <@${msg.author.id}>. Cliquez sur ${checkIcon} pour rejoindre le clan, ou ${uncheckIcon} pour refuser l'invitation.`).catch(() => { ; });
                        if (lang[args[1]] == `NO`) msg.channel.send(`<@${args[1]}> du er invitert inn i klanen **__${profile[msg.author.id].clan}__** laget av <@${msg.author.id}>. Velg ${checkIcon} for å bli med i klanen, eller ${uncheckIcon} for å avvise invitasjonen.`).catch(() => { ; });
                        else msg.channel.send(`<@${args[1]}> you are invited into the clan **__${profile[msg.author.id].clan}__** created by <@${msg.author.id}>. Choose ${checkIcon} to join the clan, or ${uncheckIcon} to decline the invitation.`).catch(() => { ; });
                        msg.react(`${checkIcon}`).catch(() => { ; });
                        msg.react(`${uncheckIcon}`).catch(() => { ; });
                        // First argument is a filter function
                        msg.awaitReactions((reaction, user) => user.id == args[1] && (reaction.emoji.name == `Check` || reaction.emoji.name == `Uncheck`),
                            { max: 1, time: 30000 }).then(collected => {
                                if (collected.first().emoji.name == `Check`) {
                                    if (profile[args[1]].clan != false) return;
                                    getca(`claninvite`, msg, profile[msg.author.id].clan, args[1]);
                                    if (lang[args[1]] == `FR`) return msg.channel.send(`${checkIcon} Vous avez rejoint le clan **__${profile[msg.author.id].clan}__** <@${args[1]}> !`).catch(() => { ; });
                                    if (lang[args[1]] == `NO`) return msg.channel.send(`${checkIcon} Du har blitt med i klanen **__${profile[msg.author.id].clan}__** <@${args[1]}> !`).catch(() => { ; });
                                    else return msg.channel.send(`${checkIcon} You have joined the clan **__${profile[msg.author.id].clan}__** <@${args[1]}> !`).catch(() => { ; });
                                }
                                else if (lang[args[1]] == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas rejoint le clan **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                                else if (lang[args[1]] == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke blitt med i klanen **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                                else return msg.channel.send(`${uncheckIcon} You have not joined the clan **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                            }).catch(() => {
                                if (lang[args[1]] == `FR`) return msg.channel.send(`${uncheckIcon} Vous n'avez pas rejoint le clan **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                                else if (lang[args[1]] == `NO`) return msg.channel.send(`${uncheckIcon} Du har ikke blitt med i klanen **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                                else return msg.channel.send(`${uncheckIcon} You have not joined the clan **__${profile[msg.author.id].clan}__** <@${args[1]}>.`).catch(() => { ; });
                            });
                    } else return msg.channel.send(`Error CN-IE1`).catch(() => { ; });
                } else return;

            } else if (args[0].toLowerCase() == `color`) { // clan color
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    if (!args[1]) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez mettre une couleur en code décimal, ou hexadecimal (avec un # devant) <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Du må sette en farge i desimalkode eller heksadesimal kode (med et # foran) <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You have to put a color in decimal code, or hexadecimal code (with a # in front) <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    if ((args[1].length > 8)) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez mettre une couleur en code décimal, ou hexadecimal (avec un # devant) <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Du må sette en farge i desimalkode eller heksadesimal kode (med et # foran) <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You have to put a color in decimal code, or hexadecimal code (with a # in front) <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    args[1] = (args[1].startsWith(`#`) == true) ? args[1].toString(16) : parseInt(args[1]);
                    if (!args[1] || args[1] == `NaN`) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez mettre une couleur en code décimal, ou hexadecimal (avec un # devant) <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Du må sette en farge i desimalkode eller heksadesimal kode (med et # foran) <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You have to put a color in decimal code, or hexadecimal code (with a # in front) <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    getca(`clancolor`, msg, profile[msg.author.id].clan, args[1]);
                    if (userLang == `FR`) return msg.channel.send(`${checkIcon} La couleur du clan à bien changé en \`${args[1]}\` <@${msg.author.id}> !`).catch(() => { ; });
                    else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Fargen på klanen har endret seg \`${args[1]}\` <@${msg.author.id}> !`).catch(() => { ; });
                    else return msg.channel.send(`${checkIcon} The color of the clan has changed in \`${args[1]}\` <@${msg.author.id}> !`).catch(() => { ; });
                }
            } else if (args[0].toLowerCase() == `picture` || args[0].toLowerCase() == `image`) { // clan picture
                if ((profile[msg.author.id].clan != false) && (clan[profile[msg.author.id].clan].owner == msg.author.id)) {
                    try {
                        if (args[1].toLowerCase() == "reset") {
                            getca(`profilepicturereset`, msg);
                            if (userLang == `FR`) return msg.channel.send(`${checkIcon} La photo du clan a été réinitialisée <@${msg.author.id}>.`).catch(() => { ; });
                            else if (userLang == `NO`) return msg.channel.send(`${checkIcon} Bildet av klanen er tilbakestilt <@${msg.author.id}>.`).catch(() => { ; });
                            else return msg.channel.send(`${checkIcon} The photo of the clan has been reset <@${msg.author.id}>.`).catch(() => { ; });
                        }
                    } catch { ; };
                    if (!args[1] || (validURL(args[1]) == false)) {
                        if (userLang == `FR`) return msg.channel.send(`Vous devez mettre le lien vers votre image <@${msg.author.id}>.`).catch(() => { ; });
                        else if (userLang == `NO`) return msg.channel.send(`Du må sette lenken til bildet ditt <@${msg.author.id}>.`).catch(() => { ; });
                        else return msg.channel.send(`You must put the link to your image <@${msg.author.id}>.`).catch(() => { ; });
                    }
                    getca(`clanpicture`, msg, profile[msg.author.id].clan, args[1]);
                    if (userLang == `FR`) {msg.channel.send(`${checkIcon} L'image a bien été mise à jour <@${msg.author.id}> ! La voici :`).catch(() => { ; }); return msg.channel.send(`${args[1]}`).catch(() => { ; });}
                    if (userLang == `NO`) {msg.channel.send(`${checkIcon} Bildet er oppdatert <@${msg.author.id}> ! La voici :`).catch(() => { ; }); return msg.channel.send(`${args[1]}`).catch(() => { ; });}
                    else {msg.channel.send(`${checkIcon} The image has been updated <@${msg.author.id}> ! Here it is:`).catch(() => { ; }); return msg.channel.send(`${args[1]}`).catch(() => { ; });}
                }
            } else { // for see a clan info
                var clanName = ""; for (let i = 0; i < args.length; i++) { if (i == 0) { clanName = clanName + args[i] } else { clanName = clanName + " " + args[i] } };
                for (i in clan) {
                    if (i.toLowerCase() == clanName.toLowerCase()) {
                        printClan(i); return;
                    }
                }
                if (userLang == `FR`) return msg.channel.send(`<@${msg.author.id}> le clan **__${clanName}__** n'existe pas...`).catch(() => { ; });
                else if (userLang == `NO`) return msg.channel.send(`<@${msg.author.id}> Klan **__${clanName}__** eksisterer ikke...`).catch(() => { ; });
                else return msg.channel.send(`<@${msg.author.id}> Clan **__${clanName}__** does not exist...`).catch(() => { ; });
            }
        }

    }
};