const { SlashCommandBuilder, PermissionsBitField, MessageFlags } = require('discord.js');
const { serverRoleIDs, logsChannelID } = require('../../config.json');
// This command allows moderators and administrators to easily manage user roles
module.exports = {
	data: new SlashCommandBuilder()
		.setName('award')
		.setDescription('Rewards a user with the given role (if its allowed).')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user to be awarded.')
				.setRequired(true),
		)
		.addRoleOption(option =>
			option
				.setName('role')
				.setDescription('A role that user is going to be awarded with.')
				.setRequired(true),
		),
	async execute(interaction) {
		// Calculating  neccessary variables
		const user = interaction.options.getUser('user');
		const role = interaction.options.getRole('role');
		const member = interaction.guild.members.cache.get(interaction.user.id);
		const tmember = interaction.guild.members.cache.get(user.id);
		const roleinfo = interaction.guild.roles.cache.get(role.id);
		const canLog = logsChannelID != 'None';
		// Determining access level
		const isAdmin = member.permissions.has(PermissionsBitField.Flags.Administrator);
		const isModerator = member.roles.cache.first().id == serverRoleIDs.moderatorRoleID;

		const canAward = isAdmin || (isModerator && role.id != serverRoleIDs.moderatorRoleID && role.id != serverRoleIDs.bannedRoleID);
		const awardableUser = tmember.roles.cache.first().id != serverRoleIDs.clientRoleID && tmember.roles.cache.first().id != serverRoleIDs.ownerRoleID;
		const awardableRole = role.id != serverRoleIDs.ownerRoleID && role.id != serverRoleIDs.clientRoleID;
		// Checking if user is allowed to add roles
		if (!canAward) {
			return interaction.reply({
				content: 'Youre not allowed to use this command!',
				flags: MessageFlags.Ephemeral,
			});
		};

		if (!awardableUser) {
			return interaction.reply({
				content: 'You cant award this user!',
				flags: MessageFlags.Ephemeral,
			});
		};

		if (!awardableRole) {
			return interaction.reply({
				content: 'You cant award this role to a user!',
				flags: MessageFlags.Ephemeral,
			});
		}
		// Awarding
		try {
			await tmember.roles.remove(tmember.roles.cache);
			tmember.roles.add(roleinfo);
			// Notifying everyone
			interaction.reply({
				content: `Successfully awarded \`<@${user.id}>\` with ${roleinfo}!`,
				flags: MessageFlags.Ephemeral,
			});
			console.log(`Successfully awarded <@${user.id}> with ${roleinfo}!`);
			if (canLog) {
				interaction.client.channels.cache.get(logsChannelID).send({
					content: `\`<@${interaction.user.id}>\`, \`${interaction.user.tag}\` awarded \`<@${user.id}>\`, \`${user.tag}\` with ${roleinfo}!`,
					flags: [4096],
				});
			};
		}
		catch (error) {
			// Outputing the error we catched
			console.error(error);
			await interaction.reply({
				content: `There was an error while awarding \`<@${user.id}>\` with ${roleinfo}!`,
				flags: MessageFlags.Ephemeral,
			});
		};
	},
};