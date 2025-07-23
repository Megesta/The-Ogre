const { SlashCommandBuilder, MessageFlags, PermissionsBitField } = require('discord.js');
const { logsChannelID } = require('../../config.json');
// Allows Administrators to finish bot sessions through the discord app
module.exports = {
	data: new SlashCommandBuilder()
		.setName('logoff')
		.setDescription('Forces the bot to log off and finish their session.'),
	async execute(interaction) {
		// Creating shortcuts
		const member = interaction.guild.members.cache.get(interaction.user.id);
		const isAdmin = member.permissions.has(PermissionsBitField.Flags.Administrator);
		const canLog = logsChannelID != 'None';
		// Checking if user is allowed to use this command
		if (!isAdmin) {
			return interaction.reply({
				content: 'Youre not allowed to use this command!',
				flags: MessageFlags.Ephemeral,
			});
		};
		// Logging the action for better debugging
		console.log('Administrator forced me to log off.');
		// Notifying the admin
		await interaction.reply({
			content: 'OK, I am logging off.',
			flags: MessageFlags.Ephemeral,
		});
		// Logging the action
		if (canLog) {
			interaction.client.channels.cache.get(logsChannelID).send({
				content: '`<@' + member.user.id + '>`, `' + member.user.tag + '` forced me to log off!',
				flags: [4096],
			});
		};
		// Logging off
		interaction.client.destroy();
	},
};