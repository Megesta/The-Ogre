const { SlashCommandBuilder, MessageFlags, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { logsChannelID } = require('../../config.json');
// A command to allow moderators delete user messages
module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purges all the channel messages in given range.')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Messages range to iterate in (1-100).')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100),
		)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user whos messages has to be purged.')
				.setRequired(false),
		),
	async execute(interaction) {
		// Defining some values
		const amount = interaction.options.getInteger('amount');
		const user = interaction.options.getUser('user');
		const canLog = logsChannelID != 'None';
		const member = interaction.guild.members.cache.get(interaction.user.id);
		const isAllowed = member.permissions.has(PermissionsBitField.Flags.ManageMessages);
		// Checking if user is allowed to use this command
		if (!isAllowed) {
			return interaction.reply({
				content: 'Youre not allowed to use this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
		// Deleting the messages
		try {
			// Researching messages to delete
			await interaction.channel.messages.fetch({
				limit: amount,
			}).then((messages) => {
				// Sorting messages, so only set user's messages get deleted
				if (user) {
					messages = messages.filter(m => m.author.id == user.id);
				}
				// Deleting messages
				interaction.channel.bulkDelete(messages);
			});
			const embed = new EmbedBuilder().setColor('DarkRed').setDescription(`## Command completed!\nSucessfully purged **${amount}** \`${user ? user.tag : 'NO-SET'}\`'s messages!`);
			// Logging the action
			interaction.reply({ embeds: [embed] });
			console.log(`<@${interaction.user.id}>, ${interaction.user.tag} purged ${amount} message(s) of ${user ? user.tag : 'NO-SET'}`);
			if (canLog) {
				interaction.client.channels.cache.get(logsChannelID).send({
					content: `\`<@${interaction.user.id}>\`, \`${interaction.user.tag}\` purged **${amount} message(s)** of \`<@${user ? user.id : 'NO-SET'}>\`, \`${user ? user.tag : 'NO-SET'}\`!`,
					flags: [4096],
				});
			};
		}
		catch (error) {
			// Outputing the error we catched
			console.error(error);
			await interaction.reply({
				content: `There was an error while purging \`${amount}\` messages of \`${user ? user.tag : 'NO-SET'}\``,
				flags: MessageFlags.Ephemeral,
			});
		};
	},
};