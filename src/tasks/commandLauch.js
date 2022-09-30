const { aide } = require("../commands/aide");
const { devoir, addDevoir, forceAddDevoir, forceDeleteDevoir } = require("../commands/devoir");
const { devstats } = require("../commands/devstats");
const { edt } = require("../commands/edt");
const { addEdt, sendmpEdt, chmEdt } = require("../commands/private/edt");
const { addNote } = require("../commands/private/note");
const { stats } = require("../commands/stats");
const { sendBIEMessage } = require("../commands/private/bie");
const { details } = require("../commands/details");
const { edtchm } = require("../commands/edtchm");
const { salles } = require("../commands/salles");
const { info } = require("../commands/info");
const { merci } = require("../commands/merci");

const interactionLaunch = (interaction, client, version, initDate, uptime) => {
    const commandName = interaction?.isCommand() ? interaction?.commandName?.toUpperCase() : interaction?.customId?.toUpperCase();
    const commandType = interaction?.isCommand() ? "COMMAND" : "BUTTON";
    try {
        switch (commandName) {
            case 'EDT':
                return edt({ num: interaction.options.get('semaine').value, interaction: interaction, client: client, type: commandType });
            case 'EDT1':
                return edt({ num: '1', interaction: interaction, client: client, type: commandType });
            case 'EDT2':
                return edt({ num: '2', interaction: interaction, client: client, type: commandType });
            case 'EDT3':
                return edt({ num: '3', interaction: interaction, client: client, type: commandType });
            case 'DEV':
                return devoir({ interaction: interaction, client: client, version: version, type: commandType });
            case 'DEVOIRS':
                if (interaction.options._subcommand == "afficher") {
                    return devoir({ interaction: interaction, client: client, version: version, type: commandType });
                } else if (interaction.options._subcommand == "forceadd") {
                    return forceAddDevoir({ interaction: interaction, client: client });
                } else if (interaction.options._subcommand == "forcedelete") {
                    return forceDeleteDevoir({ interaction: interaction, client: client });
                } else {
                    return addDevoir({ interaction: interaction, client: client });
                }
            case 'STATS':
                if (interaction.options?._subcommand == "devoirs") {
                    return devstats({ interaction: interaction, version: version });
                }
                return stats({ interaction: interaction, client: client, version: version, type: commandType });
            case 'DEVSTATS':
                return devstats({ interaction: interaction, version: version });
            case 'AIDE':
                return aide({ interaction: interaction, version: version });
            case 'DETAILS1':
            case 'DETAILS2':
            case 'DETAILS3':
                return details({ interaction: interaction });
            case 'EDTCHM1':
            case 'EDTCHM3':
            case 'EDTCHM2':
                return edtchm({ interaction: interaction, client: client });
            case 'SALLE':
                return salles({ interaction: interaction, version: version });
            case 'INFO':
                return info({ interaction: interaction, version: version, time: initDate, botUptime: uptime });
            case 'MERCI':
                return merci({ interaction: interaction, version: version });
            // PRIVATE
            case 'EDTADD':
                return addEdt({ interaction: interaction, client: client });
            case 'EDTSENDMP':
                return sendmpEdt({ interaction: interaction, client: client });
            case 'EDTCHM':
                return chmEdt({ interaction: interaction, client: client });
            case 'NOTE':
                return addNote({ interaction: interaction, client: client, version: version });
            case 'BIE':
                return sendBIEMessage({ interaction: interaction, client: client });
            default:
                return interaction?.deferUpdate();
        }
    } catch (err) {
        client.channels.cache.get('922139628729958400').send(`Error CMD[${commandName}|${commandType}] was generated by <@${interaction.author?.id}>-${interaction.author?.id}-${interaction.author?.username}#${interaction.author?.discriminator}\n\`\`\`${err}\`\`\``).catch(() => { ; });
    }
}

module.exports = { interactionLaunch }