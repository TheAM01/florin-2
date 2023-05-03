import {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from "discord.js";
import db from "../Main/database.js"

export default {

    data: new SlashCommandBuilder()
        .setName('donate')
        .setDescription('Donate some coins to a user.')
        .addUserOption(o =>
            o.setName("donee")
            .setDescription('The person that will receieve the coins')
            .setRequired(true))
        .addIntegerOption(o => 
            o.setName("amount")
            .setDescription("The amount you want to give.")
            .setRequired(true))
        ,

    async execute(interaction) {

        await interaction.deferReply();

        const donee = interaction.options.getUser("donee");
        const amount = interaction.options.getInteger("amount");

        if (donee.bot) return await interaction.editReply("Can't donate to a bot.");
        if (amount < 0) return await interaction.editReply("Invalid amount.");

        let donorWallet = await db.get(`wallet_${interaction.user.id}`);
        let doneeWallet = await db.get(`wallet_${donee.id}`);

        console.log([doneeWallet, donorWallet]);

        if (!donorWallet) return await interaction.editReply("You don't have a wallet yet!");
        if (!doneeWallet) return await interaction.editReply(`${donee.username} doesn\'t have a wallet yet.`);

        donorWallet -= amount;
        doneeWallet += amount;

        await db.set(`wallet_${interaction.user.id}`, donorWallet);
        await db.set(`wallet_${donee.id}`, doneeWallet);

        const balance = new ButtonBuilder()
        .setCustomId('balance')
        .setLabel('Check balance')
        .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
        .addComponents(balance);
        
        await interaction.editReply({content: `Successfully donated ${amount} coins to ${donee.username}!`, components: [row]});

    },

}