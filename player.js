//readline library link
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}



playerStart();

let playerMinRange;
let playerMaxRange;
let compNum;
let compNumInt;

async function playerStart() {
  console.log(
    "I'm going to guess a number. Let's figure out how hard you want to make it"
  );
  playerMinRange = await ask("What's the lowest number I can set?\n");
  playerMaxRange = await ask("What's the highest number I can set?\n");
  compNum = pickNum(playerMinRange, playerMaxRange);
  compNumInt = Number(compNum);
  console.log("Computer picks " + compNumInt);
  playerPick();
}

//Random number picker within range (inclusive) //
function pickNum(min, max) {
  let range = max - min + 1;
  let randInt = min + Math.floor(Math.random() * range);
  return randInt;
}

//Guessing Block
async function playerPick() {
  while (true) {
    let playerGuess = await ask("Guess a number.\n");
    let playerNum = Number(playerGuess);
    if (playerNum > compNumInt) {
      console.log("Guess lower");
    } else if (playerGuess < compNumInt) {
      console.log("Guess higher");
    } else if (playerGuess == compNumInt) {
      console.log("You guessed right! Winner winner chicken dinner BOI!");
      guessRightLoop();
    }
  }
}
