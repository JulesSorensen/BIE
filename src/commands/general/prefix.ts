module.exports = {
    name: 'prefix',
    guildOnly: true,
    execute(msg, args, client, prefix, getca, version) {
        let lang = getca("language", msg)
        let customprefix = getca("customprefix", msg)
        if (msg.member.permissions.has('ADMINISTRATOR')) {
            if (!args[0]) {
                if (!customprefix[msg.guild.id]) {
                    msg.channel.send("`&` is the current prefix")
                } else {
                    msg.channel.send("`" + customprefix[msg.guild.id] + "` is the current prefix.")
                }
            } else {
                getca("changeprefix", msg, args[0])
                if (lang[msg.author.id] === "FR") return msg.channel.send("Parfait, j'ai changé votre préfix en `" + args[0] + "`. 👍")
                else if (lang[msg.author.id] === "NO") return msg.channel.send("Perfekt, jeg endret prefikset ditt til `" + args[0] + "`. 👍")
                else return msg.channel.send("Perfect, I changed your prefix to `" + args[0] + "`. 👍");
            }
        } else if (lang[msg.author.id] === "FR") return msg.channel.send("Vous n'avez pas la permission d'utiliser cette commande...");
        else if (lang[msg.author.id] === "NO") return msg.channel.send("Du har ikke tillatelse til å bruke denne kommandoen...");
        else return msg.channel.send("You do not have permission to use this command...");
    }
};