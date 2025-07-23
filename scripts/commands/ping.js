const { SlashCommandBuilder, MessageFlags } = require('discord.js');
// The command to test bot's session quality
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		interaction.reply({
			content: 'Wait a bit...',
			flags: MessageFlags.Ephemeral,
		}).then(result => {
			// Calculating stuff
			const latency = result.createdTimestamp - interaction.createdTimestamp;
			const dclatency = Math.abs(Date.now() - result.createdTimestamp);
			// Outputing it to the user and to the console for better debugging
			result.edit(`## Pong!\n* Your latency with server is **${interaction.client.ws.ping}ms**;\n* My latency with you is **${latency}ms**;\n* My latency with server is **${dclatency}ms**!`);
			console.log('Showed <@' + interaction.user.id + '> their latency.');
		});
	},
};