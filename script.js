let userScore = 0;
let compScore = 0; 

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resultArea = document.querySelector(".result-area");
const gameArea = document.querySelector(".game-area");

const userChoiceDiv = document.querySelector(".user-choice");
const compChoiceDiv = document.querySelector(".comp-choice");
const playbtn = document.querySelector('.play-btn');

const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');
const rulesModal = document.querySelector("#rules-modal");

const resetBtn = document.querySelector('#reset-btn');

const imagePaths = {
  rock: "icons/icons8-rock-64 1.png",
  paper: "icons/icons8-paper-64 1.png",
  scissors: "icons/icons8-scissor-64 1.png"
};

// accessing DOM as soon as it is loaded
document.addEventListener('DOMContentLoaded', () => {
  userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;         //checking whether userScore is present in the local storage.
  compScore = localStorage.getItem('compScore') ? parseInt(localStorage.getItem('compScore')) : 0;         //checking whether compScore is present in the local storage.

  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
})


// using javascript built-in functions to determine random choices.
const compChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  console.log(options[randomIdx]);
  return options[randomIdx];
}

// function for Draw game
const drawGame = (userChoice, computerChoice) => {
  msg.innerText = "TIED UP";
  updateIcons(userChoice, computerChoice);
    userChoiceDiv.style.border = "20px solid rgba(0, 116, 182, 1)";
    compChoiceDiv.style.border = "20px solid rgba(0, 116, 182, 1)";
    playbtn.innerText = "REPLAY";
  userChoiceDiv.style.boxShadow = "none";
  compChoiceDiv.style.boxShadow = "none";
}

// function for dynamically updating the icons.
const updateIcons = (userChoice, computerChoice) => {

  userChoiceDiv.innerHTML = "";
  compChoiceDiv.innerHTML = "";

  if (imagePaths[userChoice] && imagePaths[computerChoice]) {
    const userIcon = document.createElement('img');
    const compIcon = document.createElement('img');

    userIcon.src = imagePaths[userChoice];
    compIcon.src = imagePaths[computerChoice];

    userIcon.alt = userChoice;
    compIcon.alt = computerChoice;

    userChoiceDiv.appendChild(userIcon);
    compChoiceDiv.appendChild(compIcon);
  } else {
    console.error("Invalid choice detected. Unable to display icons.");
  }
}


// displaying and updating the scores
const showWinner = (userWin, userChoice, computerChoice) => {

  updateIcons(userChoice, computerChoice);

  if(userWin){
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerHTML = `<p>YOU WON<br/>AGAINST PC</p>`;
    compChoiceDiv.style.boxShadow = "none";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerHTML = `<p>YOU LOST<br/>AGAINST PC</p>`;
    userChoiceDiv.style.boxShadow = "none";
  }

  localStorage.setItem('userScore', userScore);
  localStorage.setItem('compScore', compScore);
}

// function to start the game
const playGame = (userChoice) => {

  console.log(userChoice);
  const computerChoice = compChoice();
  console.log(computerChoice);

  if(userChoice === computerChoice) {
      drawGame(userChoice, computerChoice);
  } else {
    let userWin = true;
    if(userChoice === "rock") {
      userWin = computerChoice === "paper" ? false : true;
    } else if(userChoice === "paper"){
      userWin = computerChoice === "scissors" ? false : true;
    } else {
      userWin = computerChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, computerChoice);
  }
}

// selecting all choices and adding event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    gameArea.style.display = "none";
    resultArea.style.display = "flex";
    playGame(userChoice);
  })
})

// custom css properties which are updated dynamically
rulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if(event.target === rulesModal){
    rulesModal.style.display = "none";
  }
});

resetBtn.addEventListener("click", () => {
  localStorage.clear();

  userScore = 0;
  compScore = 0;

  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;

  location.reload();
});

