const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cool')
        .setDescription('Svarar om du är cool eller inte idag'),
    async execute(interaction) {
        const answers = [
            'Du är tyvärr inte cool idag...',
            'Du är ganska cool idag.',
            'Du är väldigt cool idag!'
        ];
        const random = Math.floor(Math.random() * answers.length);

        await interaction.reply(answers[random]);
    },
};
