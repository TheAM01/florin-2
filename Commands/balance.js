import {SlashCommandBuilder} from "discord.js";
import db from "../Main/database.js"

export default {

    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance')
        .addUserOption(o => 
            o.setName("member")
            .setDescription("The member whose balance you want to check. Self by default.")
            ),

    async execute(interaction) {

        await interaction.deferReply();

        let user = interaction.options.getUser("member")
        if (!user) user = interaction.user;
        
        let userWallet = await db.get(`wallet_${user.id}`);

        if (!userWallet) {
            userWallet = 0;
            await db.set(`wallet_${user.id}`, userWallet)
        }

        return interaction.editReply(`${user.username} has ${userWallet}<:florin_coin:1102216846830215229> in their wallet!`);

    },

} 