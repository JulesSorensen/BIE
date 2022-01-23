import { createData, updateData, getData, getAllData, deleteData } from './src/firebase/firebase';

// updateData("users", "123", { test: true, lol: true }, () => {

// }).catch((err) => console.log("err", err))

(async () => {
    console.log(await getData("edt", "3hY6iX456MySCPlRdmMI"))
    console.log(await getAllData("edt"))
    console.log(await updateData("edt", "24-01-2022", {desc: false}))
})()
