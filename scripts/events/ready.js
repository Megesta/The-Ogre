const { Events } = require('discord.js');
const { logsChannelID } = require('../../config.json');
// Notifying everyone that the bot is now online
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// Checking if there is a log channel configured
		const canLog = logsChannelID != 'None';
		console.log(`Ready! Logged in as ${client.user.tag}.`);

		if (canLog) {
			client.channels.cache.get(logsChannelID).send({
				content: 'I am online from now on.',
				flags: [4096],
			});
		};
	},
};