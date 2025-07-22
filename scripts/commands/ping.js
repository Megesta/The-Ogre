const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const reply = await interaction.reply({
			content: '**Measuring the ping...**',
			ephemeral: true,
		});
		reply.edit('Your average ping related to me is around `' + Math.round(reply.createdTimestamp - interaction.createdTimestamp) + 'ms`!');
	},
};