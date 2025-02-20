/*-------------------------------- Design Credit: Canva --------------------------------*/

// https://www.canva.com/templates/EAEngMW6rFY-purple-colorful-3d-illustrations-tic-tac-toe-fun-presentation/

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  };
  
  const render = () => {
    updateBoard();
    updateMessage();
  };
  
  const updateBoard = () => {
    board.forEach((value, index) => {
      squareEls[index].textContent = value;
    });
  };
  
  const updateMessage = () => {
    if (!winner && !tie) {
      messageEl.textContent = `Player ${turn}'s turn!`;
    } else if (!winner && tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `Player ${turn} wins! 🎉`;
    }
  };
  
  const handleClick = (event) => {
    const squareIndex = +event.target.id; 
  
    if (board[squareIndex] !== '' || winner === true) {
      return;
    }
  
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  };
  
  const placePiece = (index) => {
    board[index] = turn;
  };
  
  const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
      let combo = winningCombos[i];

      let a = board[combo[0]];
      let b = board[combo[1]];
      let c = board[combo[2]];
  
      if (a !== '' && a === b && a === c) {
        winner = true; 
      }
    }
  };
  
  const checkForTie = () => {
    let emptySquares = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        emptySquares++;
      }
    }
    if (emptySquares === 0 && winner === false) {
      tie = true;
    }
  };
  
  const switchPlayerTurn = () => {
    if (winner === true) {
      return;
    }
    if (turn === 'X') {
      turn = 'O';
    } else {
      turn = 'X';
    }
  };


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => square.addEventListener('click', handleClick));
resetBtnEl.addEventListener('click', init);

init();