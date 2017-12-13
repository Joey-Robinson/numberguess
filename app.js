let min = 1,
    max = 100,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} & ${max}`, 'red');
  }
  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you won!`);
  } else {
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
    }
  }
});

gameOver = (won, msg) => {
  let finalColor;
  won === true ? finalColor = 'green' : finalColor = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = finalColor;
  message.style.color = finalColor;
  setMessage(msg);
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

