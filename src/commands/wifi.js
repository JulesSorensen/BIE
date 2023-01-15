const wifi = async (params) => {
    const { interaction, version } = params;

    await interaction.deferReply({ ephemeral: false });

    const wifiContent = {
        embeds: [{
            color: 0x42fcff,
            title: `📶 Wifi Efficom`,
            description: `Informations concernant la connexion et les identifiants wifi d'Efficom\n­`,
            fields: [
                {
                    name: '🔰 Nom de la connexion',
                    value: '`EFFICOM EFAB`',
                    inline: false
                }, {
                    name: '👶 Nom d\'utilisateur',
                    value: '`wifietu`',
                    inline: true
                }, {
                    name: '🫣 Mot de passe',
                    value: '`Sulil22*`\n­',
                    inline: true
                },
            ],
            timestamp: new Date(),
            footer: {
                text: `Version ${version}`
            }
        }]
    }

    await interaction.editReply(wifiContent).catch(() => { });
}

module.exports = { wifi }