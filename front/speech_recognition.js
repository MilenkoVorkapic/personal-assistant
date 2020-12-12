import { writeDiagnosticMessage } from "./interaction.js";

export function initSpeechRecognition(commands) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

  const grammar =
    "#JSGF V1.0; grammar commands; public <command> = " +
    commands.join(" | ") +
    " ;";

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onend = function () {
    recognition.start();
  };

  recognition.onnomatch = function (event) {
    writeDiagnosticMessage("I didn't recognise that command.");
  };

  recognition.onerror = function (event) {
    writeDiagnosticMessage("Error occurred in recognition: " + event.error);
  };

  return recognition;
}
