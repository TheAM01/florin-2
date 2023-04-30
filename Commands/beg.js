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
            `You explored a sewer and found ${bheek} <:florin_coin:1102216846830215229>.`,
            `You begged for some coins from Harry Styles and he gave you ${bheek} <:florin_coin:1102216846830215229>.`,
            `You asked a random stranger for some money and he gave you ${bheek} <:florin_coin:1102216846830215229>.`,
            `You looked so broke that a beggar gave you ${bheek} <:florin_coin:1102216846830215229>.`,
            `You asked for some charity money and you got ${bheek} <:florin_coin:1102216846830215229>.`,
            `You found ${bheek} <:florin_coin:1102216846830215229> lying around somewhere.`,
            `You looked so pathetic that MEE6 gave you ${bheek} <:florin_coin:1102216846830215229>. Say thank you to MEE6.`,
            `You checked your pockets and found ${bheek} <:florin_coin:1102216846830215229> that you lost last summer.`,
            `You found ${bheek} <:florin_coin:1102216846830215229> in a dustbin.`,
            `Joe gave you ${bheek} <:florin_coin:1102216846830215229>.\n\"For America!\", he said.`,
            `You found ${bheek} <:florin_coin:1102216846830215229> covered in Uranium.`,
            `You saw something shiny on Uranus. You went there and it was ${bheek} <:florin_coin:1102216846830215229>. Btw, you're stuck there now. Forever.`,
            `Mr. Beats gave you ${bheek} <:florin_coin:1102216846830215229>.`,
            `Elon Musk just gave you a check of ${bheek} <:florin_coin:1102216846830215229>! That's cool!`, 
            `Rick Astley donated you ${bheek} <:florin_coin:1102216846830215229> and Rick rolled you in exchange.`,
            `A stray cat gave you ${bheek} <:florin_coin:1102216846830215229>.`,
            `lol ${bheek}`,
        ];

        let wallet = await db.get(`wallet_${interaction.user.id}`);
        wallet += bheek;

        await db.set(`wallet_${interaction.user.id}`, wallet);
        
        const reply = gotBeg[Math.floor(Math.random()*gotBeg.length)];
        return interaction.editReply(reply)

    },

}