import { Message } from "discord.js";
import { devoir } from "../tasks/interactions/devoir";
import { devstats } from "../tasks/interactions/devstats";
import { edt } from "../tasks/interactions/edt";
import { stats } from "../tasks/interactions/stats";

const interactionLaunch = (interaction: any, client: any, version: string) => {
    if (interaction.isButton()) {
        switch (interaction.customId) {
            case 'EDT1':
                return edt('1', interaction, client);
            case 'EDT2':
                return edt('2', interaction, client);
            case 'EDT3':
                return edt('3', interaction, client);
            case 'DEV':
                return devoir(interaction, client);
            case 'STATS':
                return stats(interaction, client);
            case 'DEVSTATS':
                return devstats(interaction, client, version);
            default:
                return interaction.deferUpdate();
        }
    }
}

const checkAlias = (commandName: string) => {
    switch (commandName) {
        case 'e': // edt command PRIVATE
        case 'edt':
        case 'emploidutemps':
        case 'emploidutemp':
            commandName = 'edt'; break;
        case 'devoirs': // devoir command PRIVATE
        case 'dev':
        case 'd':
            commandName = 'devoir'; break;
        case 'stat': // stats command PRIVATE
        case 's':
            commandName = 'stats'; break;
        default:
            break;
    }
    return commandName
}

const commandLaunch = async (msg: Message<any>, config: { prefix: any; owner?: string; }, client: any, version: string) => {
    let prefix = config.prefix;
    // if (msg.channel.type != `DM`) {
    //     if (customprefix[msg.guild.id]) {
    //         prefix = customprefix[msg.guild.id];
    //     }
    // }
    // if (msg.content.toLowerCase() == `&prefix`) return msg.reply(`\`${prefix}\` is the current prefix.`).catch(() => { ; });
    if (!msg.content.startsWith(prefix)) return;
    let args = msg.content.slice(prefix.length).split(/ +/);
    let commandName = checkAlias(args.shift().toLowerCase());

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    if (command.guildOnly && (msg.channel.type != 'GUILD_TEXT' && msg.channel.type != 'GUILD_NEWS' && msg.channel.type != 'GUILD_NEWS_THREAD' && msg.channel.type != 'GUILD_PUBLIC_THREAD')) {
        return msg.reply('Vous devez taper cette commande dans un serveur Discord !').catch(() => { ; });
    }

    try {
        await command.execute(msg, args, client, version);
    } catch (error) {
        client.channels.cache.get('922139628729958400').send(`Error CMD[${commandName}] was generated by <@${msg.author.id}>-${msg.author.id}-${msg.author.username}#${msg.author.discriminator}\n\`${msg.content}\`\n\`\`\`${error}\`\`\``).catch(() => { ; });
    }
};

export { commandLaunch, interactionLaunch }