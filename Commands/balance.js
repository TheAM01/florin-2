import {SlashCommandBuilder} from "discord.js";
import db from "../Main/database.js"

export default {

    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance'),

    async execute(interaction) {

        await interaction.deferReply();
        
        let userWallet = await db.get(`wallet_${interaction.user.id}`);

        if (!userWallet) {

            userWallet = 0;
            await db.set(`wallet_${interaction.user.id}`, userWallet)

        }

        return interaction.editReply(`${interaction.user.username}, you have ${userWallet}<:florin_coin:1102216846830215229> in your wallet!`);

    },

}