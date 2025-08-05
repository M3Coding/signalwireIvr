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
        console.log("Incoming call from:", call.from);//displays who is calling from the JSON information. Call object represents an active call. 
        
        
        /* await sleep(7000); */
        /* await call.playTTS({
            text: "Thank you for call Coding 4 Life Corp! Listen for the following menu options."
        });//play text to speech information */
        async function mainMenu(call) {
            const prompts = await call.promptTTS ({
            text: `<speak>Thank you for calling Coding 4 Life Corp., Please listen to the following menu options: For general information press 1, for support press 2, and to leave a voicemail press 3. </speak>`,
            digits: {
                max: 1,
                digitTimeout: 10,
                terminators:"#",
            }
        })
        console.log('PrompTTS Response:', prompts);

        const pressed = prompts._payload?.result?.params?.digits || null;
        const pressedDigit = pressed ? pressed[0] : null;
 //gets the first digit pressed by the caller.
        console.log(pressedDigit);
        switch(pressedDigit) {
            case '1':
               await call.playTTS({
                text: `<speak>Start with us today by emailing your request to coding life at g mail dot com or visiting our website at www coding 4 life corp dot com and completing our request form.

Coding 4 Life Corp is a technology-driven organization focused on creating innovative digital solutions that empower businesses and communities. We offer services in software development, IT consulting, automation, and education. Whether you're building from the ground up or improving existing systems, we are here to help with all your development needs.

Founded and led by Matthew Eady, an experienced IT professional and passionate developer, Coding 4 Life Corp is built on a commitment to excellence, integrity, and innovation. Under Matthews leadership, we aim to bridge the gap between technology and everyday life by delivering user-friendly, scalable, and impactful solutions.

At Coding 4 Life Corp, we believe in coding with purpose. Our service hours are from 8:00 AM to 9:00 PM Eastern Time. If you are reaching out outside of these hours, we will get back to you as soon as we're available. We appreciate your patience! Back to the main menu! Back to the main menu!</speak>`
               })
               await sleep(2000);
               await mainMenu(call); //return main menu
               break;
            case '2':
               await call.connectPhone({
                    to: supportNumber,
                })
               break;
               
            case '3':
                await call.playTTS({
                    text: "<speak>Please record your message after the beep and press pound or end the call!</speak>"
                })
                await call.recordAudio({
                    beep: true,
                    format: "mp3",
                    direction: "speak",
                    intialTimeout: 0,
                    endSilenceTimeout: 3,
                    terminators: "#",
                    stereo: true,
                    listen: {
                        onStarted: async (recording) => {
                            console.log("Recording Started", recording.url);
                        }
                    },
                    
                    
                
                // record user input
                
        });
                break;
            default:
                await call.playTTS({ text: 'Invalid selection. Goodbye.' });
                await call.hangup();
                break;

        }
        } //end of the prompts function
        await mainMenu(call); //calls the main menu function to start the IVR system
    }
})

console.log("Waiting for calls...");
//displays waiting for call in console when node is ran 

app.listen(3000, () => {
    console.log("Server running on port 3000.")
    
});

// real world application use needs ngrok 