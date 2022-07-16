require('dotenv').config()
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: new Intents(32767)
});
const config = require('./src/config/config.json');
const { interactionLaunch } = require('./src/tasks/commandLauch');
const { reactionAdded, reactionRemoved } = require('./src/tasks/reactions');
const { edtReminderCheck,
    edtSenderCheck, mygesCheck, currentNotesCheck } = require('./src/tasks/intervalsCheck');
const { setAllCommands } = require('./src/tasks/setAllCommands');
require('./server.js')
const version = config.version;

const authServers = ["762698485011054602", "783679631101526056", "831823187213680682"];
const bannedUsers = [];

process.on('uncaughtException', function (err) {
    console.log("/!\\ GERROR :", err);
    client.channels.cache.get('922139628729958400').send(`General error\n\`\`\`${err}\`\`\``).catch(() => { ; });
});

client.on('ready', () => {
    console.log(`-----\nLogged in as ${client.user.username} !\nVersion: ` + version + ` ✅\n-----\n`);

    client.user.setActivity({ name: '/aide', type: `WATCHING` });

    edtReminderCheck(client);
    edtSenderCheck(client);
    mygesCheck(client);
    currentNotesCheck(client);
});

client.on('interactionCreate', interaction => {
    if (!bannedUsers.includes(interaction?.user?.id) && !bannedUsers.includes(interaction?.user?.id)) {
        interactionLaunch(interaction, client, version);
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!bannedUsers.includes(user.id)) {
        reactionAdded(reaction, user);
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    if (!bannedUsers.includes(user.id)) {
        reactionRemoved(reaction, user);
    }
})

client.on('guildCreate', guild => {
    if (authServers.includes(guild.id)) {
        setAllCommands(guild.id, client);
    }
})

// login
client.login(process.env['TOKEN']);