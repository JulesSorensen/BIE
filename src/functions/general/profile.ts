import { DiscordMessage } from '../../interface/DiscordMessage';
import { createData, updateData, getData, getAllData, deleteData } from '../../firebase/firebase';

const getProfile = async (msg: DiscordMessage, id: number) => {
    let profil: any = await getData("users", id.toString())
    if(!profil) {
        let randomColor = (('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)).toString())
        profil = {
            version: "2.1",
            experience: 0,
            level: 1,
            name: `${msg.author.username}#${msg.author.discriminator}`,
            namechangement: 6,
            color: randomColor,
            picture: `default`,
            description: "",
            messages: 1,
            banned: [],
            status: true,
            clan: false
        }
        await createData("users", id.toString(), profil)
    }
    return profil
} 

// function profileColor(msg: DiscordMessage, color: string) {
//     profile[msg.author.id].color = color; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// function profilePicture(msg: DiscordMessage, picture: string) {
//     profile[msg.author.id].picture = picture; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// function profilePictureReset(msg: DiscordMessage) {
//     profile[msg.author.id].picture = `default`; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// function profileDescription(msg: DiscordMessage, description: string) {
//     profile[msg.author.id].description = description + `\n­`; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// function profileDescriptionReset(msg: DiscordMessage) {
//     profile[msg.author.id].description = ""; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// function profileRename(msg: DiscordMessage, name: string) {
//     profile[msg.author.id].name = name; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
//     profile[msg.author.id].namechangement -= 1; fs.writeFile(`./data/profile.json`, JSON.stringify(profile), err => { if (err) throw err; });
// }

// export { profileColor, profileDescription, profileDescriptionReset, profilePicture, profilePictureReset, profileRename }
export { getProfile }