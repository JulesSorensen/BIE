const axios = require("axios");
const sha1 = require("sha1");
const { encrypt, decrypt } = require("../tasks/crypter.js");
const { getAllData, createData } = require("../firebase/firebase");
const { getCurrentDate } = require("../tasks/dates.js");

const mgLogin = async (username, password) => {
  const token = await mgGenerateAccessToken(username, password);
  if (!token) {
    throw new Error("Bad credentials");
  }
  return token;
};
const mgGenerateAccessToken = async (username, password) => {
  var _a, _b, _c;
  try {
    const credentials = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    await axios.get(
      "https://authentication.kordis.fr/oauth/authorize?response_type=token&client_id=skolae-app",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
        maxRedirects: 0,
      }
    );
    return null;
  } catch (e) {
    if (
      !((_c =
        (_b = (_a = e.request) === null || _a === void 0 ? void 0 : _a.res) ===
          null || _b === void 0
          ? void 0
          : _b.headers) === null || _c === void 0
        ? void 0
        : _c.location)
    ) {
      throw new Error("Bad password");
    }
    const { location } = e.request.res.headers;
    const hash = location.slice(location.indexOf("#") + 1);
    const properties = hash
      .split("&")
      .map((property) => property.split("="))
      .reduce(
        (acc, [name, value]) =>
          Object.assign(Object.assign({}, acc), { [name]: value }),
        {}
      );
    return {
      access_token: properties.access_token,
      token_type: properties.token_type,
      expires_in: properties.expires_in,
      scope: properties.scope,
      uid: properties.uid,
    };
  }
};

const getToken = async (force = false) => {
  const generateNewToken = async () => {
    const tokenRes = await mgLogin(
      process.env.MYGES_LOGIN,
      process.env.MYGES_PASSWORD
    );
    const exp = Math.floor(
      new Date().getTime() / 1000 + parseInt(tokenRes.expires_in)
    );

    return { token: tokenRes.access_token, exp: exp };
  };

  const mgDatas = await getAllData("myges");
  let regenerateToken = true;
  let token;
  if (mgDatas?.data?.token && !force) {
    try {
      const tokenDatas = JSON.parse(decrypt(mgDatas.data));
      const curTS = Math.floor(new Date().getTime() / 1000 - 600);
      if ((tokenDatas.token && tokenDatas.exp) || curTS < tokenDatas.exp) {
        regenerateToken = false;
        token = tokenDatas.token;
      }
    } catch (e) { }
  }

  if (regenerateToken) {
    const tokenDatas = await generateNewToken();
    const encryptedData = encrypt(JSON.stringify(tokenDatas));
    await createData("myges", "data", { token: encryptedData });
    token = tokenDatas.token;
  }

  return token;
};

const getNotesCrypted = async () => {
  const token = await getToken();
  let grades;
  try {
    grades = await axios.get(`https://api.kordis.fr/me/2022/grades`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error?.response?.data?.error === "invalid_token") {
      grades = await axios.get(`https://api.kordis.fr/me/2022/grades`, {
        headers: { Authorization: `Bearer ${await getToken(true)}` },
      });
    } else throw error;
  }
  return sha1(
    grades?.data === "" ? "UNDEFINED" : JSON.stringify(grades.data.result)
  );
};

const getAgendaCrypted = async (dates, withDetails = false) => {
  const { start, end } = {
    start: getCurrentDate(dates.start, "YYYY-MM-DD").toDate().valueOf(),
    end: getCurrentDate(dates.end, "YYYY-MM-DD").toDate().valueOf(),
  };
  const token = await getToken();
  let agenda;
  try {
    agenda = await axios.get(
      `https://api.kordis.fr/me/agenda?start=${start}&end=${end}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error?.response?.data?.error === "invalid_token") {
      agenda = await axios.get(
        `https://api.kordis.fr/me/agenda?start=${start}&end=${end}`,
        { headers: { Authorization: `Bearer ${await getToken(true)}` } }
      );
    } else throw error;
  }

  let details = ``;
  if (withDetails) {
    const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    let detailsPerDate = {};

    agenda.data.result.forEach((event) => {
      const currentDate = jours[getCurrentDate(new Date(event.start_date)).day() - 1];
      const matinOuAprem = getCurrentDate(new Date(event.start_date)).hour() < 13 ? "am" : "pm";
      if (!detailsPerDate[currentDate]) {
        detailsPerDate[currentDate] = {};
        detailsPerDate[currentDate]["am"] = [];
        detailsPerDate[currentDate]["pm"] = [];
      }

      let eventName = event.name;
      if (event.comment) {
        eventName += ` (*${event.comment}*)`;
      }
      if (event.discipline.teacher_id) {
        eventName += ` [__${event.discipline.teacher}__]`;
      }

      if (!detailsPerDate[currentDate][matinOuAprem].includes(eventName)) {
        detailsPerDate[currentDate][matinOuAprem].push(eventName);
      }
    });

    // details
    const sortedDetailsPerDate = {};
    Object.keys(detailsPerDate)
      .sort((a, b) => jours.indexOf(a) - jours.indexOf(b))
      .forEach((key) => {
        sortedDetailsPerDate[key] = detailsPerDate[key];
      });

    Object.keys(sortedDetailsPerDate).forEach((day) => {
      details += `__**${day}**__\\n`;
      details += `   **Matin :** ${detailsPerDate[day]["am"].length > 0 ? detailsPerDate[day]["am"].join(" / ") : "aucun cours"}\\n`;
      details += `   **Après-midi :** ${detailsPerDate[day]["pm"].length > 0 ? detailsPerDate[day]["pm"].join(" / ") : "aucun cours"}\\n`;
    });

    setRemind(agenda);
    setSalles({ agenda: agenda });

    return {
      cryptedAgenda: sha1(JSON.stringify(agenda?.data?.result)),
      details: details
    };
  }
  return sha1(JSON.stringify(agenda?.data?.result));
};

const setRemind = async (agenda) => {
  const startHourPerDate = {};
  agenda?.data?.result.map((event) => {
    const currentDate = getCurrentDate(new Date(event.start_date)).format("YYYY-MM-DD");
    const currentHour = getCurrentDate(new Date(event.start_date)).format("H[h]mm");

    if (!startHourPerDate[currentDate]) {
      startHourPerDate[currentDate] = currentHour;
    } else if (getCurrentDate(currentHour, "H[h]mm").isBefore(getCurrentDate(startHourPerDate[currentDate], "H[h]mm"))) {
      startHourPerDate[currentDate] = currentHour;
    }
  });

  Object.keys(startHourPerDate).forEach(async (date) => {
    await createData("edtremind", date, { "hour": startHourPerDate[date] });
  });
};

const setSalles = async (params) => {
  if (!params.agenda) {
    const token = await getToken();
    try {
      params.agenda = await axios.get(
        `https://api.kordis.fr/me/agenda?start=${params.start}&end=${params.end}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      if (error?.response?.data?.error === "invalid_token") {
        params.agenda = await axios.get(
          `https://api.kordis.fr/me/agenda?start=${params.start}&end=${params.end}`,
          { headers: { Authorization: `Bearer ${await getToken(true)}` } }
        );
      } else throw error;
    }
  }

  const salles = {};
  params.agenda?.data?.result.map((event) => {
    const datetime = getCurrentDate(new Date(event.start_date));
    const date = datetime.format("YYYY-MM-DD");
    const time = datetime.format("H[h]mm");

    if (!salles[date]) { salles[date] = {}; }

    salles[date][event.start_date] = `**${time}** - ${event.rooms ? event.rooms.length > 1 ? "Salles" : "Salle" : "Aucune salle définie"} ${event.rooms ? event.rooms.map((room) => `**__${room.name}__** **${room.floor}**`).join(" / ") : ''} ${event.name ? `(*${event.name}*)` : ''}`;
  });

  await (async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  })(Object.keys(salles), async (date) => {
    await createData("salles", date, salles[date]);
  })
  return;
};

module.exports = { getNotesCrypted, getAgendaCrypted, setSalles };
