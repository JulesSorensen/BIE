import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
const serviceAccount = require('./admin.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const faktion = () => {};

/**
 * Create the document on Firestore, even if the collection does not exist.
 * Returns null if there's no error, otherwise the error is returned.
 * @param {string} col - Firestore collection name.
 * @param {string} id - Firestore document id.
 * @param {object} data - Firestore document data.
 */
const createData = async (col: string, id: string, data: object) => {
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
const updateData = async (col: string, id: string, data: object) => {
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
const getAllData = async (col: string) => {
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
const getData = async (col: string, id: string) => {
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
const deleteData = async (col: string, id: string) => {
  try {
    return await db.collection(col).doc(id).delete();
  } catch (e) {
    Promise.reject(e);
  }
}

// getAllData("users", (d) => {
//   console.log("2",d)
// })
// getData("users", "123", (d) => { console.log("1", d) }).catch((err) => console.log("err", err))
// createData("users", "123", { "test": false })
// deleteData("users", "aturing", ()=>{
//   console.log("deleted")
// })
// updateData("users","123",{test:true,lol:true},(r)=>console.log(r)).catch((err) => console.log("err", err))

export { createData, updateData, getData, getAllData, deleteData };