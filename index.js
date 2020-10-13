const Discord = require('discord.js');
const client = new Discord.Client();
const myGes = require('myges/src/app');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setPresence({
        activity: {
            name: 'Jules',
            type: "WATCHING",
        },
        status: "dnd"
    });
    myGes.authenticate("jladeiro", "6wH525B5")
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login('NzY1NjQ4NDcxMDU4NTQ2Njk4.X4X3tA.w9NwhqoN8C7uX_kRQl_gYZv0ppw');