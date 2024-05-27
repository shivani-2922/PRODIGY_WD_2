document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const messageElement = document.getElementById("message");
  const restartButton = document.getElementById("restart");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const checkWin = () => {
      for (let condition of winningConditions) {
          const [a, b, c] = condition;
          if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
              return true;
          }
      }
      return false;
  };

  const checkDraw = () => {
      return gameBoard.every(cell => cell !== "");
  };

  const handleCellClick = (event) => {
      const cell = event.target;
      const index = cell.getAttribute("data-index");

      if (gameBoard[index] !== "" || !isGameActive) {
          return;
      }

      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin()) {
          messageElement.textContent = `${currentPlayer} wins!`;
          isGameActive = false;
      } else if (checkDraw()) {
          messageElement.textContent = "It's a draw!";
          isGameActive = false;
      } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
  };

  const restartGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach(cell => cell.textContent = "");
      currentPlayer = "X";
      isGameActive = true;
      messageElement.textContent = "";
  };

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", restartGame);
});
