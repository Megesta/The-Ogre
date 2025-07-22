const { SlashCommandBuilder } = require('discord.js');
const { serverRoleIDs } = require('../../config.json');

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
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		const member = interaction.guild.members.cache.get(interaction.user.id);

		console.log(`<@${interaction.user.id}> tried to update ${commandName}!`);

		if (serverRoleIDs.ownerRoleID != member.roles.cache.first().id && !member.permissions.has('ADMINISTRATOR')) {
			return interaction.reply({
				content: 'Youre not allowed to use this command!',
				ephemeral: true,
			});
		}

		if (!command) {
			return interaction.reply({
				content: `There is no command with name \`${commandName}\`!`,
				ephemeral: true,
			});
		}

		delete require.cache[require.resolve(`./${command.data.name}.js`)];

		try {
			const newCommand = require(`./${command.data.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply({
				content: `Command \`${newCommand.data.name}\` was reloaded!`,
				ephemeral: true,
			});
		}
		catch (error) {
			console.error(error);
			await interaction.reply({
				content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
				ephemeral: true,
			});
		}
	},
};