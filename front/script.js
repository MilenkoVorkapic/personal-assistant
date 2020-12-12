import { initSpeechRecognition } from "./speech_recognition.js";
import { showSayHello, writeDiagnosticMessage } from "./interaction.js";
import { COMMANDS, wakeUpCommand, dispatchCommand } from "./commands.js";

const recognition = initSpeechRecognition(COMMANDS);

let wakeUp = false;

showSayHello();

window.addEventListener("load", function (event) {
  recognition.start();
});

recognition.onresult = function (event) {
  const data = event.results[0][0].transcript;
  writeDiagnosticMessage(
    `Result received: ${data}. Confidence: ${event.results[0][0].confidence}`
  );
  const dataArray = data.split(" ");
  const firstWordCommand = dataArray[0].toLowerCase();
  let success = false;
  if (wakeUp === false) {
    success = wakeUpCommand(firstWordCommand, wakeUp);
  } else {
    const restOfCommand = dataArray.slice(1).join("_");
    success = dispatchCommand(firstWordCommand, restOfCommand, wakeUp);
  }

  if (success) {
    wakeUp = !wakeUp;
  }
};
