const { REST, Routes } = require('discord.js')
const fs = require('fs')
const path = require('path')
const { token, clientId, guildId } = require('./config.json')
const separator = () => console.log(require('./appearance.json').separator)

const commands = []
const commandsInfo = []

const commandsFolderPath = path.join(__dirname, 'commands')
const commandFolders = fs
    .readdirSync(commandsFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

separator()

commandFolders.forEach((directory) =>
    console.log(`Found directory ${directory}`)
)

separator()

for (const folder of commandFolders) {
    const commandsPath = path.join(commandsFolderPath, folder)
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON())
            commandsInfo.push({
                name: command.data.name,
                path: `.\\${path.relative('./commands', filePath)}`,
            })
            console.log(`Found ${command.data.name}`)
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            )
        }
    }
}

fs.writeFileSync(
    './commands/commandReference.json',
    JSON.stringify(commandsInfo, null, 4)
)

separator()

const rest = new REST().setToken(token)

;(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        )

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        )
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error)
    }
})()
