const { getAllData, createData } = require("../firebase/firebase");

const getNotesCryptedInDb = async () => {
    const notes = await getAllData("note");
    if (notes.current?.notes) {
        return notes.current.notes;
    } else return false;
}

const setNotesCryptedInDb = async (note) => {
    return await createData("note", "current", { notes: note });
}

module.exports = { getNotesCryptedInDb, setNotesCryptedInDb }