import { MessageAttachment } from 'discord.js';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
  
const mygesCheck = (client: any) => {
    setInterval(async()=>{
        const edt = btoa((await exec('myges agenda 24-01-2022')).stdout)
    },300)
    // let attachment = new MessageAttachment(Buffer.from(edt, 'utf-8'), 'edt.txt');
    // client.channels.cache.get('934578867925045269').send({content: `EDT 24/01`, files: [attachment]})
}

// vérification de rappel demandé par l'utilisateur
const edtReminderCheck = async () => {

    // var date = new Date();
    // var datesplit = (date.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
    // datesplit.forEach((item, index) => {
    //     if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
    // });
    // var datefinale = `${datesplit[1]}/${datesplit[0]}/${datesplit[2]}`;

    // for (var value in reminder) {
    //     try {
    //         reminder[value].forEach((item, index) => {
    //             if (item.date == datefinale) {
    //                 var role = item.roleID ? `<@&${item.roleID}> ` : ``;
    //                 (client.channels.cache.get(item.channelID)).send(`${role}<a:bell:868901922483097661> **${item.name}**`).catch(() => { ; });
    //                 reminder[value].splice(reminder[value].indexOf(item), 1); fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; });
    //                 if (!(reminder[value].length >= 1)) { delete reminder[value]; fs.writeFile(`./data/reminder.json`, JSON.stringify(reminder), err => { if (err) throw err; }); throw Error(); }
    //             }
    //         })
    //     } catch (e) { ; };
    // };
}

export { edtReminderCheck, mygesCheck }