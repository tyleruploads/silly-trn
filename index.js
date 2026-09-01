require("dotenv").config();

const { App } = require("@slack/bolt");

const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/silly-trn-help", async ({ ack, respond }) => {
    await ack(); // Acknowledges the command to slack
    await respond({
        text:
`Silly TRN is feeling very silly today!

Available Commands:
/silly-trn-help  - The command you just ran
/silly-trn-ping  - Check bot latency
/silly-trn-time  - Everyone wants to see the time, right?
/silly-trn-quote - Get an awesome quote from Silly TRN!`
    });
});

app.command("/silly-trn-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Why in the world are you doing latency testing on a random kids project?\nI'm not going to say pong, but you know I'm just going to tell you how long it took me to acknowledge this to slack, not how long it takes for a message to get from you to slack?\n${latency}` });
});

app.command("/silly-trn-time", async ({ ack, respond }) => {
    await ack();
    
    const time = new Date().toString();
    await respond({ text: `The time is NOT:\n${time}\n(I think)` });
});

app.command("/silly-trn-quote", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://zenquotes.io/api/random");
        await respond({ text: `"${response.data[0].q}"\nBy: Not Me` });
    } catch (err) {
        await respond({ text: `Silly TRN Will NOT give you a quote! He is too tired.\n${err}` });
    }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

