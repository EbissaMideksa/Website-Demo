
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

/*
if(score === null){
  score = {
    win: 0,
    lose: 0,
    tie: 0
  }
}
*/

updateDisplay();

function pickComputerMove() {
  let computerMove;
  const randomNumber = Math.random();

  if (randomNumber <= 1 / 3 && randomNumber > 0) {
    computerMove = 'Rock';
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = 'Scissors';
  } else if (randomNumber > 2 / 3) {
    computerMove = 'Paper';
  }

  return computerMove;
}

function playGame(playerMove) {
  let result = '';
  let computerMove = pickComputerMove();

  if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'Won';
    } else if (computerMove === 'Scissors') {
      result = 'Lose';
    } else if (computerMove === 'Paper') {
      result = 'Tie';
    }
  } else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'Lose';
    } else if (computerMove === 'Scissors') {
      result = 'Tie';
    } else if (computerMove === 'Paper') {
      result = 'Won';
    }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    } else if (computerMove === 'Scissors') {
      result = 'Won';
    } else if (computerMove === 'Paper') {
      result = 'Lose';
    }
  }

  if (result === 'Won') {
    score.win++;
  } else if (result === 'Lose') {
    score.lose++;
  } else if (result === 'Tie') {
    score.tie++;
  }

  document.querySelector('.display-result').innerHTML = result;

  localStorage.setItem('score', JSON.stringify(score));
  updateDisplay();

  document.querySelector('.your-select').innerHTML = `
    You <img class="in-image-sizing" src="upload/images/${playerMove}.png"> -
    <img class="in-image-sizing" src="upload/images/${computerMove}.png"> Computer
  `;
}

function updateDisplay() {
  document.querySelector('.number-of-wins').innerHTML = 
    `Wins: ${score.win} Losses: ${score.lose} Ties: ${score.tie}`;
}


function resetResult() {
  // Reset the score
  score.lose = 0;
  score.win = 0;
  score.tie = 0;
  localStorage.removeItem('score');

  // Stop autoplay if running
  if (isAutoplaying) {
    clearInterval(intervalId);
    isAutoplaying = false;

    // (Optional) Reset button text
    const button = document.querySelector('.autoplay');
    if (button) button.textContent = 'AutoPlay';
  }

  // Update UI
  document.querySelector('.your-select').innerHTML = `You 0 - 0 Computer`;
  updateDisplay();
}

let isAutoplaying = false;
let intervalId;

function autoPlay() {
  const button = document.querySelector('.autoplay');

  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
    if (button) button.textContent = 'Stop AutoPlay';
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
    if (button) button.textContent = 'AutoPlay';
  }
}

function resetResult() {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem('score');

  if (isAutoplaying) {
    clearInterval(intervalId);
    isAutoplaying = false;

    const button = document.querySelector('.autoplay');
    if (button) button.textContent = 'AutoPlay';
  }

  document.querySelector('.your-select').innerHTML = `You 0 - 0 Computer`;
  updateDisplay();
}




