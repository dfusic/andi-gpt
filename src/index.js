import "dotenv/config";
import { Client, IntentsBitField, SlashCommandBuilder } from "discord.js";
import { songs } from "./assets/songs.js";
import { images } from "./assets/images.js";

// commands

import {
  severCommand,
  slikaCommand,
  donacijaCommand,
  tiktokCommand,
  pesmaCommand,
} from "./commands/index.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (x) => {
  console.log("working");
  client.application.commands.create(donacijaCommand);
  client.application.commands.create(pesmaCommand);
  client.application.commands.create(slikaCommand);
  client.application.commands.create(tiktokCommand);
  client.application.commands.create(severCommand);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "tiktok":
      interaction.reply(
        "ZAPRATI ME NA TIKTOKU https://www.tiktok.com/@andi3768"
      );
      break;
    case "donacija":
      const donoQuantity = interaction.options.get("ruze");
      interaction.reply(
        `JOOOJ AA KAJ SI SE KROSIIL ${
          interaction.member.nickname ||
          interaction.user.globalName ||
          interaction.user.username
        }. FALA TI BRAT MOI NA ${donoQuantity.value} RUŽII!!`
      );
      break;
    case "pesma":
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      interaction.reply(
        `JOOOOJ BRAT MOJ LEPIII EL SI MORTI ČUL OVU PESMU ${randomSong}?! MOJ DONATOR VUKI MI JU JE POSLAL!`
      );
      break;
    case "slika":
      const randomImage = images[Math.floor(Math.random() * images.length)];
      interaction.reply(randomImage);
      break;
    case "sever":
      interaction.reply(`MOJ BRAT SEVER NAJAČI https://imgur.com/BqAUgS0`);
      break;
  }
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

client.login(process.env.DISCORD_TOKEN);
