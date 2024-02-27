require("dotenv").config();
const {
  Client,
  IntentsBitField,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const songs = require("../songs");
const images = require("../images");

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
  const donacijaCommand = new SlashCommandBuilder()
    .setName("donacija")
    .addNumberOption((option) =>
      option
        .setName("ruze")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .setDescription("DONIRAJTE ZA STRUJU LJUUUDIII!");

  const pesmaCommand = new SlashCommandBuilder()
    .setName("pesma")
    .setDescription("JOOOO BRAT SI ČUL OVU PESMU");

  const slikaCommand = new SlashCommandBuilder()
    .setName("slika")
    .setDescription("NALUKNI SE V MOJ OBITELJSKI FOTOALBUM");

  const tiktokCommand = new SlashCommandBuilder()
    .setName("tiktok")
    .setDescription("JUUUDI ZAPRATITE ME");

  const severCommand = new SlashCommandBuilder()
    .setName("sever")
    .setDescription("PRISJETIMO SE JUDI KAK ME SEVER IZNENADIL BRAT MOI");

  client.application.commands.create(donacijaCommand);
  client.application.commands.create(pesmaCommand);
  client.application.commands.create(slikaCommand);
  client.application.commands.create(tiktokCommand);
  client.application.commands.create(severCommand);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tiktok") {
    interaction.reply("ZAPRATI ME NA TIKTOKU https://www.tiktok.com/@andi3768");
  }

  if (interaction.commandName === "donacija") {
    const donoQuantity = interaction.options.get("ruze");
    interaction.reply(
      `JOOOJ AA KAJ SI SE KROSIIL ${
        interaction.member.nickname ||
        interaction.user.globalName ||
        interaction.user.username
      }. FALA TI BRAT MOI NA ${donoQuantity.value} RUŽII!!`
    );
  }

  if (interaction.commandName === "pesma") {
    const randomSong =
      songs.songs[Math.floor(Math.random() * songs.songs.length)];
    interaction.reply(
      `JOOOOJ BRAT MOJ LEPIII EL SI MORTI ČUL OVU PESMU ${randomSong}?! MOJ DONATOR VUKI MI JU JE POSLAL!`
    );
  }

  if (interaction.commandName === "slika") {
    const randomImage =
      images.images[Math.floor(Math.random() * images.images.length)];
    interaction.reply(randomImage);
  }

  if (interaction.commandName === "sever") {
    interaction.reply(`MOJ BRAT SEVER NAJAČI https://imgur.com/BqAUgS0`);
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
