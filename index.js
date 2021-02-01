//readline library link
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

gamePick();
//Variable Declarations
let maxRange;
let minRange;
let numGuess;
let compPick = "";

//Game Start
//Start will have you pick the number
//PlayerStart will have the computer pick the number

async function gamePick() {
  let startTree = await ask ("Let's play a game where either you or I will pick a number and the opposite person will try and guess it. If you would like to guess the number I pick, type 'Me'. If you would like me to guess your number, type 'You'.\n")
  if (startTree === "Me") {
    start()
  } else if (startTree === "You") {
    playerStart()
  } else {
    console.log("Please type either 'Me' or 'You\n")
    gamePick()
  }
}


async function start() {
  console.log(
    "Let's play a game where you (Big BAUSE) make up a number and I (BeepBoopMachine) try to guess it. \n"
  );
  setInitRange();
}

//Set initial range with stops to make sure input is a number
async function setInitRange() {
  maxRange = await ask("So what's the highest number I can guess?\n");
  while (isNaN(maxRange)) {
    maxRange = await ask("Let's try this again. Please enter a number. \n");
  }
  maxRange = Number(maxRange);

  minRange = await ask("And what is the lowest number I can guess?\n");
  while (isNaN(minRange)) {
    minRange = await ask("Let's try this again. Please enter a number.\n");
  }
  minRange = Number(minRange);

  rangeCheck();
}
//Initial range check - make sure minRange < maxRange//
async function rangeCheck() {
  if (minRange > maxRange) {
    console.log("It looks like your range makes no sense. Lets try it again\n");
    setInitRange();
  } else if (minRange === maxRange) {
    console.log("Well it seems as if " + minRange + " is your number\n");
    guessRightLoop();
  } else if (minRange < maxRange) {
    console.log(
      `Okay cool, the range will be between ` +
        minRange +
        ` and ` +
        maxRange +
        `. Let us begin.`
    );
    compPickLoop();
  }
}


//Random number picker within range (inclusive) //
function pickNum(min, max) {
  let range = max - min + 1;
  let randInt = min + Math.floor(Math.random() * range);
  return randInt;
}

//Smart number picker - mid point within range.
function smartNum(min, max) {
  let range = max - min + 1;
  let midInt = Math.floor(range/2);
  return midInt;
}

//switch pickNum to smartNum to toggle number picker function below //
//Is numGuess your number?//
async function compPickLoop() {
  numGuess = pickNum(minRange, maxRange);
  //numGuess = smartNum(minRange, maxRange);

  compPick = await ask("Is " + numGuess + " your number?\n");
  if (
    compPick === "n" ||
    compPick === "No" ||
    compPick === "NO" ||
    compPick === "no"
  ) {

    guessWrongLoop();
  } else if (
    compPick === "y" ||
    compPick === "Yes" ||
    compPick === "YES" ||
    compPick === "yes"
  ) {
    console.log("I got it you little shit.");
    guessRightLoop();
  } else {
    console.log(
      "Hey dingus, please write either 'Yes' or 'No'. I'm a computer, make it easy for me.\n"
    );
    compPickLoop();
  }
}

//Wrong guess loop
async function guessWrongLoop() {
  let secondPick = await ask("Should I guess higher or lower?\n");
  compPick = "";
  if (
    secondPick === "higher" ||
    secondPick === "Higher" ||
    secondPick === "h" ||
    secondPick === "H"
  ) {
    minRange = numGuess;
    


    compPickLoop();
    //loopCheckRange();
  } else if (
    secondPick === "lower" ||
    secondPick === "Lower" ||
    secondPick === "l" ||
    secondPick === "L"
  ) {
    maxRange = numGuess;
    compPickLoop();
    //loopCheckRange;
  } else {
    console.log(
      "This means nothing to me. Please use either 'higher' or 'lower', 'h', or 'l'.\n"
    );
    guessWrongLoop();
  }
}


//Right Guess Loop - start again or exit//
async function guessRightLoop() {

  let startAgain = await ask("Would you like to play again?\n");
  if (
    startAgain === "y" ||
    startAgain === "Yes" ||
    startAgain === "YES" ||
    startAgain === "yes"
  ) {
    gamePick();
  } else if (
    startAgain === "n" ||
    startAgain === "No" ||
    startAgain === "NO" ||
    startAgain === "no"
  ) {
    console.log("Okay byeeee!");
    process.exit();
  }
}



//Work in Progress - not quite working how I want it too//
//Loop check range//
function loopCheckRange () {
  if (minRange < maxRange) {
    compPickLoop();
        //console.log check block start//
        console.log("minRange is " + minRange);
        console.log("maxRange is " + maxRange);
        //console.log check block end//
    
  } if (minRange === maxRange){
    console.log("We've come to the end of the road here. Both your ranges seem to be " + maxRange +". I have no choice but to declare myself winner. Suck it.")
    guessRightLoop();
  } else if (minRange > maxRange) {
    console.log("It looks like your range makes no sense. Lets try it again\n");
    guessWrongLoop();
}
}



//2nd part of the game - You try and guess the computer's number
let playerMinRange;
let playerMaxRange;
let compNum;
let compNumInt;

async function playerStart() {
  console.log(
    "I'm going to guess a number. Let's figure out how hard you want to make it"
  );
  playerMaxRange = await ask("What's the highest number I can set?\n");
  playerMinRange = await ask("What's the lowest number I can set?\n");
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
      console.log("Your guess is too high.");
    } else if (playerGuess < compNumInt) {
      console.log("Your guess is too low.");
    } else if (playerGuess == compNumInt) {
      console.log("You guessed right! Winner winner chicken dinner BOI!");
      guessRightLoop();
    }
  }
}





//FIGURE OUT HOW TO INCORPORATE RANGE CHECK
//NOT FUNCTIONAL BELOW THIS LINE

async function playerRangeCheck() {
  if (minRange > maxRange) {
    console.log("It looks like your range makes no sense. Lets try it again\n");
    setInitRange();
  } else if (minRange === maxRange) {
    console.log("Well it seems as if " + minRange + " is your number\n");
    guessRightLoop();
  } else if (minRange < maxRange) {
    console.log(
      `Okay cool, the range will be between ` +
        minRange +
        ` and ` +
        maxRange +
        `. Let us begin.`
    );
    playerPick();
  }
}
