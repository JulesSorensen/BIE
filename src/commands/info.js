const { getAgendaCrypted } = require('../api/mgapi');
const { getAllData } = require('../firebase/firebase');
const { isUserInDelay, addUserDelay } = require('../functions/delay');
const { getCurrentDate } = require('../tasks/dates');

const info = async (params) => {
    const { interaction, time, botUptime, version } = params;

    const { discordPing, botPing, uptime } = {
        discordPing: `${Math.abs(new Date() - new Date(interaction.createdTimestamp))}ms`,
        botPing: `${new Date() - new Date(time)}ms`,
        uptime: getCurrentDate(botUptime).format("[En ligne depuis le] DD/MM/YYYY [à] HH[h]mm")
    };

    await interaction.deferReply({ ephemeral: false });

    const firstDbDate = new Date();
    await getAllData('edt');
    const dbDate = `${new Date() - firstDbDate}ms`;

    let mygesPing = '... Cooldown';
    const isInDelay = await isUserInDelay(interaction.user.id, 'info');
    if (!isInDelay) {
        await addUserDelay(interaction.user.id, 'info');
        const firstMGDate = new Date();
        const mgDate = getCurrentDate().format("YYYY-MM-DD");
        await getAgendaCrypted({ start: mgDate, end: mgDate });
        mygesPing = `${new Date() - firstMGDate}ms`;
    }

    return await interaction.editReply({
        embeds: [{
            color: 0x42fcff,
            title: `ℹ️ Informations`,
            description: `Voici les informations sur le Bot v${version}\n­`,
            fields: [
                { name: `🕒 Uptime`, value: uptime, inline: true },
                { name: `🏓 Ping Bot`, value: botPing, inline: true },
                { name: `🏓 Ping Discord`, value: discordPing, inline: true },
                { name: `🖥️ Ping Database`, value: dbDate, inline: true },
                { name: `${mygesPing == '... Cooldown' ? "<:wait:997268180911280158>" : "<:myges:855919234886139944>"} Ping API MyGes`, value: mygesPing, inline: true }
            ],
            timestamp: new Date()
        }]
    });
};

module.exports = { info };