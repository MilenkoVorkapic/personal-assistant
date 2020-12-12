export function greetUser() {
  const sounds = [
    "sounds/encore_du_travail.wav",
    "sounds/pardon.wav",
    "sounds/qu_y_a_t_t_il.wav",
  ];
  playSound(sounds[Math.floor(Math.random() * sounds.length)]);
}

export function playOk() {
  playSound("sounds/oui_messire.wav");
}

export function playSound(path) {
  if (typeof window.Audio === "function") {
    var audioElem = new Audio();
    audioElem.src = path;
    audioElem.play();
  }
}
