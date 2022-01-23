import { DiscordMessage } from '../../interface/DiscordMessage';

// functions for edit json files | data base
function changePrefix(pref: string, msg: DiscordMessage) { // prefix
    customprefix[msg.guild.id] = pref;
    fs.writeFile(`./data/prefix.json`, JSON.stringify(customprefix), err => {
        if (err) throw err;
    });
}

// changer la langue
function changeLanguage(language: string, msg: DiscordMessage) { // languages
    lang[msg.author.id] = language
    fs.writeFile(`./data/lang.json`, JSON.stringify(lang), err => {
        if (err) throw err;
    });
}