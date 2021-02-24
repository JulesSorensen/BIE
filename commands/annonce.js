module.exports = {
	name: 'annonce',
	description: 'Information about the arguments provided.',
    args: false,
	usage: 'test',
	execute(msg, args, client, prefix, getca, version) {
        if (msg.author.id != "792026499388669952") return;
        ann = ""
        for (let i = 0; i < args.length; i++) {
            if (i == 0) { ann = ann + args[i] } else { ann = ann + " " + args[i] }
        }
        let efficomsalon = client.channels.cache.get("776093234005934111");
        efficomsalon.send(ann);
        msg.delete({timeout: 500})
	}
};