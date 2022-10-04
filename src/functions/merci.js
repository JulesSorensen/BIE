const { getAllData, createData, updateData } = require("../firebase/firebase");

const cacheMerci = new Map();
const cooldowns = new Set();

const addNewMerci = async (reaction, user) => {
    if (cooldowns.has(user.id)) return;
    cooldowns.add(user.id);
    setTimeout(() => {
        cooldowns.delete(user.id);
    }, 3000);

    let currentMerci = cacheMerci.get(user.id) ?? false;

    if (!currentMerci) {
        currentMerci = (await getAllData("merci", user.id))[user.id] ?? false;
        if (!!currentMerci) cacheMerci.set(user.id, currentMerci);
    }

    if (!currentMerci || Object.keys(currentMerci).length == 0) {
        cacheMerci.set(user.id, { count: 1, msg: [reaction.message.id], name: user.username });
        await createData("merci", user.id, { count: 1, msg: [reaction.message.id], name: user.username });
        await user.send(`**Coucou, c'est la première fois que tu me remercies ! Ca me fait vraiment plaisir** \<:heart_gil:874358424777941012> 
Saches qu'en cliquant sur la réaction \<:merciBIE:1022118516129792000> tu bénéficies d'un délai de requête API sur MyGes réduit !
- **5** <:merciBIE:1022118516129792000> réduit ton délai à 30 secondes
- **10** <:merciBIE:1022118516129792000> réduit ton délai à 15 secondes
- **50** <:merciBIE:1022118516129792000> réduit ton délai à 1 seconde

Ceci est mis en place pour éviter le spam de requête avec le compte MyGes de <@676690539126718467> :eyes: 
Tu peux consulter ton nombre de remerciments avec la commande \`/merci personnels\` et le classement avec \`/merci classement\``).catch(() => { });
    } else {
        if (currentMerci.msg.includes(reaction.message.id)) return;
        currentMerci.count++;
        currentMerci.msg.push(reaction.message.id);
        cacheMerci.set(user.id, currentMerci);
        await updateData("merci", user.id, currentMerci);
    }
};

module.exports = { addNewMerci };