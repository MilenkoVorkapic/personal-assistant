var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var commands = ["pizza", "youtube"];
var grammar =
  "#JSGF V1.0; grammar commands; public <command> = " +
  commands.join(" | ") +
  " ;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector(".output");
var hints = document.querySelector(".hints");

var commandsHTML = "";
commands.forEach(function (v) {
  commandsHTML += "<span> " + v + " </span>";
});
hints.innerHTML = "Say a command. Try " + commandsHTML + ".";

window.addEventListener("load", function (event) {
  recognition.start();
  console.log("Ready to receive a command.");
});

recognition.onresult = function (event) {
  var data = event.results[0][0].transcript;
  diagnostic.textContent =
    "Result received: " +
    data +
    "." +
    " Confidence: " +
    event.results[0][0].confidence;
  const dataArray = data.split(" ");
  if (dataArray[0].toLowerCase() === "youtube") {
    fetch("http://localhost:3000/youtube?text=" + dataArray.slice(1).join("_"));
  }
};

recognition.onend = function () {
  recognition.start();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that command.";
};

recognition.onerror = function (event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};
