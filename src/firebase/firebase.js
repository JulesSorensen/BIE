const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, } = require('firebase-admin/firestore');
const { decrypt, encrypt } = require("../tasks/crypter");

const credentials = JSON.parse(decrypt(process.env.GOOGLE_CREDENTIALS_CONTENT).split("\n").join("\\n"));
initializeApp({
  credential: cert(credentials)
});

const db = getFirestore();

/**
 * Create the document on Firestore, even if the collection does not exist.
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 * @param {string} id - Firestore document id.
 * @param {object} data - Firestore document data.
 */
const createData = async (col, id, data) => {
  try {
    const ref = db.collection(col).doc(id);
    return ref.set(data);
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * Update the document on Firestore
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 * @param {string} id - Firestore document id.
 * @param {object} data - Firestore document data.
 */
const updateData = async (col, id, data) => {
  try {
    return await db.collection(col).doc(id).update(data);
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * Collect all data from the Firestore collection.
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 */
const getAllData = async (col) => {
  try {
    let datas = {};
    const ref = await db.collection(col).get();
    ref.forEach((doc) => {
      datas[doc.id] = { ...doc.data() };
    });
    return datas
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * Collect one data from the Firestore collection.
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 * @param {string} id - Firestore document id.
 */
const getData = async (col, id) => {
  try {
    return (await db.collection(col).doc(id).get()).data();
  } catch (e) {
    Promise.reject(e);
  }
}

/**
 * Deletes the requested data from Firestore. Do nothing if the data is incorrect.
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 * @param {string} id - Firestore document id.
 */
const deleteData = async (col, id) => {
  try {
    return await db.collection(col).doc(id).delete();
  } catch (e) {
    Promise.reject(e);
  }
}

module.exports = { createData, updateData, getData, getAllData, deleteData };