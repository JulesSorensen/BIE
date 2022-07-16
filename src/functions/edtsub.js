const { createData, deleteData } = require('../firebase/firebase');

// ajouter une stat edt
const edtAddSub = async (user) => {
    await createData('edtsub',user.id, {sended: false})
}

// ajouter une stat remind
const edtRemoveSub = async (user) => {
    await deleteData('edtsub',user.id)

}

module.exports = { edtAddSub, edtRemoveSub }