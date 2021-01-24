const fs = require('fs');
const Discord = require(`discord.js`);
const config = require("./config/config.json");
let prefix = config.prefix;
let version = "1.0.0";

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let customprefix = require("./data/prefix.json");
let lang = require("./data/lang.json");

client.on('ready', () => {
    console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + " ✅\n-----");
    client.user.setPresence({
        activity: {
            name: '&help',
            type: "WATCHING"
        }
    });
});

// read / set commands files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

fs.readdir(`./commands/`, (error, files) => {
    if (error) { return console.log("Error while trying to get the commmands."); };
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });
});

// user mention
function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

// for get something here inside a command file
function getca(thing, msg, arg1, arg2, arg3) {
    switch (thing) {
        case "changeprefix":
            changeprefix(arg1, msg);
            break;
        case "changelanguage":
            changelanguage(arg1, msg);
            break;
        case "language":
            return lang
        case "customprefix":
            return customprefix
        default:
            break;
    }
}
// functions for edit json files | data base
function changeprefix(pref, msg) {
    customprefix[msg.guild.id] = pref
    fs.writeFile("./data/prefix.json", JSON.stringify(customprefix), err => {
        if (err) throw err;
    });
}
function changelanguage(language, msg) {
    lang[msg.author.id] = language
    fs.writeFile("./data/lang.json", JSON.stringify(lang), err => {
        if (err) throw err;
    });
}

// on message = commands let's find the command file
client.on('message', msg => {
    if (msg.author.bot || msg.channel.type == "dm") return;
    // custom prefix
    let prefix = config.prefix;
    if (!customprefix[msg.guild.id]) {
        prefix = config.prefix;
    } else {
        prefix = customprefix[msg.guild.id];
    }
    if (!msg.content.startsWith(prefix)) return;
    if (msg.content.toLowerCase() == "&prefix") return msg.reply("`"+prefix+"` is the current prefix.")

    const args = msg.content.slice(prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    // alias
    switch (commandName) {
        case 'ann': // annonce efficom
            commandName = 'annonce';
            break;
        case 'hide':
        case 'show':
        case 'close':
        case 'open':
        case 'join': // efficom
            commandName = 'salonjules';
            break;
        case 'pierrefeuilleciseau':
        case 'pierrefeuilleciseaux':
            commandName = 'pfc';
            break;
        case 'aide':
        case 'hjelp': // help
            commandName = 'help';
            break;
        case 'rmd':
        case 'rmdm':
        case 'rmdme':
        case 'rm': // remind me
            commandName = 'remindme';
            break;
        case 'lang':
        case 'langue':
        case 'språk':
        case 'sprak':
            commandName = 'language';
            break;
        default:
            break;
    }
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && msg.channel.type !== 'text') {
        return msg.reply('Je ne peux pas éxecuter cette commande dans les messages privés !');
    }

    if (command.args && !args.length) {
        return msg.channel.send(`Votre commande est incorrecte, tapez \`${prefix}aide ${commandName}\` pour savoir comment marche cette commande.`);
    }

    try {
        command.execute(msg, args, client, prefix, getca, version);
    } catch (error) {
        console.error(error);
        msg.channel.send("Error CD1");
    }
});

// login
client.login(process.env.TOKEN);