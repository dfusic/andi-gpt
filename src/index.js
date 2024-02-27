require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.emoji.name === "andi") {
    const andiJapaEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "andijapa"
    );
    reaction.message.reply(
      `Judiii japa mi se ftaplje jebal sreču ${andiJapaEmoji}`
    );
  }
  if (reaction.emoji.name === "sever_judges") {
    const andiEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "andi"
    );
    const severEmoji = reaction.message.guild.emojis.cache.find(
      (emoji) => emoji.name === "sever_judges"
    );
    reaction.message.reply(
      `Judiii zapratite severa na tikToku brat MOI najačismo ${andiEmoji} ${severEmoji}`
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  const lowerCaseMessage = message.content.toLowerCase();

  if (lowerCaseMessage.includes("andi")) {
    const andiEmoji = message.guild.emojis.cache.find(
      (emoji) => emoji.name === "andi"
    );
    message.channel.send(`Pozdrav svima judiiii ${andiEmoji}`);
  }
});

client.login(process.env.TOKEN);
