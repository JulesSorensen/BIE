require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.MessageContent
	]
});
const config = require("./src/config/config.json");
const { interactionLaunch } = require("./src/tasks/commandLauch");
const { reactionAdded, reactionRemoved } = require("./src/tasks/reactions");
const {
	edtReminderCheck,
	edtSenderCheck,
	mygesCheck,
	currentNotesCheck,
} = require("./src/tasks/intervalsCheck");
const { setAllCommands } = require("./src/tasks/setAllCommands");
require("./server.js");
const version = config.version;

const authServers = [
	"762698485011054602",
	"783679631101526056",
	"831823187213680682",
];
const bannedUsers = [];
let uptime = new Date();

process.on("uncaughtException", function (err) {
	console.log("/!\\ GERROR :", err);
	client.channels.cache
		.get("922139628729958400")
		.send(`General error\n\`\`\`${err}\`\`\``)
		.catch(() => { });
});

client.on("ready", () => {
	console.log(
		`-------------------------\nLogged in as ${client.user.username} !\nVersion: ` +
		version +
		` ✅\n-------------------------\n`
	);

	client.user.setStatus(process.env.BOT_STATUS);

	edtReminderCheck(client);
	edtSenderCheck(client);
	mygesCheck(client);
	currentNotesCheck(client);

	// setAllCommands("762698485011054602", client); // efficom
	// setAllCommands("831823187213680682", client); // private server
});

client.on("interactionCreate", async (interaction) => {
	if (!bannedUsers.includes(interaction?.user?.id)) {
		await interactionLaunch(interaction, client, version, new Date(), uptime);
	}
});

client.on("messageReactionAdd", (reaction, user) => {
	if (!bannedUsers.includes(user.id)) {
		reactionAdded(reaction, user);
	}
});

client.on("messageReactionRemove", (reaction, user) => {
	if (!bannedUsers.includes(user.id)) {
		reactionRemoved(reaction, user);
	}
});

client.on("guildCreate", (guild) => {
	if (authServers.includes(guild.id)) {
		setAllCommands(guild.id, client);
	}
});

// login
client.login(process.env["TOKEN"]);
