module.exports = {
	name: 'edt',
	description: 'PRIVATE CMD',
    args: false,
    guildOnly: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
        let checkIcon = client.emojis.cache.get(`866581082551615489`).toString(); let uncheckIcon = client.emojis.cache.get(`866581082870513684`).toString(); let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
        if(msg.guild.id != `762698485011054602` && msg.guild.id != `831823187213680682`) return;
        let edt = getca(`edt`);
        
        if (!args[0]) {
            function getPreviousMonday() {
                var date = new Date();
                var day = date.getDay();
                var prevMonday = new Date();
                if(date.getDay() == 0){
                    prevMonday.setDate(date.getDate() - 6);
                } else {
                    prevMonday.setDate(date.getDate() - (day-1));
                }
                return prevMonday;
            }
            var datesplit = (getPreviousMonday().toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) {datesplit[index] = `20${item}`;} else if (item.length == 1) {datesplit[index] = `0${item}`;}
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
            if(!edt[datefinale]) {
                msg.react(searchIcon).catch(()=>{;});
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> \`${msg.channel.id}\`-\`${msg.id}\` attends l'emploi du temps ${searchIcon}...`).catch(()=>{;});
            } else {
                if (edt[datefinale].desc == 0) {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**`, { files: [edt[datefinale].link]}).catch(()=>{;});
                } else {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de cette semaine**\n**Détails:** ${edt[datefinale].desc}`, { files: [edt[datefinale].link]}).catch(()=>{;});
                }
                return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 1  send to <@${msg.author.id}>`).catch(()=>{;});
            }
    } else if (args[0] == `2` || args[0].toLowerCase() == `suivant` || args[0].toLowerCase() == `s`) {
            var nextMonday = new Date();
            nextMonday.setDate(nextMonday.getDate() + 1);
            nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) {datesplit[index] = `20${item}`;} else if (item.length == 1) {datesplit[index] = `0${item}`;}
            });
            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
            if(!edt[datefinale]) {
                msg.react(searchIcon).catch(()=>{;});
                return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${msg.author.id}> \`${msg.channel.id}\`-\`${msg.id}\` attends l'emploi du temps de la semaine prochaine ${searchIcon}...`).catch(()=>{;});
            } else {
                if (edt[datefinale].desc == 0) {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**`, { files: [edt[datefinale].link]}).catch(()=>{;});
                } else {
                    msg.lineReply(`🗓️ **__[${datefinale}]__ | Voici l'emploi du temps de la semaine prochaine**\n**Détails:** ${edt[datefinale].desc}`, { files: [edt[datefinale].link]}).catch(()=>{;});
                }
                return (client.channels.cache.get(`874251822045487125`)).send(`🗓️ EDT 2 send to <@${msg.author.id}>`).catch(()=>{;});
            }
        }
        if(msg.author.id == `676690539126718467`) {
            if(args[0]) {
                if (args[0].toLowerCase() == `add` ||  args[0].toLowerCase() == `a`) {
                    if(!args[2]) return msg.channel.send(`&edt add [!date] [!link] [?desc]`);
                    var desc = (!args[3]) ? 0 : args.slice(3).join(' ');
                    getca(`edtadd`, msg, args[1], args[2], desc);
                    return (client.channels.cache.get(`874251822045487125`)).send(`➕ EDT ${args[1]} ajouté`).catch(()=>{;});
                } else if (args[0].toLowerCase() == `reset` || args[0].toLowerCase() == `r`) {return getca(`edtreset`, msg);
                } else if (args[0].toLowerCase() == `show`) {return msg.channel.send("**LAST EDT DATA FILE**", { files: ["data/edt.json"] });
                } else if (args[0].toLowerCase() == `send`) {
                    if (!args[3]) return msg.reply(`&edt send [!date] [!channelID] [!msgID] [?2:semaineprochaine]`);
                    var semaine = (!args[4]) ? "cette semaine" : "la semaine prochaine"
                    let ch2 = client.channels.cache.get(args[2]);
                    let msg2 = ch2.messages.cache.get(args[3]);
                    if (edt[args[1]].desc == 0) {
                        try{msg2.lineReply(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps de ${semaine}**`, { files: [edt[args[1]].link]}); msg2.reactions.cache.get('868852714690478090').remove()}catch(error){() => {;}}
                    } else {
                        try{msg2.lineReply(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps de ${semaine}**\n**Détails:**\n${edt[args[1]].desc}`, { files: [edt[args[1]].link]}); msg2.reactions.cache.get('868852714690478090').remove();}catch(error){() => {;}}
                    }
                    return;
                } else if (args[0].toLowerCase() == `sendmp`) {
                    if (!args[2]) return msg.reply(`&edt sendmp [!date] [!userID] [?2:semaineprochaine]`).catch(()=>{;});
                    var semaine = (!args[3]) ? "cette semaine" : "la semaine prochaine"
                    let userToSend = client.users.cache.get(args[2]);
                    if (edt[args[1]].desc == 0) {
                        try{userToSend.send(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps de ${semaine}**`, { files: [edt[args[1]].link]}).catch(()=>{;}); }catch(error){() => {;}}
                    } else {
                        try{userToSend.send(`🗓️ **__[${args[1]}]__ | Voici l'emploi du temps de ${semaine}**\n**Détails:**\n${edt[args[1]].desc}`, { files: [edt[args[1]].link]}).catch(()=>{;});}catch(error){() => {;}}
                    }
                    return;
                } else if (args[0].toLowerCase() == `rmd` || args[0].toLowerCase() == `remindme`) {
                    if(!args[1]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(()=>{;});
                    if(args[1] == `show`) {
                        getca(`edtremindshow`, msg); return;
                    } else if(args[1] == `reset`) {
                        getca(`edtremindreset`, msg); return;
                    }
                    if(!args[2]) return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(()=>{;});
                    let edtremind = getca(`edtremind`);
                    args[2] = args[2].split(`,`);
                    if (args[1] == `1` || args[1] == `s1`) {
                        var date = new Date();
                        var day = date.getDay();
                        var prevMonday = new Date();
                        if(date.getDay() == 0){
                            prevMonday.setDate(date.getDate() - 6);
                        } else {
                            prevMonday.setDate(date.getDate() - (day-1));
                        }
                        args[2].forEach((item, index) => {
                            if(index > 0) {prevMonday.setDate(prevMonday.getDate() + 1);}
                            var datesplit = (prevMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                            datesplit.forEach((item, index) => {
                                if (index == 2) {datesplit[index] = `20${item}`;} else if (item.length == 1) {datesplit[index] = `0${item}`;}
                            });
                            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
                            if(!item.includes(`?`)) {
                                getca(`edtremindadd`, msg, datefinale, item);
                            }
                        })
                    } else if (args[1] == `2` || args[1] == `s2`) {
                        var nextMonday = new Date();
                        nextMonday.setDate(nextMonday.getDate() + 1);
                        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
                        args[2].forEach((item, index) => {
                            if(index > 0) {nextMonday.setDate(nextMonday.getDate() + 1);}
                            var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
                            datesplit.forEach((item, index) => {
                                if (index == 2) {datesplit[index] = `20${item}`;} else if (item.length == 1) {datesplit[index] = `0${item}`;}
                            });
                            var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;
                            if(!item.includes(`?`)) {
                                getca(`edtremindadd`, msg, datefinale, item);
                            }
                        })
                    } else return msg.channel.send(`&edt rmd [s1,s2] h1,h2,??,h4,h5,??,??`).catch(()=>{;});
                    msg.channel.send(`Fait, \`&edt rmd show\` pour afficher le fichier`).catch(()=>{;});
                } else if (args[0].toLowerCase() == `changement`) {
                    if(!args[1] || args[1] == `1`) {
                        var msg = `🗓️ Un changement a été effectué sur l'emploi du temps de cette semaine.`;
                    } else {
                        var msg = `🗓️ Un changement a été effectué sur l'emploi du temps de la semaine prochaine.`;
                    }
                    (client.channels.cache.get(`868524232898908190`)).send(msg);
                }
            }
        }
	}
};