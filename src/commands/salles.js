const { setSalles } = require('../api/mgapi');
const { getAllData } = require('../firebase/firebase');
const { isUserInDelay, addUserDelay } = require('../functions/delay');
const { getCurrentDate } = require('../tasks/dates');

const salles = async (params) => {
    const { interaction, version } = params;
    const date = new Date();
    const currentDate = getCurrentDate(date).format('YYYY-MM-DD');

    await interaction.deferReply({ ephemeral: false });

    const inDelay = await isUserInDelay(interaction.user.id, 'salle');
    let pastille = "<:wait:997268180911280158>";

    const getRightHour = (formatedDate, date, sallesData) => {
        let rightHour = false;

        Object.keys(sallesData[formatedDate]).map((hour) => {
            const newHour = getCurrentDate(new Date(parseInt(hour)));
            const newRightHour = rightHour ? getCurrentDate(new Date(rightHour)) : false;
            if (date > newHour) {
                if (!newRightHour || newHour > newRightHour) {
                    rightHour = parseInt(hour);
                }
            }
        });

        if (rightHour) return rightHour;

        Object.keys(sallesData[formatedDate]).map((hour) => {
            const newHour = getCurrentDate(new Date(parseInt(hour)));
            const newRightHour = rightHour ? getCurrentDate(new Date(rightHour)) : false;
            if (date < newHour) {
                if (!newRightHour || newHour <= newRightHour) {
                    rightHour = parseInt(hour);
                }
            }
        });

        if (rightHour) return rightHour;

        Object.keys(sallesData[date]).map((hour) => {
            const newHour = new Date(hour);
            const newRightHour = rightHour ? new Date(rightHour) : false;

            if (newRightHour && newHour >= newRightHour) {
                rightHour = hour;
            }
        });

        return rightHour;
    }

    const sallesData = await getAllData('salles');
    if (!inDelay) {
        addUserDelay(interaction.user.id, 'salle');
        await setSalles({ start: getCurrentDate(currentDate).toDate().valueOf(), end: getCurrentDate(currentDate, "YYYY-MM-DD").add(1, 'd').toDate().valueOf() });
        pastille = "<:check:866581082551615489>";
    }
    if (sallesData && sallesData[currentDate]) {
        const rightHour = getRightHour(currentDate, getCurrentDate(date), sallesData);

        if (!rightHour) {
            return await interaction.editReply({ content: `Aucune salle n'a été trouvé pour aujourd'hui !` });
        } else {
            const fields = [];
            Object.keys(sallesData[currentDate]).map((hour) => {
                const formatedHour = getCurrentDate(new Date(parseInt(hour))).format('H[h]mm');
                const value = sallesData[currentDate][hour].split(" - ");
                value.shift();
                fields.push({
                    name: formatedHour,
                    value: value.join(" - ")
                });
            });

            fields.sort((a, b) => {
                const aHour = getCurrentDate(a.name, 'H[h]mm');
                const bHour = getCurrentDate(b.name, 'H[h]mm');

                if (aHour > bHour) return 1;
                if (aHour < bHour) return -1;
                return 0;
            })

            return await interaction.editReply({
                embeds: [
                    {
                        "title": `${pastille} Liste des salles du jour`,
                        "description": `${getCurrentDate(new Date(parseInt(rightHour))) > getCurrentDate() ? 'Prochaine salle' : 'Salle actuelle'}: ${sallesData[currentDate][rightHour].split(/Salles?/)[1]}\n­`,
                        "color": 0x42fcff,
                        "fields": fields,
                        "thumbnail": {
                            "url": `https://www.freeiconspng.com/thumbs/door-icon/open-door-exit-icon-10.png`
                        },
                        "footer": {
                            "text": `Version ${version}`
                        }
                    }
                ]
            }).then((msg) => { msg.react('1022118516129792000') });
        }
    } else {
        const nextDate = getCurrentDate(date).add(1, 'days').format('YYYY-MM-DD');
        if (sallesData && sallesData[nextDate]) {
            const rightHour = getRightHour(nextDate, getCurrentDate(`${getCurrentDate(date).format("YYYY-MM-DD")} 00:00`, "YYYY-MM-DD HH:mm").add(1, 'days'), sallesData);

            if (!rightHour) {
                return await interaction.editReply({ content: `Aucune salle n'a été trouvé !` });
            } else {
                const fields = [];
                Object.keys(sallesData[nextDate]).map((hour) => {
                    const formatedHour = getCurrentDate(new Date(parseInt(hour))).format('H[h]mm');
                    const value = sallesData[nextDate][hour].split(" - ");
                    value.shift();
                    fields.push({
                        name: formatedHour,
                        value: value.join(" - ")
                    });
                });

                fields.sort((a, b) => {
                    const aHour = getCurrentDate(a.name, 'H[h]mm');
                    const bHour = getCurrentDate(b.name, 'H[h]mm');

                    if (aHour > bHour) return 1;
                    if (aHour < bHour) return -1;
                    return 0;
                })

                return await interaction.editReply({
                    embeds: [
                        {
                            "title": `${pastille} Liste des salles de demain`,
                            "description": `Prochaine salle: ${sallesData[nextDate][rightHour].split(/Salles?/)[1]}\n­`,
                            "color": 0x42fcff,
                            "fields": fields,
                            "thumbnail": {
                                "url": `https://www.freeiconspng.com/thumbs/door-icon/open-door-exit-icon-10.png`
                            },
                            "footer": {
                                "text": `Version ${version}`
                            }
                        }
                    ]
                }).then((msg) => { msg.react('1022118516129792000') });
            }
        } else {
            return await interaction.editReply({ content: `Aucune salle n'est prévue pour aujourd'hui ni demain !` });
        }
    }
}

module.exports = { salles };