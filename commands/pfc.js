module.exports = {
    name: 'pfc',
    description: 'Information about the arguments provided.',
    args: false,
    execute(msg, args, client, prefix, version, fs, customprefix, lang, changeprefix, changelanguage) {
        // var finpartie = false;
        // var scorejoueur = 0;
        // var scorebot = 0;
        // // fonctions
        // function pfcrandom() {
        //     switch (Math.floor(Math.random() * 3) + 1) {
        //         case 1:
        //             return "pierre";
        //             break;
        //         case 2:
        //             return "feuille";
        //             break;
        //         case 3:
        //             return "ciseau";
        //             break;
        //     }
        // };
        // function scoreactuel() {
        //     if (scorejoueur == 3 || scorebot == 3) {
        //         finpartie = true;
        //     };
        //     return;
        // }
        // function pfcjeu() {
        //     msg.reply("**choississez `pierre` `feuille` ou `ciseau`, entrez votre réponse ci dessous ⤵**")
        //     msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 15000 }).then(collected => {
        //         repjoueur = collected.first().content;
        //         if (repjoueur.toLowerCase().startsWith("p")) { // si le joueur choisi pierre
        //             pfcbot = pfcrandom();
        //             if (pfcbot == "pierre") { // pierre contre pierre
        //                 msg.reply("👊 **contre** 👊, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else if (pfcbot == "feuille") {
        //                 scorebot++;
        //                 msg.reply("👊 **contre** ✋, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else {
        //                 scorejoueur++;
        //                 msg.reply("👊 **contre** 🤞, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             }
        //         } else if (repjoueur.toLowerCase().startsWith("f")) { // si le joueur choisi feuille
        //             pfcbot = pfcrandom()
        //             if (pfcbot == "pierre") { // feuille contre pierre
        //                 scorejoueur++;
        //                 msg.reply("✋ **contre** 👊, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else if (pfcbot == "feuille") {
        //                 msg.reply("✋ **contre** ✋, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else {
        //                 scorebot++;
        //                 msg.reply("✋ **contre** 🤞, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             }
        //         } else if (repjoueur.toLowerCase().startsWith("c")) { // si le joueur choisi ciseau
        //             pfcbot = pfcrandom()
        //             if (pfcbot == "pierre") { // ciseau contre pierre
        //                 scorebot++;
        //                 msg.reply("🤞 **contre** 👊, vous perdez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else if (pfcbot == "feuille") {
        //                 scorejoueur++;
        //                 msg.reply("🤞 **contre** ✋, vous gagnez !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             } else {
        //                 msg.reply("🤞 **contre** 🤞, égalité !\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­");
        //             }
        //         } else { scorebot++; msg.reply("vous avez répondu n'importe quoi donc vous perdez un point...\n" + "\n__Score__: " + scorejoueur + " / " + scorebot + "\n<@" + msg.author.id + "> / <@" + client.user.id + ">\n­"); }
        //         scoreactuel();
        //         if (finpartie == false) {
        //             pfcjeu();
        //         } else {
        //             if (scorejoueur > scorebot) {
        //                 return msg.channel.send("🏆 **La partie est finie, __vous avez gagné__ <@" + msg.author.id + ">...**");
        //             } else if (scorejoueur < scorebot) {
        //                 return msg.channel.send("😎 **La partie est finie, __vous avez perdu__ <@" + msg.author.id + "> !**");
        //             };
        //         }
        //     }).catch(() => { msg.reply("vous n'avez pas répondu assez vite, j'annule la partie..."); finpartie = true; });
        // };
        // pfcjeu();
    }
};