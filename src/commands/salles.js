const moment = require('moment');
const { setSalles } = require('../api/mgapi');
const { getAllData } = require('../firebase/firebase');
const { isUserInDelay, addUserDelay } = require('../functions/delay');

const salles = async (params) => {
    const { interaction, version } = params;
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD');

    await interaction.deferReply({ ephemeral: false });

    const inDelay = await isUserInDelay(interaction.user.id, 'salle');
    let pastille = "<:wait:997268180911280158>";

    const getRightHour = (formatedDate, date, sallesData) => {
        let rightHour = false;

        Object.keys(sallesData[formatedDate]).map((hour) => {
            const newHour = moment(new Date(parseInt(hour)));
            const newRightHour = rightHour ? moment(new Date(rightHour)) : false;
            if (date > newHour) {
                if (!newRightHour || newHour > newRightHour) {
                    rightHour = parseInt(hour);
                }
            }
        });

        if (rightHour) return rightHour;

        Object.keys(sallesData[formatedDate]).map((hour) => {
            const newHour = moment(new Date(parseInt(hour)));
            const newRightHour = rightHour ? moment(new Date(rightHour)) : false;
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
        await setSalles({ start: moment(currentDate).toDate().valueOf(), end: moment(currentDate, "YYYY-MM-DD").add(1, 'd').toDate().valueOf() });
        pastille = "<:check:866581082551615489>";
    }
    if (sallesData && sallesData[currentDate]) {
        const rightHour = getRightHour(currentDate, moment(date), sallesData);

        if (!rightHour) {
            return await interaction.editReply({ content: `Aucune salle n'a été trouvé pour aujourd'hui !` });
        } else {
            const fields = [];
            Object.keys(sallesData[currentDate]).map((hour) => {
                const formatedHour = moment(new Date(parseInt(hour))).format('HH[h]mm');
                fields.push({
                    name: formatedHour,
                    value: sallesData[currentDate][hour].split(" - ")[1],
                });
            });

            fields.sort((a, b) => {
                const aHour = moment(a.name, 'HH[h]mm');
                const bHour = moment(b.name, 'HH[h]mm');

                if (aHour > bHour) return 1;
                if (aHour < bHour) return -1;
                return 0;
            })

            return await interaction.editReply({
                embeds: [
                    {
                        "title": `${pastille} Liste des salles du jour`,
                        "description": `${moment(new Date(parseInt(rightHour))) > moment() ? 'Salle actuelle' : 'Prochaine salle'}: ${sallesData[currentDate][rightHour].split(/Salles?/)[1]}\n­`,
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
        const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
        if (sallesData && sallesData[nextDate]) {
            const rightHour = getRightHour(nextDate, moment(`${moment(date).format("YYYY-MM-DD")} 00:00`, "YYYY-MM-DD HH:mm").add(1, 'days'), sallesData);

            if (!rightHour) {
                return await interaction.editReply({ content: `Aucune salle n'a été trouvé !` });
            } else {
                const fields = [];
                Object.keys(sallesData[nextDate]).map((hour) => {
                    const formatedHour = moment(new Date(parseInt(hour))).format('HH[h]mm');
                    fields.push({
                        name: formatedHour,
                        value: sallesData[nextDate][hour].split(" - ")[1],
                    });
                });

                fields.sort((a, b) => {
                    const aHour = moment(a.name, 'HH[h]mm');
                    const bHour = moment(b.name, 'HH[h]mm');

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