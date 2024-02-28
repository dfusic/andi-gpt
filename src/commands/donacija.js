import { SlashCommandBuilder } from "discord.js";

const donacijaCommand = new SlashCommandBuilder()
  .setName("donacija")
  .addNumberOption((option) =>
    option
      .setName("ruze")
      .setDescription("The input to echo back")
      .setRequired(true)
  )
  .setDescription("DONIRAJTE ZA STRUJU LJUUUDIII!");

export default donacijaCommand;
