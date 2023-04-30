import {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from "discord.js";
import db from "../Main/database.js"
import ms from 'pretty-ms'

export default {

    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('Beg for some money as a last resort!'),

    async execute(interaction) {

        await interaction.deferReply();
        
        let bheek = Math.floor(Math.random() * 1001);
	
        let gotBeg = [
            `lol ${bheek}`,
            `You explored a sewer and found ${bheek} coins.`,
            `You begged for some coins from Harry Styles and he gave you ${bheek} coins.`,
            `You asked a random stranger for some money and he gave you ${bheek} coins.`,
            `You looked so broke that a beggar gave you ${bheek} coins.`,
            `You asked for some charity money and you got ${bheek} coins.`,
            `You found ${bheek} coins lying around somewhere.`,
            `You looked so pathetic that MEE6 gave you ${bheek} coins. Say thank you to MEE6.`,
            `You checked your pockets and found ${bheek} coins that you lost last summer.`,
            `You found ${bheek} coins in a dustbin.`,
            `Joe gave you ${bheek} coins.\n\"For America!\", he said.`,
            `You found ${bheek} coins covered in Uranium.`,
            `You saw something shiny on Uranus. You went there and it was ${bheek} coins. Btw, you're stuck there now. Forever.`,
            `Mr. Beats gave you ${bheek} coins.`,
            `Elon Musk just gave you a check of ${bheek} coins! That's cool!`, 
            `Rick Astley donated you ${bheek} coins and Rick rolled you in exchange.`,
            `A stray cat gave you ${bheek} coins.`,
            `lol ${bheek}`,
        ];

        let wallet = await db.get(`wallet_${interaction.user.id}`);
        wallet += bheek;

        await db.set(`wallet_${interaction.user.id}`, wallet);
        
        const reply = gotBeg[Math.floor(Math.random()*gotBeg.length)];
        return interaction.editReply(reply)

    },

}