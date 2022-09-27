const { edtAddSub, edtRemoveSub } = require("../functions/edtsub");
const { addNewMerci } = require("../functions/merci");

const reactionAdded = (reaction, user) => {
    try {
        if (reaction.message.channel.id == `991371617043222638`) {
            if (reaction.emoji.name == `🔔`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`996043089309347941`).id);
            } else if (reaction.emoji.name == `💯`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`996043159077408768`).id);
            } else if (reaction.emoji.name == `📔`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`996043232410599565`).id);
            } else if (reaction.emoji.id == `934492755244245052`) {
                edtAddSub(user);
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`996042225895092244`).id);
            }
        }
        if (reaction.emoji.id == `1022118516129792000`) {
            if (!user.bot) addNewMerci(reaction, user);
        }
    } catch (error) {

    }
}

const reactionRemoved = (reaction, user) => {
    try {
        if (reaction.message.channel.id == `991371617043222638`) {
            if (reaction.emoji.name == `🔔`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`996043089309347941`).id);
            } else if (reaction.emoji.name == `💯`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`996043159077408768`).id);
            } else if (reaction.emoji.name == `📔`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`996043232410599565`).id);
            } else if (reaction.emoji.id == `934492755244245052`) {
                edtRemoveSub(user);
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`996042225895092244`).id);
            }
        }
    } catch (error) {

    }
}

module.exports = { reactionAdded, reactionRemoved }