import { NextResponse } from 'next/server';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

export async function POST(request: Request) {
  try {
    const data = await request.json();  // Get the form data from the request body
    console.log('Received data:', data);

    const discordClient = new Client({
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
      ],
    });

    discordClient.login("MTIyNTIwOTYzMDc3MTM4MDI0NA.GJuujY.Y9zNoXlg1hLk5Afj7wZzkPQTPwJ37JMYOVYyXg");
    const channel = discordClient.channels.fetch("1225241518105694231");

    if (channel) {
      const message = `Form submission: ${JSON.stringify(data, null, 2)}`;
     
      await (channel as TextChannel).send(message);
    }

    return NextResponse.json({
      message: "Notification sent successfully",
      ok: true,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      message: (error as Error).message,
      ok: false,
    });
  }
}
