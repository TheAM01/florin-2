async function commands (interaction, client) {
    
    if (interaction.type === 3) {

        if (interaction.customId === "balance") {
            interaction.options = {
                getUser () {
                    return null;
                }
            }
            const balance = await import("../Commands/balance.js");
            return await balance.default.execute(interaction);
        }

        if (interaction.customId.startsWith("bet")) {
            interaction.options = {
                getInteger () {
                    return parseInt(interaction.customId.slice(3));
                }
            }
            const bet = await import("../Commands/bet.js");
            return await bet.default.execute(interaction);
        }
    }


    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);


    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }


}

export default commands