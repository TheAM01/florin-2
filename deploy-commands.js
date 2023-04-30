import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import fs from 'node:fs'
import config from './config.js'
import path from "node:path"

const commands = [];
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = await import(`./Commands/${file}`);
	// console.log(await JSON.stringify(command.default.data))
	commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(
		Routes.applicationGuildCommands(config.clientId, config.guildId),
		{ body: commands },
	);

	console.log('Successfully reloaded application (/) commands.');
} catch (error) {
	console.error(error);
}