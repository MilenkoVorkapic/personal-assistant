var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var commands = ["youtube"];
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

let wakeUp = false;

showSayHello(hints);

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
  if (wakeUp === false) {
    if (dataArray[0].toLowerCase() === "hello") {
      wakeUp = true;
      greetUser();
      showCommands(hints);
    }
  } else {
    if (dataArray[0].toLowerCase() === "youtube") {
      playOk();
      fetch(
        "http://localhost:3000/youtube?text=" + dataArray.slice(1).join("_")
      );
      wakeUp = false;
      showSayHello(hints);
    }
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

function greetUser() {
  const sounds = [
    "sounds/encore_du_travail.wav",
    "sounds/pardon.wav",
    "sounds/qu_y_a_t_t_il.wav",
  ];
  playSound(sounds[Math.floor(Math.random() * sounds.length)]);
}

function playOk() {
  playSound("sounds/oui_messire.wav");
}

function playSound(path) {
  if (typeof window.Audio === "function") {
    var audioElem = new Audio();
    audioElem.src = path;
    audioElem.play();
  }
}

function showCommands(container) {
  var commandsHTML = "";

  commands.forEach(function (v) {
    commandsHTML += "<span> " + v + " </span>";
  });

  container.innerHTML = "Say a command. Try " + commandsHTML + ".";
}

function showSayHello(container) {
  container.innerHTML = "Say Hello!";
}
