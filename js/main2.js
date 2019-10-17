const cards = document.querySelectorAll('.memory-card');
// declarnig flipping att
let hasFlippedCard = false;
let lockBoard = false;
// declarnig two cards
let firstCard, secondCard;

// function to flip cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  // if statement of game logic
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // second card matching
  secondCard = this;
  checkForMatch();
}
// checking for a match
function checkForMatch() {
  // using data attribute that is set in the HTML for each card
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
// hide card
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
// unflip if two card are not matching
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// using shuffle so each time a player want to play,
// the place of cards changes
(function shuffle() {
  cards.forEach(card => {
    //using math floor.. 12 stands for the 12 cards
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  
})();


// calling the main function
cards.forEach(card => card.addEventListener('click', flipCard));