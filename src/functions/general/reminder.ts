import { DiscordMessage } from '../../interface/DiscordMessage';

// le client vient du main
import { createData, updateData, getData, getAllData, deleteData } from '../../firebase/firebase';
const lang = {};

// ajouter une alarme
const reminderAdd = async(msg: DiscordMessage, args: string[]) => {
    let reminder = await getData('users', 'X5ZUm8FA03ZidnQSpLe4');
    let checkIcon = ''; //client.emojis.cache.get(`866581082551615489`).toString();
    if (!reminder.list[msg.guild.id]) {
        var id = 1;
        var roleID = !args[3] ? false : args[3];
        reminder.list[msg.guild.id] = [{ "id": 1, "date": args[0], "name": args[1], "channelID": args[2], "roleID": roleID }];
    } else {
        var id: number = (reminder.list[msg.guild.id].length >= 1) ? ((reminder.list[msg.guild.id][reminder.list[msg.guild.id].length - 1].id) + 1) : (1);
        var roleID = !args[3] ? false : args[3];
        reminder.list[msg.guild.id].push({ "id": id, "date": args[0], "name": args[1], "channelID": args[2], "roleID": roleID });
    }
    if (lang[msg.author.id] === `FR`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> vous avez bien créer le rappel \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
    else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> du har opprettet påminnelsen \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
    else return msg.channel.send(`${checkIcon} <@${msg.author.id}> you have created the reminder \`${args[1]}\`, ID: \`${id}\`.`).catch(() => { });
}

// donne la liste de toutes les alarmes du serveur
const reminderList = async(msg: DiscordMessage) => {
    let reminder = await getData('users', 'X5ZUm8FA03ZidnQSpLe4');
    let uncheckIcon = ''; //client.emojis.cache.get(`866581082870513684`).toString();
    if (!reminder.list[msg.guild.id]) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    } else if (!(reminder.list[msg.guild.id].length >= 1)) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    }
    var sentence = `\n`;
    reminder.list[msg.guild.id].forEach((item, index) => {
        var role = (item.roleID) ? ` ROLE-ID: \`${item.roleID}\`` : ``;
        sentence += `ID: \`${item.id.toString()}\` DATE: \`${item.date}\` NAME: \`${item.name}\` CHANNEL: <#${item.channelID}>${role}\n`;
    })
    if (lang[msg.author.id] === `FR`) return msg.channel.send(`Voici la liste de vos rappels:\n${sentence}`).catch(() => { ; });
    else if (lang[msg.author.id] === `FR`) return msg.channel.send(`Her er listen over tilbakekallinger:\n${sentence}`).catch(() => { ; });
    else return msg.channel.send(`Here is the list of your reminders:\n${sentence}`).catch(() => { ; });
}

// supprime une alarme de serveur
const reminderDelete = async(msg: DiscordMessage, id: number) => {
    let reminder = await getData('users', 'X5ZUm8FA03ZidnQSpLe4');
    let checkIcon = ''; // client.emojis.cache.get(`866581082551615489`).toString();
    let uncheckIcon = ''; //client.emojis.cache.get(`866581082870513684`).toString();
    if (!reminder.list[msg.guild.id]) {
        if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} Il n'y a pas de rappels crées sur le serveur <@${msg.author.id}> !`).catch(() => { ; });
        else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} Det er ingen påminnelser opprettet på serveren <@${msg.author.id}> !`).catch(() => { ; });
        else return msg.channel.send(`${uncheckIcon} There are no reminders created on the server <@${msg.author.id}> !`).catch(() => { ; });
    } else {
        var guildIndex = false;
        var reminderName = false;
        reminder.list[msg.guild.id].forEach((item, index) => {
            if (item.id == id) {
                guildIndex = index.toString();
                reminderName = item.name;
            }
        });
        if (!guildIndex) {
            if (lang[msg.author.id] === `FR`) return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> cet ID est introuvable...`).catch(() => { ; });
            else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> denne IDen ble ikke funnet...`).catch(() => { ; });
            else return msg.channel.send(`${uncheckIcon} <@${msg.author.id}> this ID can't be found...`).catch(() => { ; });
        } else {
            reminder.list[msg.guild.id].splice(parseInt(guildIndex), 1);
            if (lang[msg.author.id] === `FR`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> j'ai bien supprimé le rappel \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
            else if (lang[msg.author.id] === `NO`) return msg.channel.send(`${checkIcon} <@${msg.author.id}> jeg slettet påminnelsen \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
            else return msg.channel.send(`${checkIcon} <@${msg.author.id}> I removed the reminder \`${id}\` (\`${reminderName}\`) !`).catch(() => { ; });
        }
    }
}