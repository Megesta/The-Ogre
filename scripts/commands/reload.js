const { SlashCommandBuilder, MessageFlags, PermissionsBitField } = require('discord.js');
const { logsChannelID } = require('../../config.json');
// Reloading the command to not restart the bot each time we need to test a slash command
module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
	async execute(interaction) {
		// Creating shortcuts
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);
		const member = interaction.guild.members.cache.get(interaction.user.id);
		const canLog = logsChannelID != 'None';
		// Leaving a console log for better debugging
		console.log(`<@${interaction.user.id}> tried to update ${commandName}!`);
		// Checking if user has permission to do this command
		if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			return interaction.reply({
				content: 'Youre not allowed to use this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
		// Not letting user to input whatever they want
		if (!command) {
			return interaction.reply({
				content: `There is no command with name \`${commandName}\`!`,
				flags: MessageFlags.Ephemeral,
			});
		}
		// Deleting old data
		delete require.cache[require.resolve(`./${command.data.name}.js`)];

		try {
			// Binding the command from the beginning
			const newCommand = require(`./${command.data.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply({
				content: `Command \`${newCommand.data.name}\` was reloaded!`,
				flags: MessageFlags.Ephemeral,
			});
			// Logging the action to logs channel if allowed
			if (canLog) {
				interaction.client.channels.cache.get(logsChannelID).send({
					content: `\`<@${member.user.id}>\`, \`${member.user.tag}\` reloaded the **${commandName}** command!`,
					flags: [4096],
				});
			};
		}
		catch (error) {
			// Outputing the error we catched
			console.error(error);
			await interaction.reply({
				content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};