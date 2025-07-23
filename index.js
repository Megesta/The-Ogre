// Requiring some stuff
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');

// Update paths here, if you decide to change locations
const scripts = path.join(__dirname, 'scripts');
const commandFolder = path.join(scripts, 'commands');
const eventFolder = path.join(scripts, 'events');

// Intents can be updated if your bot refuses to do some actions, such as not reading user messages and etc.
const Intents = [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ];
// Setting up the discord client
const client = new Client({ intents: Intents });
client.commands = new Collection();

// Loading it up
const commandFiles = fs.readdirSync(commandFolder);
const eventFiles = fs.readdirSync(eventFolder);

for (const event of eventFiles) {
	const loc = path.join(eventFolder, event);
	const file = require(loc);

	if (!file.execute || !file.name) {
		console.log(`[WARNING] The event at ${loc} is missing a required "name" or "execute" property.`);
		continue;
	}

	if (file.once) {
		client.once(file.name, (...args) => file.execute(...args));
	}
	else {
		client.on(file.name, (...args) => file.execute(...args));
	}
}

for (const command of commandFiles) {
	const loc = path.join(commandFolder, command);
	const file = require(loc);
	if ('data' in file && 'execute' in file) {
		client.commands.set(file.data.name, file);
	}
	else {
		console.log(`[WARNING] The command at ${loc} is missing a required "data" or "execute" property.`);
	}
}

// Logging up with the given token
client.login(token);