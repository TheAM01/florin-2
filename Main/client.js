import fs from "node:fs";
import {Client, Collection, GatewayIntentBits} from "discord.js";


const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers
        ]
    }
);

const clientStatic = client;

client.commands = new Collection();
const commandsPath = './Commands'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = `.${commandsPath}/${file}`;
    const command = await import(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.default.data.name, command.default);
}

export default client
export {clientStatic};