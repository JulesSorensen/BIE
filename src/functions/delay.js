const { getData } = require("../firebase/firebase");

const delays = new Map();

const isUserInDelay = async (userId, initType) => {
    const { type } = await getUserDelayNbAndType(userId, initType);
    return delays.get(userId)?.includes(type) ?? false;
};

const addUserDelay = async (userId, initType) => {
    const { userDelay, type } = await getUserDelayNbAndType(userId, initType);

    if (delays.has(userId)) {
        if (!delays.get(userId).includes(type)) {
            delays.get(userId).push(type);
        }
    } else {
        delays.set(userId, [type]);
    }

    setTimeout(() => {
        if (delays.get(userId) && delays.get(userId)?.includes(type)) {
            const oldDelay = delays.get(userId);
            delays.delete(userId);
            delays.set(
                userId,
                oldDelay.filter((delay) => delay !== type)
            );
        } else {
            if (delays.get(userId)) delays.delete(userId);
        }
    }, userDelay);
};

const getUserDelayNbAndType = async (userId, type) => {
    const userData = await getData("merci", userId);

    if (!userData) {
        return { userDelay: 60000, type: type };
    }

    switch (true) {
        case userData.count >= 50:
            return { userDelay: 1000, type: type };
        case userData.count >= 10:
            return { userDelay: 15000, type: type };
        case userData.count >= 5:
            return { userDelay: 30000, type: type };
        default:
            return { userDelay: 60000, type: type };
    }
};

module.exports = { isUserInDelay, addUserDelay };
