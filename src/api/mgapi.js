const axios = require('axios');
const sha1 = require('sha1');
const { encrypt, decrypt } = require('../tasks/crypter.js');
const { getAllData, createData } = require('../firebase/firebase');
const moment = require("moment");

const mgLogin = async (username, password) => {
    const token = await mgGenerateAccessToken(username, password);
    if (!token) {
        throw new Error('Bad credentials');
    }
    return token;
}
const mgGenerateAccessToken = async (username, password) => {
    var _a, _b, _c;
    try {
        const credentials = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
        await axios.get('https://authentication.kordis.fr/oauth/authorize?response_type=token&client_id=skolae-app', {
            headers: {
                Authorization: `Basic ${credentials}`,
            },
            maxRedirects: 0
        });
        return null;
    }
    catch (e) {
        if (!((_c = (_b = (_a = e.request) === null || _a === void 0 ? void 0 : _a.res) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.location)) {
            throw new Error('Bad password');
        }
        const { location } = e.request.res.headers;
        const hash = location.slice(location.indexOf('#') + 1);
        const properties = hash
            .split('&')
            .map((property) => property.split('='))
            .reduce((acc, [name, value]) => (Object.assign(Object.assign({}, acc), { [name]: value })), {});
        return {
            access_token: properties.access_token,
            token_type: properties.token_type,
            expires_in: properties.expires_in,
            scope: properties.scope,
            uid: properties.uid,
        };
    }
}

const getToken = async (force = false) => {
    const generateNewToken = async () => {
        const tokenRes = await mgLogin(process.env.MYGES_LOGIN, process.env.MYGES_PASSWORD);
        const exp = Math.floor(new Date().getTime() / 1000 + parseInt(tokenRes.expires_in));

        return { token: tokenRes.access_token, exp: exp };
    }
    const mgDatas = await getAllData("myges");
    let regenerateToken = true;
    let token;
    if (mgDatas?.data?.content && mgDatas?.data?.iv && !force) {
        try {
            const tokenDatas = JSON.parse(decrypt(mgDatas.data));
            const curTS = Math.floor(new Date().getTime() / 1000 - 600);
            if (tokenDatas.token && tokenDatas.exp || curTS < tokenDatas.exp) {
                regenerateToken = false;
                token = tokenDatas.token;
            }
        } catch (e) { }
    }

    if (regenerateToken) {
        const tokenDatas = await generateNewToken();
        const hash = encrypt(JSON.stringify(tokenDatas));
        await createData("myges", "data", hash)
        token = tokenDatas.token;
    }

    return token;
}

const getNotesCrypted = async () => {
    const token = await getToken();
    let grades;
    try {
        grades = await axios.get(`https://api.kordis.fr/me/2022/grades`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        if (error?.response?.data?.error === "invalid_token") {
            grades = await axios.get(`https://api.kordis.fr/me/2022/grades`, { headers: { Authorization: `Bearer ${await getToken(true)}` } });
        } else throw error;
    }
    return sha1(grades?.data === "" ? "UNDEFINED" : JSON.stringify(grades.data.result));
}

const getAgendaCrypted = async (dates) => {
    const { start, end } = { start: moment(dates.start, "YYYY-MM-DD").toDate().valueOf(), end: moment(dates.end, "YYYY-MM-DD").toDate().valueOf() };
    const token = await getToken();
    let agenda;
    try {
        agenda = await axios.get(`https://api.kordis.fr/me/agenda?start=${start}&end=${end}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        if (error?.response?.data?.error === "invalid_token") {
            agenda = await axios.get(`https://api.kordis.fr/me/agenda?start=${start}&end=${end}`, { headers: { Authorization: `Bearer ${await getToken(true)}` } });
        } else throw error;
    }
    return sha1(JSON.stringify(agenda?.data?.result));
}

module.exports = { getNotesCrypted, getAgendaCrypted };