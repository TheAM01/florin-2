import {SlashCommandBuilder} from "discord.js";
import promises from "node:timers/promises";
const wait = promises.setTimeout

export default {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction, client) {
        interaction.reply({ content: "🏓 Pong! 🏓 <a:loading:1102125897970106398>", fetchReply: true }).then(async m => {

            await interaction.editReply({content: `🏓 Pong! 🏓\nBot Latency: \`${m.createdTimestamp - interaction.createdTimestamp}ms\`\nWebsocket Latency: \`${client.ws.ping}ms\``});

        })
        
        // const emoji = client.emojis.cache.find(e => e.name === "slot_running");
        // console.log(emoji)

    },

}