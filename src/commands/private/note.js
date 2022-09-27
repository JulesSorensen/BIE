const addNote = async (params) => {
    const { interaction, client, version } = params;

    await interaction.deferReply({ ephemeral: false });

    const matiere = interaction.options.get("matiere").value;

    await (client.channels.cache.get(`762698661892849714`)).send({
        content: `<@&996043159077408768>`,
        embeds: [{
            color: 16712451,
            thumbnail: {
                url: "https://i.imgur.com/vUQ15WM.png"
            },
            author: {
                name: "Nouvelle note !\n­",
            },
            description: `📚 Matière : ${matiere.replace(/[A-Z]/g, ' $&').trim()}`,
            footer: {
                text: `BIE V.${version} | Envoyé par BI3`
            }
        }]
    }).catch(() => { ; });

    return await interaction.editReply({
        content: `<:check:866581082551615489> La nouvelle note en **n°${matiere.replace(/[A-Z]/g, ' $&').trim()}** a bien été annoncée`
    });
}

module.exports = { addNote }