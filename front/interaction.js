function getMessageContainer() {
  return document.querySelector(".hints");
}

export function showCommands(commands) {
  const messageContainer = getMessageContainer();

  const commandsHTML = commands
    .map((command) => `<span>${command}</span>`)
    .join("");

  messageContainer.innerHTML = "Say a command. Try " + commandsHTML + ".";
}

export function showSayHello() {
  const messageContainer = getMessageContainer();
  messageContainer.innerHTML = "Say Hello!";
}

export function writeDiagnosticMessage(message) {
  const diagnostic = document.querySelector(".output");
  diagnostic.textContent = message;
}
