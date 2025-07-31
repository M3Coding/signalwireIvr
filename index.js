import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {SignalWire} from "@signalwire/realtime-api";
import 'dotenv/config';


const app = express();
const client = await SignalWire({
    workspace: process.env.SIGNALWIRE_SPACE,
    project: process.env.SIGNALWIRE_PROJECT,
    token: process.env.SIGNALWIRE_TOKEN,
    context: process.env.CONTEXT,
    supportNumber: process.env.SUPPORT_NUMBER,
    timeZone: process.env.TZ,
});
const voiceClient = client.voice;

await voiceClient.listen({
    topics: ["ivr"],
    onCallReceived: async (call) => {
        console.log("Incoming call from:", call.from);
        
        await call.answer();
        await call.playTTS({
            text: "Thank you for call Coding 4 Life Corp! Listen for the following menu options."
        });
    }
});
console.log("Waiting for calls...");


app.listen(3000, () => {
    console.log("Server running on port 3000.")
    
});