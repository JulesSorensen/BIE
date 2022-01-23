import { DiscordMessage } from '../../interface/DiscordMessage';

// ajouter un devoir
function devoirAdd(msg, date, matiere, text) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    if (!devoir[date]) {
        devoir[date] = {}; devoir[date][matiere] = text; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
    } else {
        devoir[date][matiere] = text; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
    }
}

// supprime un devoir
function devoirDelete(msg, date, matiere) {
    let checkIcon = client.emojis.cache.get(`866581082551615489`).toString();
    if (!devoir[date]) return msg.reply(`aucun devoir détecté pour cette date`);
    if (!devoir[date][matiere]) return msg.reply(`matière non trouvé sur cette date`);
    delete devoir[date][matiere]; fs.writeFile(`./data/devoir.json`, JSON.stringify(devoir), err => { if (err) throw err; }); msg.react(checkIcon);
}