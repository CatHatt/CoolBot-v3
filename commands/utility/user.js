const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		console.log(typeof interaction)
		await interaction.reply(`This command was run by ${interaction.member.nickname}, who joined on ${interaction.member.joinedAt}.`);
	},
};