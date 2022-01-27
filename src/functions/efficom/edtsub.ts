import { createData, deleteData } from '../../firebase/firebase';

// ajouter une stat edt
const edtAddSub = async (user: any) => {
    await createData('edtsub',user.id, {sended: false})
}

// ajouter une stat remind
const edtRemoveSub = async (user: any) => {
    await deleteData('edtsub',user.id)

}

export { edtAddSub, edtRemoveSub }