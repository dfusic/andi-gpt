import { SlashCommandBuilder } from "discord.js";

const gptCommand = new SlashCommandBuilder()
  .setName("gpt")
  .addStringOption((option) =>
    option
      .setName("pitanje")
      .setDescription("A KAJ TE ZANIMA")
      .setRequired(true)
  )
  .setDescription(
    "PITAJ ME KAJ OČEŠ BRATMOI? AK NE ZNAM JA ZNA MOJ BRAT SEVER!"
  );

export default gptCommand;
