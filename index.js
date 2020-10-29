const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setPresence({
        activity: {
            name: 'Jules',
            type: "WATCHING",
        },
        status: "dnd"
    });
});

client.on('message', msg => {
    // || msg.author.id === "336458121180610560"
    if (msg.author.id === client.user.id) return;

    if(msg.content.toLocaleLowerCase() === "ping") {
        msg.reply("pong!");
    }

    if (msg.content.toLocaleLowerCase().startsWith("bonjour") || msg.content.toLocaleLowerCase().startsWith("salut")) {
        msg.channel.send(`Bonjour ${msg.author} !`);
    }

    if (msg.content.toLowerCase().startsWith("!repeat")) {
        msg.delete({ timeout: 100 })
        const arg = msg.content.slice(1).split(' ');
        ann = "";
        for (let i = 1; i < arg.length; i++) {
            if (i === 1) { ann = ann + arg[i] } else { ann = ann + " " + arg[i] }
        }
        msg.channel.send(ann);
    }

    if (msg.content.toLocaleLowerCase() === "<@!765648471058546698>") {
        msg.channel.send("Arrête de me ping <@" + msg.author.id + "> !");
    }

    if (msg.content.toLocaleLowerCase() === "BIE") {msg.channel.send("Quelqu'un m'a appelé ?");}

    if (msg.content.toLocaleLowerCase().startsWith("!mp")) {
        const arg = msg.content.slice(1).split(' ');
        mpmessage = "";
        for (let i = 2; i < arg.length; i++) {
            if (i === 1) { mpmessage = mpmessage + arg[i] } else { mpmessage = mpmessage + " " + arg[i] }
        }
        let authoruser = client.users.cache.get(arg[1]);
        authoruser.send("Une personne annonyme t'a envoyé \"" + mpmessage + " \"");
    }
});

client.login(process.env.TOKEN);