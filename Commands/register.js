import {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from "discord.js";
import db from "../Main/database.js"
import ms from 'pretty-ms'

export default {

    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Create your wallet to start playing!'),

    async execute(interaction) {

        await interaction.deferReply();
        
        let userWallet = await db.get(`wallet_${interaction.user.id}`);
        
        if (!!userWallet) return interaction.editReply('You already have a wallet.')

        userWallet = 10000;

        await db.set(`wallet_${interaction.user.id}`, userWallet);

        return interaction.editReply(`Successfully registered! Enjoy your starting bonus of 10000 coins!`)

    },

}