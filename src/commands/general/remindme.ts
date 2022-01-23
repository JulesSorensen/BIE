module.exports = {
    name: 'remindme',
    guildOnly: false,
    execute(msg, args, client, prefix, getca, version) {
        let lang = getca("language", msg)
        if (!args[0]) {
            if (lang[msg.author.id] == "FR") return msg.channel.send(msg.author + " il faut indiquer dans combien de temps voulez-vous votre rappel, exemple : `"+prefix+"remindme 1h30` ou `"+prefix+"rmd 5m`\nAttention, seulement les heures et les minutes fonctionnent pour le moment.");
            else if (lang[msg.author.id] == "NO") return msg.channel.send(msg.author + " du må angi hvor lenge du vil ha påminnelsen din, eksempel : `"+prefix+" minne meg 1h30` eller `"+prefix+"rmd 5m`.\nAdvarsel, bare timer og minutter fungerer for øyeblikket.");
            else return msg.channel.send(msg.author+" you need to indicate how long you want your reminder for, e.g. `"+prefix+"remindme 1h30` or `"+prefix+"rmd 5m`.\nWarning, only hours minutes and seconds work at the moment.")
        }
        let fait = false
        let attente = 0;
        // temps d'attente | args[0] 
        if (args[0].toLowerCase().indexOf('h') > -1) {
            if (args[0].toLowerCase().indexOf('m') > -1) {
                argstemps = args[0].split('h').join('m').split('m')
                argstemps = [argstemps[0], argstemps[1]]
            } else {
                argstemps = args[0].split('h')
                if (!argstemps[1]) {
                    argstemps[1] = 0
                }
            }
        } else if (args[0].toLowerCase().indexOf(':') > -1) {
            if (args[0].toLowerCase().indexOf('m') > -1) {
                argstemps = args[0].split(':').join('m').split('m')
            } else {
                argstemps = args[0].split(':')
                if (!argstemps[1]) {
                    argstemps[1] = 0
                }
            }
        } else if (args[0].toLowerCase().indexOf('m') > -1) {
            if (!(args[0].toLowerCase().indexOf('h') > -1)) {
                argstemps = args[0].split('m')
                argstemps[1] = argstemps[0]
                argstemps[0] = 0
            }
        } else if (args[0].toLowerCase().indexOf('s') > -1) {
            var argstemps = args[0].split('s')
            argstemps[2] = argstemps[0]
            argstemps[1] = 0
            argstemps[0] = 0
            attente = argstemps[2] * 1000
            fait = true
        } else {
            if (lang[msg.author.id] == "FR") return msg.channel.send(msg.author + " il faut indiquer dans combien de temps voulez-vous votre rappel, exemple : `"+prefix+"remindme 1h30` ou `"+prefix+"rmd 5m`\nAttention, seulement les heures et les minutes fonctionnent pour le moment.");
            else if (lang[msg.author.id] == "NO") return msg.channel.send(msg.author + " du må angi hvor lenge du vil ha påminnelsen din, eksempel : `"+prefix+" minne meg 1h30` eller `"+prefix+"rmd 5m`.\nAdvarsel, bare timer og minutter fungerer for øyeblikket.");
            else return msg.channel.send(msg.author+" you need to indicate how long you want your reminder for, e.g. `"+prefix+"remindme 1h30` or `"+prefix+"rmd 5m`.\nWarning, only hours minutes and seconds work at the moment.")
        }
        const heure = new Date().getHours();
        const minutes = new Date().getMinutes();
        var rmdheure = heure + parseInt(argstemps[0], 10);
        var rmdminutes = minutes + parseInt(argstemps[1], 10);
        if (rmdminutes >= 60) {
            rmdheure += 1;
            rmdminutes -= 60;
        } if (rmdheure > 23) {
            rmdheure -= 24;
        }
        rmdheure += 1 // decalage horraire
        // message enregistré dans les derniers args[]
        let mess = ""
        for (let i = 1; i < args.length; i++) {
            if (i == 1) { mess = mess + args[i] } else { mess = mess + " " + args[i] }
        }
        // réponse
        if (!args[1]) {
            if (lang[msg.author.id] == "FR") msg.reply("vous serez mentionner à " + rmdheure + "h" + rmdminutes + ".");
            else if (lang[msg.author.id] == "NO") msg.reply("du vil bli nevnt klokken " + rmdheure + "." + rmdminutes + ".")
            else msg.reply("you will be mentioned at" + rmdheure + ":" + rmdminutes + " (24h format).")
        } else {
            if (lang[msg.author.id] == "FR") msg.reply("vous serez mentionner à " + rmdheure + "h" + rmdminutes + " pour `" + mess + "`.");
            else if (lang[msg.author.id] == "NO") msg.reply("du vil bli nevnt klokken " + rmdheure + "." + rmdminutes + " til `" + mess + "`.")
            else msg.reply("you will be mentioned at" + rmdheure + ":" + rmdminutes + " (24h format)," + " for `" + mess + "`.")
        }
        // attente = temps en ms
        if (!fait) {
            attente = ((+argstemps[0] * (60000 * 60)) + (+argstemps[1] * 60000));
        }
        setTimeout(function () {
            // envoi du rappel en message privé
            let personne = client.users.cache.get(msg.author.id);
            if (!args[1]) {
                personne.send(rmdheure + "h" + minutes + " 🔔").catch(() => msg.channel.send("<@"+msg.author.id+"> > " + rmdheure + "h" + minutes + " 🔔"));
            } else {
                personne.send(rmdheure + "h" + minutes + " 🔔 `" + mess + "`").catch(() => msg.channel.send("<@"+msg.author.id+"> > " + rmdheure + "h" + minutes + " 🔔 `" + mess + "`"));
            }
        }, attente);
    }
};