"use server";

export const sendDiscordMessage = async (data: {
  name: string;
  editor: string;
}) => {
  try {
    const { name, editor } = data;

    const message = `Name: ${name}\nMessage: ${editor}`;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL is not defined");
    }
    // A fetch request to send data through the discord
    // webhook, and display it as a message in your
    // discord channel
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });
  } catch (err: any) {
    // Just in case :)
    console.log(err.message);
  }
};
