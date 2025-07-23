const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const { reportsChannelID, logsChannelID, serverRoleIDs } = require('../../config.json');

module.exports = {
	cooldown: 40,
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Reports the user with provided description and screenshot.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('A user to get reported.')
				.setRequired(true),
		)
		.addAttachmentOption(option =>
			option.setName('screenshot')
				.setDescription('Image/screenshot of a reported user breaking rules.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description of the offense.')
				.setRequired(false),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const desc = interaction.options.getString('description');
		const scsh = interaction.options.getAttachment('screenshot');
		const canLog = logsChannelID != 'None';

		const roleinfo1 = interaction.guild.roles.cache.get(serverRoleIDs.moderatorRoleID);
		const roleinfo2 = interaction.guild.roles.cache.get(serverRoleIDs.ownerRoleID);

		const spath = scsh.url.split('?')[0];

		if (reportsChannelID == 'None') {
			return interaction.reply({
				content: 'Making reports is not currently supported!',
				flags: MessageFlags.Ephemeral,
			});
		}

		if (!spath.endsWith('.png')) {
			return interaction.reply({
				content: 'Please send an image of a `.png` type!',
				flags: MessageFlags.Ephemeral,
			});
		}

		try {
			const embed = new EmbedBuilder()
				.setDescription('## REPORT\n' + (desc ? desc : 'No description provided.') + `\n* Author: \`<@${interaction.user.id}>\`, \`${interaction.user.tag}\`\n* User: \`<@${user.id}>\`, \`${user.tag}\``)
				.setColor('DarkRed')
				.setImage(scsh.url);

			interaction.reply({
				content: 'Your report was successfully sent and is waiting for review!',
				flags: MessageFlags.Ephemeral,
			});
			interaction.client.channels.cache.get(reportsChannelID).send({ embeds: [embed], content: `-# ${roleinfo1} ${roleinfo2}` });
			if (canLog) {
				interaction.client.channels.cache.get(logsChannelID).send({ content: `\`<@${interaction.user.id}>\`, \`${interaction.user.tag}\` just sent a report!`, flags: [4096] });
			};
		}
		catch (error) {
			// Catching the error
			console.error(error);
			await interaction.reply({
				content: 'There was an error while making a report...',
				flags: MessageFlags.Ephemeral,
			});
		};
	},
};