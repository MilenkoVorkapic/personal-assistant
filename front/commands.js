import { playOk } from "./sounds.js";
import { showCommands, showSayHello } from "./interaction.js";
import { greetUser } from "./sounds.js";

export const YOUTUBE = "youtube";
export const HELLO = "hello";

export const COMMANDS = [YOUTUBE, HELLO];
export const COMMANDSWITHOUTHELLO = COMMANDS.filter((c) => c !== HELLO);

export function wakeUpCommand(firstWordCommand) {
  if (firstWordCommand === HELLO) {
    greetUser();
    showCommands(COMMANDSWITHOUTHELLO);
    return true;
  }

  return false;
}

export function dispatchCommand(firstWordCommand, restOfCommand) {
  if (firstWordCommand === YOUTUBE) {
    executeCommand(() =>
      fetch("http://localhost:3000/youtube?text=" + restOfCommand)
    );
    return true;
  }

  return false;
}

function executeCommand(command) {
  playOk();
  command();
  showSayHello();
}
