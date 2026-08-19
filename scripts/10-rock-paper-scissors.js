  let score = loadScore();

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else {
      result = 'You lose';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result').textContent = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"><img src="images/${computerMove}-emoji.png" alt="${computerMove}" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').textContent = 'Score reset!';
  document.querySelector('.js-moves').textContent = 'Choose a move to play again.';
}

function loadScore() {
  try {
    const savedScore = JSON.parse(localStorage.getItem('score'));
    if (savedScore && typeof savedScore === 'object') {
      return {
        wins: Number(savedScore.wins) || 0,
        losses: Number(savedScore.losses) || 0,
        ties: Number(savedScore.ties) || 0
      };
    }
  } catch (error) {
    console.warn('Could not load score from localStorage.', error);
  }

  return { wins: 0, losses: 0, ties: 0 };
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}