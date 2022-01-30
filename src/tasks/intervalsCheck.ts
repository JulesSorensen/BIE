import moment from 'moment';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec)
import { createData, deleteData, getAllData, updateData } from '../firebase/firebase';
import { statsAddRemind } from '../functions/efficom/stats';

const mygesCheck = (client: any) => {
    const getCustomizedDate = () => {
        var date = new Date();
        if (date.getDay() == 6 || date.getDay() == 0) {
            let nb = (date.getDay() == 6 ? 8 : 1)
            date.setDate(date.getDate() + (((nb - date.getDay()))));
        }
        return date
    }
    const getFirstWeek = () => {
        function getPreviousMonday() {
            var date = getCustomizedDate();
            var day = date.getDay();
            var prevMonday = new Date();
            if (date.getDay() == 0) {
                prevMonday.setDate(date.getDate() - 6);
            } else {
                prevMonday.setDate(date.getDate() - (day - 1));
            }
            return prevMonday;
        }
        var datesplit = (getPreviousMonday().toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        return `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
    }
    const getSecondWeek = () => {
        var nextMonday = getCustomizedDate();
        nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()))));
        var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        return `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
    }
    const getThirdWeek = () => {
        var nextMonday = getCustomizedDate();
        nextMonday.setDate(nextMonday.getDate() + (((1 + 14 - nextMonday.getDay()))));
        var datesplit = (nextMonday.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
        datesplit.forEach((item, index) => {
            if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
        });
        return `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
    }

    setInterval(async () => {
        let date: string;
        try {
            for (let i = 0; i < 3; i++) {
                switch (i) {
                    case 0:
                        date = getFirstWeek()
                        break
                    case 1:
                        date = getSecondWeek()
                        break
                    case 2:
                        date = getThirdWeek()
                        break
                }
                const edt = await getAllData("edt")
                if (edt[date]) {
                    if (edt[date].myges != 'OLD' && edt[date].myges != 'UNDEFINED') {
                        const mygesOut = (await exec(`myges agenda ${date}`)).stdout
                        const myges = btoa(mygesOut)
                        if (edt[date].myges != myges && !mygesOut.includes('Request failed with status code 502')) {
                            console.log("old", edt[date].myges)
                            console.log("new", myges)
                            await updateData("edt", date, { myges: 'OLD' })
                            client.channels.cache.get("871440882811928646").send(`<@676690539126718467> | L'EDT du ${date} a changé !`).catch(() => { ; });
                        }
                    }
                } else {
                    await createData("edt", date, { link: '', desc: false, myges: 'UNDEFINED' })
                    client.channels.cache.get("871440882811928646").send(`<@676690539126718467> | L'EDT du ${date} est vide !`).catch(() => { ; });
                }
            }
        } catch (e) {
            console.log("error while check mg",e)
        }
    }, 900000)
}

const edtSenderCheck = (client: any) => {
    const mygesCooldown = new Set();
    let lastPastille = '🔴';
    const askMyges = (edt: any, edtDate: string) => {
        return new Promise(async (resolve) => {
            let pastille;
            let myges;
            if (!mygesCooldown.has('cd')) {
                try {
                    myges = btoa((await exec(`myges agenda ${edtDate}`)).stdout);
                    pastille = (edt[edtDate].myges == myges ? '🟢' : '🔴');
                } catch {
                    pastille = '🟠';
                }
                lastPastille = pastille
                mygesCooldown.add('cd');
                setTimeout(() => {
                    mygesCooldown.delete('cd');
                }, 600000);
                resolve(pastille);
            } else {
                resolve(lastPastille);
            }
        })
    }
    setInterval(async () => {
        try {
            const date: any = new Date();
            let nextMonday: any = new Date();
            nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()))));
            var datesplit = (nextMonday.toLocaleString('en', {
                dateStyle: 'short'
            }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) {
                    datesplit[index] = `20${item}`;
                } else if (item.length == 1) {
                    datesplit[index] = `0${item}`;
                }
            });
            nextMonday = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
            if (date.getHours() >= 17 && date.getHours() <= 18 && date.getDay() == 5) {
                const edtsub = await getAllData('edtsub');
                const edt = await getAllData('edt')
                for (const [key, val] of Object.entries(edtsub)) {
                    const currentDate = nextMonday;
                    // @ts-ignore
                    if (val.sended != currentDate) {
                        // @ts-ignore
                        updateData('edtsub', key, { sended: currentDate });
                        if (!edt[currentDate] || edt[currentDate].myges == 'UNDEFINED') {
                            return (client.channels.cache.get("871440882811928646")).send(`<@676690539126718467> | <@${key}> waits EDT 1 ${currentDate}\n\`&edt sendmp ${currentDate} ${key} 1\``).catch(() => { })
                        } else {
                            // send
                            const userToSend = (client.users.cache.get(key));
                            const pastille = await askMyges(edt, currentDate);
                            const dateFinale = moment().format("DD/MM/YYYY");
                            if (!edt[currentDate].desc) {
                                await userToSend.send({ content: `*Réception automatique <#868524232898908190>*\n🗓️ **__${dateFinale}__ ${pastille} <@${userToSend.id}> voici l'emploi du temps dans deux semaines**`, files: [edt[currentDate].link] }).catch(() => { ; });
                            } else {
                                await userToSend.send({ content: `*Réception automatique <#868524232898908190>*\n🗓️ **__${dateFinale}__ ${pastille} <@${userToSend.id}> voici l'emploi du temps dans deux semaines**\n**Détails:**\n${edt[currentDate].desc}`, files: [edt[currentDate].link] }).catch(() => { ; });
                            }
                        }
                    }
                }
            }
        } catch (e) {

        }
    }, 600000)
}

// vérification de rappel demandé par l'utilisateur
const edtReminderCheck = (client: any) => {
    setInterval(async () => {
        try {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            var datesplit = (date.toLocaleString('en', { dateStyle: 'short' }).toString().split(`/`));
            datesplit.forEach((item, index) => {
                if (index == 2) { datesplit[index] = `20${item}`; } else if (item.length == 1) { datesplit[index] = `0${item}`; }
            });
            var currentDatefinale = `${datesplit[1]}-${datesplit[0]}-${datesplit[2]}`;
            if (date.getHours() >= 18) {
                const edtremind = await getAllData("edtremind");
                if (!edtremind[currentDatefinale]?.hour) return;
                statsAddRemind();
                deleteData('edtremind', currentDatefinale);
                let channel = client.channels.cache.get(`762698661892849714`);
                await channel.send(`<@&871298355161092186> <a:bell:868901922483097661> Vous commencez à **${edtremind[currentDatefinale].hour}** demain !`).catch(() => { ; });
            }
        } catch (e: any) {

        }
    }, 57000)
}

export { edtReminderCheck, edtSenderCheck, mygesCheck }