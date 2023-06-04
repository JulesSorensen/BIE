const { getDetails } = require("../functions/details");
const { getCurrentDate } = require("../tasks/dates");

const details = async (params) => {
    const { interaction } = params;
    await interaction.deferReply({
        ephemeral: true
    })

    const getCustomizedDate = (semaine = 0) => {
        const date = getCurrentDate().add(semaine, "weeks");

        if (date.isoWeekday() >= 6) date.add(1, 'weeks');
        return date.isoWeekday(1);
    }

    const semaine = parseInt(interaction.customId.slice(7))
    const date = getCustomizedDate(semaine - 1).format("YYYY-MM-DD");

    try {
        const details = (await getDetails(date)).details.split("\\n").join("\n");
        await interaction.editReply({
            content: details.length > 0 ? details : `Je n'ai rien trouvé pour la semaine du ${date}`,
        });
    } catch {
        await interaction.editReply({
            content: 'Impossible de récupérer les détails',
        });
    }

}

module.exports = { details }