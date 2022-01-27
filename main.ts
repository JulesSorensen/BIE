import Discord from 'discord.js';
require('dotenv').config()
import { Client, Collection, Intents } from 'discord.js';
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
// @ts-ignore
client.commands = new Discord.Collection();
import fs from 'file-system'

import config from './src/config/config.json';
import { commandLaunch, interactionLaunch } from './src/commands/commandLauch';
import { reactionAdded, reactionRemoved } from './src/tasks/reactions';
import { edtReminderCheck, edtSenderCheck, mygesCheck } from './src/tasks/intervalsCheck';

const version = "3.0.0";
let prefix = config.prefix;

const authServers = ["762698485011054602", "783679631101526056", "831823187213680682"];
const bannedUsers = ["858320039286800404", "839602909942906891"];
const compatibleFolders = ["efficom"];


fs.readdir(`./src/commands/`, (error, folders) => {
    if (error) { return console.log(`Error while trying to get the commmands. 1`, error); };
    folders.forEach(folder => {
        if (fs.statSync(`./src/commands/${folder}`).isDirectory() && (compatibleFolders.includes(folder))) {
            fs.readdir(`./src/commands/${folder}`, (error, files) => {
                if (error) { return console.log(`Error while trying to get the commmands. 2`); };
                files.forEach(file => {
                    const command = require(`./src/commands/${folder}/${file}`);
                    // @ts-ignore
                    client.commands.set(command.name, command);
                });
            });
        };
    });
});


client.on('ready', () => {
    console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + ` ✅\n-----\n`);
    client.user.setActivity({ name: '&help', type: `WATCHING` });

    edtReminderCheck(client);
    edtSenderCheck(client);
    mygesCheck(client);
});


client.on('messageCreate', msg => {
    if (authServers.includes(msg.guild.id) && !bannedUsers.includes(msg.author.id)) {
        commandLaunch(msg, config, client, version);
    }
});

client.on('interactionCreate', interaction => {
    interactionLaunch(interaction, client, version);
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!bannedUsers.includes(user.id)) { reactionAdded(reaction, user) }
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!bannedUsers.includes(user.id)) { reactionRemoved(reaction, user) }
})

// login
client.login(process.env.TOKEN);