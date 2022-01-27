import moment from 'moment';
import { getAllData } from '../../firebase/firebase';
import { devoirAdd, devoirAllDelete, devoirDelete, devoirShow } from '../../functions/efficom/devoir';
import { statsAddDevoir, statsAddDevoirAsked } from '../../functions/efficom/stats';

module.exports = {
    name: 'devoir',
    guildOnly: false,
    async execute(msg, args, client, version) {
        let searchIcon = client.emojis.cache.get(`868852714690478090`).toString();
        msg.react(searchIcon).catch(() => { ; });
        let devoir = await getAllData('devoir')
        if (!args[0]) {
            statsAddDevoirAsked();
            var devoirs = [];
            Object.keys(devoir).map((date: any) => {
                if (moment(date, 'DD-MM-YYYY') >= moment().add(-1, 'days')) {
                    devoir[date].matieres.map((matiere: any) => {
                        devoirs.push({ name: `${moment(date, 'DD-MM-YYYY').format('DD/MM/YYYY')} - ${matiere.matiere.split(/(?=[A-Z])/).join(` `)}`, value: matiere.devoir })
                    })
                } else {
                    statsAddDevoir(devoir[date].matieres);
                    devoirAllDelete(date);
                }
            })
            devoirs = devoirs.sort(function (a, b) {
                const [startSplit, endSplit] = [a.name.split('/'), b.name.split('/')];
                const [start, end] = [`${startSplit[2]}-${startSplit[1]}-${startSplit[0]}`, `${endSplit[2]}-${endSplit[1]}-${endSplit[0]}`];
                // @ts-ignore
                return new Date(start) - new Date(end);
            });
            let isS = ''; let isS2 = 'le prochain devoir';
            if (devoirs.length < 1) {
                await msg.reply(`Incroyable, il n'y a même pas de devoirs !`).catch(() => { ; });
                return msg.reactions.removeAll()
            } else {
                isS = 's'; isS2 = 'la liste des prochains devoirs';
            }
            (client.channels.cache.get(`874251822045487125`)).send(`📔 Devoirs sent to ${msg.author.username}`).catch(() => { ; });
            await msg.reply({
                embeds: [{
                    color: 14261890,
                    title: `📔 Devoir${isS} à venir`,
                    description: `Voici ${isS2}, les anciens n'y apparaissent plus\n­`,
                    fields: devoirs,
                    timestamp: new Date(),
                    footer: {
                        icon_url: msg.author.avatarURL(),
                        text: `BIE V.${version} | Devoirs demandé par ${msg.author.tag}`
                    }
                }]
            }).catch((e) => { });
            return msg.reactions.removeAll()
        } else if (msg.author.id == `676690539126718467`) {
            msg.reactions.removeAll()
            if (args[0].toLowerCase() == `add` || args[0].toLowerCase() == `a`) {
                if (args.length < 4) return msg.reply(`\`&devoir add [date] [matiere] [text]\``).catch(() => { ; });
                if (!!args[4]) {
                    args[3] = args.slice(3).join(' ');
                }
                if (args[1].includes("/")) {
                    args[1] = args[1].replaceAll('/', '-')
                }
                if (moment(args[1], 'DD-MM-YYYY', true).isValid()) {
                    await devoirAdd(msg, args[1], args[2], args[3], client);
                    return (client.channels.cache.get("762698661892849714")).send(`<@&893923446940123137> <a:bell:868901922483097661> Un nouveau devoir en **${args[2].split(/(?=[A-Z])/).join(` `)}** a été ajouté`)
                } else {
                    return msg.channel.send({content: 'Date non valide !'})
                }
            } else if (args[0].toLowerCase() == `show`) {
                return devoirShow(msg);
            } else if (args[0].toLowerCase() == `delete` || args[0].toLowerCase() == `del` || args[0].toLowerCase() == `remove`) {
                if (args.length < 3) return msg.reply(`\`&devoir delete [date] [matiere]\``).catch(() => { ; });
                if (args[1].includes("/")) {
                    args[1] = args[1].replaceAll('/', '-')
                }
                return devoirDelete(msg, args[1], args[2], client);
            }
        }
    }
};