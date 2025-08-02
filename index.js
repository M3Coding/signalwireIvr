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
});// Signalwire client account information
const voiceClient = client.voice; //sets up the voice client method
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //delays time before the automated voice begins talking. 

//Promise is used to wait for call to pickup and then begin automation. 
await voiceClient.listen({
    topics: ["ivr"],//this is the name of the project topic in signalwire
    onCallReceived: async (call) => {
        await call.answer();//wait for call to be picked up
        console.log("Incoming call from:", call.from);//displays who is calling from the JSON information.
        
        
        await sleep(7000);
        await call.playTTS({
            text: "Thank you for call Coding 4 Life Corp! Listen for the following menu options."
        });//play text to speech information
        call.hangup(); //hangs up the call
    }
});
console.log("Waiting for calls...");
//displays waiting for call in console when node is ran 

app.listen(3000, () => {
    console.log("Server running on port 3000.")
    
});

// real world application use needs ngrok 