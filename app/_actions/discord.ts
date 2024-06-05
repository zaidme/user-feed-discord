"use server"



export const sendDiscordMessage = async (data: {name: string, email:string, editor: string}) => {
  try {
    const { name, email, editor } = data;
 
    const message = `Name: ${name}\nEmail: ${email}\nMessage: ${editor}`;
    // A fetch request to send data through the discord
    // webhook, and display it as a message in your
    // discord channel
    await fetch("https://discordapp.com/api/webhooks/1247956688112324749/nLkyGZSIfCVS_uaNKiKyFOONCK_bzoWgu5Pqdp20T2pqt6vwqBjSqJFeFBI5kEVm3zlK", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content:message,
      }),
    })
  } catch (err: any) {
    // Just in case :)
    console.log(err.message)
  }
}