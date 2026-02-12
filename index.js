const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", ()=>console.log("Bot Ready"));
client.login(process.env.TOKEN);

app.use(express.static("public"));

/* ===== LOCKDOWN ===== */
app.get("/api/lockdown", async (req,res)=>{
    const guild = client.guilds.cache.get("1468970047937581108");

    guild.channels.cache.forEach(ch=>{
        ch.permissionOverwrites.edit(guild.roles.everyone,{ SendMessages:false }).catch(()=>{});
    });

    res.send("Server locked");
});

/* ===== UNLOCK ===== */
app.get("/api/unlock", async (req,res)=>{
    const guild = client.guilds.cache.get("1468970047937581108");

    guild.channels.cache.forEach(ch=>{
        ch.permissionOverwrites.edit(guild.roles.everyone,{ SendMessages:true }).catch(()=>{});
    });

    res.send("Server unlocked");
});

app.listen(3000, ()=>console.log("Panel running"));
