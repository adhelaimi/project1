const gameBoard = (() => {
    // declaring an array of 9 empty holders
  const initMarker = ['', '', '', '', '', '', '', '', ''];
    // setting the board from HTML
  const initBoard = () => document.querySelectorAll('.gameboard').forEach(elt => {
      elt.innerText = '';
      elt.classList.remove('clicked');
  });
  return {
      initBoard
  };
})();

const game = (() => {
  const winComb = [
  ['1', '2', '3'], 
  ['4', '5', '6'], 
  ['7', '8', '9'], 
  ['1', '4', '7'], 
  ['2', '5', '8'], 
  ['3', '6', '9'], 
  ['1', '5', '9'], 
  ['3', '5', '7']];
  //Setting a counter
  let stepCount = 0;
  const getStepCount = () => stepCount;
  //Recording the game by position
  const recordGame = (position) => stepCount++;
  const checkGame = (player) => {
      return winComb.some(comb => comb.every(elt => player.getPlayerStep().includes(elt)));
  }
  const resetGame = () => stepCount = 0;
  return {
      recordGame,
      getStepCount,
      checkGame,
      resetGame
  };
})();
//steps tracking
const Player = (marker) => {
  let playerStep = [];
  const getPlayerStep = () => playerStep;
  const addStep = (position) => playerStep.push(position);
  const resetPlayer = () => playerStep = [];
  return {
      addStep,
      getPlayerStep,
      resetPlayer,
      marker
  };
};
// declaring two players "player vs player"
const player1 = Player('x');
const player2 = Player('o');

document.addEventListener('click', function (event) {
  if (event.target.id == "button") {
      document.querySelectorAll('.gameboard').forEach(elt => elt.classList.remove('disable'));
      gameBoard.initBoard();
      player1.resetPlayer();
      player2.resetPlayer();
      game.resetGame();
  }
  // if statement for 9 place holders
  // player one must playing "X" is a rule of the game instructions
  if ((game.getStepCount() < 10) && (event.target.className == "gameboard")) {
      let position = event.target.id;
      game.recordGame();
      if (game.getStepCount() % 2) {
          event.target.innerHTML = 'x';
          event.target.classList.add('clicked');
          player1.addStep(position);
          // if player one got a match of three
          // print the winning alert
          if (game.checkGame(player1)) {
              setTimeout(function () {
                //   using sweer alert library for alerts
                Swal.fire(
                    'Player 1 "X" won!!'
                  )
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      } else {
          // else to declare that player 2 is going to play "O"
          event.target.innerHTML = 'o';
          event.target.classList.add('clicked');
          player2.addStep(position);
          // if player one got a match of three
          // print the winning alert
          if (game.checkGame(player2)) {
              setTimeout(function () {
                //   using sweer alert library for alerts
                Swal.fire(
                    'Player 2 "O" won!!'
                  )
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      }
      // Setting an if for the tie/draw if no one wins
      if (player1.getPlayerStep().length + player2.getPlayerStep().length == 9) {
          setTimeout(function () {
            //   using sweer alert library for alerts
            Swal.fire(
                'It is a Tie!!'
              )
              // calling all functions
              gameBoard.initBoard();
              player1.resetPlayer();
              player2.resetPlayer();
              game.resetGame();

          }, 500);
      }
  }
});
