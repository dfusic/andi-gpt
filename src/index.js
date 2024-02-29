import "dotenv/config";
import { Client, IntentsBitField, codeBlock } from "discord.js";
import { ChatGPTClient } from "discordjs-chatgpt";
import { songs } from "./assets/songs.js";
import { images } from "./assets/images.js";

import prePrompt from "./assets/gptPrePrompt.js";
// commands

import {
  severCommand,
  slikaCommand,
  donacijaCommand,
  tiktokCommand,
  pesmaCommand,
  komandeCommand,
  blagoslovCommand,
  gptCommand,
} from "./commands/index.js";

const chatgpt = new ChatGPTClient(
  "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"
);

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
  console.log("ready");
  client.application.commands.create(donacijaCommand);
  client.application.commands.create(pesmaCommand);
  client.application.commands.create(slikaCommand);
  client.application.commands.create(tiktokCommand);
  client.application.commands.create(severCommand);
  client.application.commands.create(komandeCommand);
  client.application.commands.create(blagoslovCommand);
  client.application.commands.create(gptCommand);
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
    case "komande":
      const message = codeBlock(
        "",
        "/pesma - dobiš pesmu lepu\n/slika - dobiš moju sliku\n/sever - sever brat moj najači\n/tiktok - zaprati me brat\n/donacija - donirajte judi\n/blagoslov - JEDNOJ OSOBI BUM ZAŽELEL ZDRAVLJE, VESELJE I SVEGA KAJ MU TREBA"
      );
      interaction.reply(message);
    case "blagoslov":
      async function fetchRandom() {
        const randomMember = await (
          await interaction.guild.members.fetch()
        ).random();

        interaction.reply(
          `BOG TI DAL ZDRAVLJA I SREČE, ZAČAS! <@${randomMember.user.id}>`
        );
      }

      fetchRandom();

      break;
    case "gpt":
      async function requestGpt() {
        const msg = interaction.options.getString("pitanje", true);
        await chatgpt.chatInteraction(
          interaction,
          `${prePrompt}. Pitanje: ${msg}`
        );
      }

      requestGpt();
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
