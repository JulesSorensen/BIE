import { DiscordMessage } from '../../interface/DiscordMessage';

// notification en mp lorsque le clan ou l'utilisateur passe un niveau
function notificationOn(msg: DiscordMessage) {
    notification[msg.author.id] = `on`; fs.writeFile(`./data/notification.json`, JSON.stringify(notification), err => { if (err) throw err; });
}

function notificationOff(msg: DiscordMessage) {
    notification[msg.author.id] = `off`; fs.writeFile(`./data/notification.json`, JSON.stringify(notification), err => { if (err) throw err; });
}

// notification de serveur quand quelqu'un change de niveau
function guildNotificationOn(msg: DiscordMessage) {
    guildnotification[msg.guild.id] = `on`; fs.writeFile(`./data/guildnotification.json`, JSON.stringify(guildnotification), err => { if (err) throw err; });
}

function guildNotificationOff(msg: DiscordMessage) {
    guildnotification[msg.guild.id] = `off`; fs.writeFile(`./data/guildnotification.json`, JSON.stringify(guildnotification), err => { if (err) throw err; });
}