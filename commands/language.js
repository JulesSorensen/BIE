module.exports = {
    name: 'language',
    description: 'Information about the arguments provided.',
    args: false,
    guildOnly: false,
    usage: '[EN,FR,NO]',
    execute(msg, args, client, prefix, getca) {
        lang = getca("language", msg)
        // default
        if (!lang[msg.author.id]) {
            getca("changelanguage", msg, "EN");
        };
        if (!args[0]) {
            if (lang[msg.author.id] === "EN") {
                return msg.channel.send("The language is currently set to English. Type the command `" + prefix + "help language` for more help on the command.")
            } else if (lang[msg.author.id] === "FR") {
                return msg.channel.send("La langue est actuellement mis en Français. Tapez la commande `" + prefix + "aide langue` pour plus d'aide sur la commande.")
            } else if (lang[msg.author.id] === "NO") {
                return msg.channel.send("Språket er for øyeblikket satt til Norsk. Skriv inn kommandoen `" + prefix + "hjelpe språk` for mer hjelp.")
            } else {
                return msg.channel.send("Error LE1 sent")
            }
        }
        // EN LANGUAGE
        if (args[0].toLowerCase() === "en") {
            if (lang[msg.author.id] === "EN") return msg.channel.send("Don't you recognize your language? Don't worry, it's already done. 😉");
            else {
                msg.channel.send("It's cool, this language is known by many people! I changed it for you. 😉")
                getca("changelanguage", msg, "EN");
            }
            // FR LANGUAGE
        } else if (args[0].toLowerCase() === "fr") {
            if (lang[msg.author.id] === "FR") return msg.channel.send("Mdr quoi, tu ne reconnais même pas ta langue... Au cas où, je l'ai fais ne t'inquiètes pas.  😉");
            else {
                msg.channel.send("Pas mal, cette langue est subtile, bonne chance pour comprendre ! C'est fait. 😉")
                getca("changelanguage", msg, "FR");
            }
            // NO LANGUAGE
        } else if (args[0].toLowerCase() === "no") {
            if (lang[msg.author.id] === "NO") return msg.channel.send("Det er allerede på norsk... 😂");
            else {
                msg.channel.send("Bra valg, jeg elsker dette språket og dette landet, men det er bare personlig! Ok, det er endret. 😉")
                getca("changelanguage", msg, "NO");
            }
            // unknown language
        } else return msg.channel.send("I don't speak that language, sorry... 😔\nPlease type `EN`, `FR` or `NO`.")
    }
};