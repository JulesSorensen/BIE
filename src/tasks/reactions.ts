import { edtAddSub, edtRemoveSub } from "../functions/efficom/edtsub";

const reactionAdded = (reaction: any, user: any) => {
    try {
        if (reaction.message.channel.id == `868524232898908190`) {
            if (reaction.emoji.name == `🔔`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`871298355161092186`).id);
            } else if (reaction.emoji.name == `💯`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`871298481233494027`).id);
            } else if (reaction.emoji.name == `📔`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`893923446940123137`).id);
            } else if (reaction.emoji.id == `875369282207354920`) {
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`875369959503581244`).id);
            } else if (reaction.emoji.id == `934492755244245052`) {
                edtAddSub(user);
                reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get(`934498287413755904`).id);
            }
        }
    } catch (error) {

    }
}

const reactionRemoved = (reaction: any, user: any) => {
    try {
        if (reaction.message.channel.id == `868524232898908190`) {
            if (reaction.emoji.name == `🔔`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`871298355161092186`).id);
            } else if (reaction.emoji.name == `💯`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`871298481233494027`).id);
            } else if (reaction.emoji.name == `📔`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`893923446940123137`).id);
            } else if (reaction.emoji.id == `875369282207354920`) {
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`875369959503581244`).id);
            } else if (reaction.emoji.id == `934492755244245052`) {
                edtRemoveSub(user);
                reaction.message.guild.members.cache.get(user.id).roles.remove(reaction.message.guild.roles.cache.get(`934498287413755904`).id);
            }
        }
    } catch (error) {

    }
}

export { reactionAdded, reactionRemoved }