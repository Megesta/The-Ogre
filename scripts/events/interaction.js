const { Events, MessageFlags } = require('discord.js');
// Loading and setting up all the slash commands
module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		// We cant allow the commands to be just a text
		if (!interaction.isChatInputCommand()) return;
		// Checking up the validity of the message
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		// Executing the callback function
		try {
			await command.execute(interaction);
		}
		catch (error) {
			// And outputting the error of cource
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};