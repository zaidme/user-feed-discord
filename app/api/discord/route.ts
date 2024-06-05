import { NextResponse } from 'next/server';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

export async function GET() {
  try {
    const discordClient = new Client({
      intents: ["GuildMessages", "Guilds", "MessageContent"],
    });

    await discordClient.login(process.env.DISCORD_BOT_ID);
    const channel = await discordClient.channels.fetch("1225241518105694231");
    if (channel) {
      (channel as TextChannel).send('GYM TIME');
    }

    return NextResponse.json({
      message: "WORKING & SENT",
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      ok: false,
    });
  }
}
