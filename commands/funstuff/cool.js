const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cool')
        .setDescription('Replies cool, kinda cool or very cool.'),
    async execute(interaction) {
        const random = Math.floor(Math.random() * 3);
        switch (random) {
            case 0:
                await interaction.reply("You're not cool today, sorry.");
                break;
            case 1:
                await interaction.reply("You're kinda cool today.");
                break;
            case 2:
                await interaction.reply("You're very cool today.");
                break;
        }
    },
};
