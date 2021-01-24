module.exports = {
    name: 'salonjules',
    description: 'Information about the arguments provided.',
    args: false,
    usage: 'test',
    execute(msg, args, client, prefix, getca, version) {
        // BUREAU DE JULES
        if (msg.content.toLowerCase().startsWith("&open")) {
            if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") { return msg.reply("vous n'êtes pas autorisé à faire ceci.") }
            let salon = client.channels.cache.get("781439824665116682")
            salon.updateOverwrite(salon.guild.roles.everyone, { CONNECT: true })
            msg.reply("j'ai bien ouvert le bureau 🔓")
            return;
        }
        if (msg.content.toLowerCase().startsWith("&close")) {
            if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") { return msg.reply("vous n'êtes pas autorisé à faire ceci.") }
            let salon = client.channels.cache.get("781439824665116682")
            salon.updateOverwrite(salon.guild.roles.everyone, { CONNECT: false })
            msg.reply("j'ai bien fermé le bureau 🔒")
            return;
        }
        if (msg.content.toLowerCase().startsWith("&unhide")) {
            if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") { return msg.reply("vous n'êtes pas autorisé à faire ceci.") }
            let salon = client.channels.cache.get("781439824665116682")
            salon.updateOverwrite(salon.guild.roles.everyone, { VIEW_CHANNEL: true })
            msg.reply("le salon est réapparu 🕶")
            return;
        }
        if (msg.content.toLowerCase().startsWith("&hide")) {
            if (msg.author.id != "697717795227697173" && msg.author.id != "304366314850353154") { return msg.reply("vous n'êtes pas autorisé à faire ceci.") }
            let salon = client.channels.cache.get("781439824665116682")
            salon.updateOverwrite(salon.guild.roles.everyone, { VIEW_CHANNEL: false })
            msg.reply("j'ai bien caché le salon 👓")
            return;
        }
        if (msg.content.toLowerCase().startsWith("&j")) {
            msg.channel.send("<@697717795227697173> l'utilisateur <@" + msg.author.id + "> veut rejoindre le salon.\nVous avez 5 minutes pour accepter, refuser, mettre en attente, ou bloquer la demande.").then(msg2 => {
                msg2.react('✅')
                msg2.react('❎');
                msg2.react('🕦');
                msg2.react('⛔');
                msg2.react('📄');
                msg2.awaitReactions((reaction, user) => user.id == "697717795227697173" && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎' || reaction.emoji.name == '🕦' || reaction.emoji.name == '⛔' || reaction.emoji.name == '📄'), { max: 1, time: 300000 }).then(collected => {
                    if (collected.first().emoji.name == '✅') {
                        msg.reply("vous avez été accepté. 😎");
                        membreamoove = client.users.cache.get(msg.author.id);
                        channelamoove = client.channels.cache.get("781439824665116682")
                        membreamoove.voice.setChannel(channelamoove);
                    } else if (collected.first().emoji.name == '❎') {
                        msg.reply("vous avez été refusé... 😥");
                    } else if (collected.first().emoji.name == '🕦') {
                        msg.reply("vous êtes en attente, contactez <@697717795227697173> pour savoir dans combien de temps il vous acceptera. 🕘");
                    } else if (collected.first().emoji.name == '⛔') {
                        msg.reply("vous avez été refusé...");
                    } else if (collected.first().emoji.name == '📄') {
                        msg.reply("vous allez être enregistré dans la liste des utilisateurs autorisés constamment. 😊");
                    }
                }).catch(() => { msg.reply('malheureusement il vous a ignoré... 😟'); });
            })
            // personne = client.users.cache.get(msg.author.id);
            // personne.setVoiceChannel("781439824665116682");
        }
    }
};