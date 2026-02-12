const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/lockdown", (req,res)=>{
    res.send("Lockdown signal sent to bot");
});

app.listen(3000, ()=>{
    console.log("Nexus panel running");
});
