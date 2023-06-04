const { AttachmentBuilder } = require("discord.js");
const { getAgendaCrypted } = require("../api/mgapi");
const { createData, getAllData } = require("../firebase/firebase");
const qs = require("qs");
const { default: axios } = require("axios");
const { getCurrentDate } = require("../tasks/dates");

// ajout de l'emploi du temps de la semaine spécifique
const edtAdd = async (date, link, client) => {
  const uploadedImg = await axios({
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    url: `${process.env.PIC_URL}?expiration=5000000&key=${process.env.PIC_TOKEN}`,
    data: qs.stringify({
      image: link,
    }),
  });
  const edtMyges = await getAgendaCrypted({
    start: date,
    end: getCurrentDate(date, "YYYY-MM-DD").add(7, "days").format("YYYY-MM-DD"),
  }, true);

  let newEdt = { link: uploadedImg.data.data.url, myges: edtMyges.cryptedAgenda, details: edtMyges.details };

  await createData("edt", date, newEdt);
};

// Retourne les donnés de l'emploi du temps
const edtShow = async () => {
  const edt = JSON.stringify(await getAllData("edt"));
  let attachment = new AttachmentBuilder(Buffer.from(edt, "utf-8"), "edt.json");
  return { content: `**LAST EDT DATA FILE**`, files: [attachment] };
};

// affiche les alarmes de l'emploi du temps
const edtRemindShow = async () => {
  const edtremind = JSON.stringify(await getAllData("edtremind"));
  let attachment = new AttachmentBuilder(
    Buffer.from(edtremind, "utf-8"),
    "edtremind.json"
  );
  return { content: `**LAST RMD DATA FILE**`, files: [attachment] };
};

module.exports = { edtAdd, edtShow, edtRemindShow };
