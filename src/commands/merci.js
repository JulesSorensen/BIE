const { getAllData } = require("../firebase/firebase");

const merci = async (params) => {
    const { interaction, version } = params;
    const type = interaction.options.get("option").value;

    if (type == "1") await interaction.deferReply({ ephemeral: true });
    if (type == "2") await interaction.deferReply({ ephemeral: false });

    const allMerci = await getAllData("merci");

    if (type == "1") {
        if (allMerci[interaction.user.id]) {
            const merci = allMerci[interaction.user.id].count;

            await interaction.editReply({ content: `Vous m'avez remercié **${merci}** fois ! 😇` });
        } else {
            interaction.editReply({ content: "Vous ne m'avez pas encore remercié... 🥺" });
        }
    } else {
        const sortedMerci = Object.keys(allMerci).sort((a, b) => allMerci[b].count - allMerci[a].count);

        const icons = ['👑', '🥈', '🥉'];
        let valueString = '';
        for (let i = 0; i < 10; i++) {
            if (!!sortedMerci[i]) valueString += `${icons[i] ? icons[i] + ' ' : '­ ­ ­ ­'+(i + 1)+'.'} **${allMerci[sortedMerci[i]].count > 1 ? allMerci[sortedMerci[i]].count+"** remerciements" : allMerci[sortedMerci[i]].count+"** remerciement"} de ${allMerci[sortedMerci[i]].name}\n`;
        }

        interaction.editReply({
            embeds: [{
                color: 0x42fcff,
                title: `🙏 Classement des remerciements`,
                description: `Voici les 10 personnes qui m'ont le plus remerciés !`,
                fields: [{
                    name: "Classement",
                    value: valueString
                }],
                footer: {
                    text: `Version ${version}`
                }
            }]
        });
    }

};

module.exports = { merci };