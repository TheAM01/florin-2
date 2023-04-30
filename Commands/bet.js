import {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import db from "../Main/database.js"
import promises from "node:timers/promises";
const wait = promises.setTimeout


export default {

    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Bet your money!')
        .addIntegerOption(o => 
            o.setName('amount')
            .setDescription('The amount of cash you want to bet')
            .setRequired(true)
        ),

    async execute(interaction, client) {
        
        await interaction.reply("<a:slot_running:1102199778546303071> <a:slot_running:1102199778546303071> <a:slot_running:1102199778546303071>");

        const amount = interaction.options.getInteger('amount');
        if (amount < 0) return interaction.editReply("Enter a valid number!")

        let wallet = await db.get(`wallet_${interaction.user.id}`);

        if (!wallet) return interaction.editReply('You don\'t have a wallet yet. Do `/register` to start betting.');
        if (amount > wallet) return interaction.editReply(`You don\'t have \`${amount}\` in your wallet.`);

        wallet -= amount;

        let chance = Math.floor(Math.random() * 101);
        let row = rowBuilder();
        let win = 0, message, content;


        if (chance > 0 && chance <= 30) {
            wallet -= amount
            message = `Aw snap! You lost ${amount} coins :(\nBetter luck next time.`
            content = ":grapes: :lemon: :watermelon:"
        }
        if (chance > 30 && chance <= 50) {
            win = amount
            message = `Nothing happened... Try again.`
            content = ":lemon: :bell: :cherries:"
        }
        if (chance > 50 && chance <= 70) {
            win = amount * 2;
            wallet += win;
            message = `Congratulations! You doubled ${amount} coins and won ${win} coins!`
            content = ":gem: :grapes: :grapes:"
        }
        if (chance > 70 && chance <= 85) {
            win = amount * 3;
            wallet += win;
            message = `Congratulations! You tripled ${amount} coins and won ${win} coins!`
            content = ":cherries: :hearts: :hearts:"
        }
        if (chance > 85 && chance <= 95) {
            win = amount * 5;
            wallet += win;
            message = `Congratulations! Your ${amount} coins got multiplied 5 times! Enjoy ${win} coins.`
            content = ":hearts: :hearts: :hearts:"
        }
        if (chance > 95) {
            win = amount * 10;
            wallet += win;
            message = `🎉🎉 JACKPOT!!! 🎉🎉\nYou hit the jackpot and won 10x your amount of ${amount} coins. Enjoy your ${win} coins!`
            content = ":gem: :gem: :gem:"
        };

        const results = embed(interaction.user, message, "#03fc30", amount, win)

        await db.set(`wallet_${interaction.user.id}`, wallet);
        let emojis = content.split(" ");

        await interaction.editReply({content: `${emojis[0]} <a:slot_running:1102199778546303071> <a:slot_running:1102199778546303071>`});
        await wait(1000);
        await interaction.editReply({content: `${emojis[0]} ${emojis[1]} <a:slot_running:1102199778546303071>`});
        await wait(1000);
        await interaction.editReply({content: `${emojis[0]} ${emojis[1]} ${emojis[2]}`})


        await interaction.editReply({content: content, embeds: [results], components: [row]})
        .then(async (m) => {
            await wait(120*1000);
            m.delete()
        })


    },

}

function embed (user, msg, color, amount, win) {
    return new EmbedBuilder()
    .setTitle(`${user.username}'s betting results`)
    .setDescription(msg)
    .setColor(color)
    .addFields(
        {
            name: "Bet", value: amount.toString()
        }, {
            name: "Win", value: win.toString()
        }, {
            name: "Profit", value: (win - amount).toString()
        }
    )
    .setThumbnail(user.avatarURL())
}

function rowBuilder () {
    const bet100 = new ButtonBuilder()
        .setCustomId('bet100')
        .setLabel('Bet 100')
        .setStyle(ButtonStyle.Primary);

        const bet500 = new ButtonBuilder()
        .setCustomId('bet500')
        .setLabel('Bet 500')
        .setStyle(ButtonStyle.Primary);

        const bet1000 = new ButtonBuilder()
        .setCustomId('bet1000')
        .setLabel('Bet 1000')
        .setStyle(ButtonStyle.Danger);

        const bet5000 = new ButtonBuilder()
        .setCustomId('bet5000')
        .setLabel('Bet 5000')
        .setStyle(ButtonStyle.Danger);

        const balance = new ButtonBuilder()
        .setCustomId('balance')
        .setLabel('Check balance')
        .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
        .addComponents(bet100, bet500, bet1000, bet5000, balance);
        
        return row;
}