const gameBoard = (() => {
  const initMarker = ['', '', '', '', '', '', '', '', ''];
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
  let stepCount = 0;
  const getStepCount = () => stepCount;
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
  if ((game.getStepCount() < 10) && (event.target.className == "gameboard")) {
      let position = event.target.id;
      game.recordGame();
      if (game.getStepCount() % 2) {
          event.target.innerHTML = 'x';
          event.target.classList.add('clicked');
          player1.addStep(position);
          if (game.checkGame(player1)) {
              setTimeout(function () {
                //   alert("Player x won the game!");
                Swal.fire(
                    'Player "X" won!!'
                  )
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      } else {
          event.target.innerHTML = 'o';
          event.target.classList.add('clicked');
          player2.addStep(position);
          if (game.checkGame(player2)) {
              setTimeout(function () {
                //   alert("Player o won the game!");
                Swal.fire(
                    'Player "O" won!!'
                  )
                  gameBoard.initBoard();
                  player1.resetPlayer();
                  player2.resetPlayer();
                  game.resetGame();
              }, 500);
          }
      }
      if (player1.getPlayerStep().length + player2.getPlayerStep().length == 9) {
          setTimeout(function () {
            //   alert("Tie!");
            Swal.fire(
                'It is a Tie!!'
              )
              gameBoard.initBoard();
              player1.resetPlayer();
              player2.resetPlayer();
              game.resetGame();
          }, 500);
      }
  }
});
