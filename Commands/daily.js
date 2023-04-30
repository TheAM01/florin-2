import {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from "discord.js";
import db from "../Main/database.js"
import ms from 'pretty-ms'

export default {

    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily coins!'),

    async execute(interaction) {

        await interaction.deferReply();
        
        let userWallet = await db.get(`wallet_${interaction.user.id}`);
        let user = await db.get(`user_${interaction.user.id}`);
        let timeout = 72000000;

        const balance = new ButtonBuilder()
        .setCustomId('balance')
        .setLabel('Check balance')
        .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
        .addComponents(balance);
        
        if (!user) user = {};

        if (!user.dailyCheck) user.dailyCheck = 0;

        if (timeout - (Date.now() - user.dailyCheck) > 0) {
            const timeLeft = ms(timeout - (Date.now() - user.dailyCheck));
            return interaction.editReply({content: `You have already claimed your daily amount. Please try again in ${timeLeft}!`, components: [row]});
        }

        if (!userWallet) return interaction.editReply('You don\'t have a wallet yet. Do `/register` first.');
        
        userWallet += 2000;
        user.dailyCheck = Date.now()
        await db.set(`wallet_${interaction.user.id}`, userWallet)
        await db.set(`user_${interaction.user.id}`, user)
        return interaction.editReply({content: 'Successfully added 2000 coins to your wallet.', components: [row]});

    },

}