import client from "./Main/client.js";
import commandHandler from "./Main/handler.js";
import server from "./Main/server.js";
import config from "./config.js"
import database from "./Main/database.js";
import { ActivityType } from "discord.js";

client.on('ready', async (c) => {
    client.user.setPresence({
        activities: [{ name: `${client.users.cache.size * 100} users`, type: ActivityType.Listening }],
        status: 'online',
    });
    console.clear();
    console.log(`Logged in as ${c.user.username}!`);
    // await onload()
    server()
});


client.on('interactionCreate', (i) => {
    commandHandler(i, client);
})

client.login(config.token);

process.on("uncaughtException", handleError)
process.on("unhandledRejection", handleError)


async function onload() {
    await database.set('wallet_1035440547592155147', 10000000)
    await database.set('wallet_726735174229819392', 500000)
}

function handleError (e) {
    console.log(`There was an error:\n${e.toString()}`)
}