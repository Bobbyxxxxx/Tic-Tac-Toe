const cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.querySelector('.winning-message')
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartButton");

let shapeTurn;
const circle = 'circle';
const x = 'x';
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame()

restartBtn.addEventListener("click", startGame);

function startGame() {

    cells.forEach((cell) => {
        cell.classList.remove(x);
        cell.classList.remove(circle);
        cell.removeEventListener("click", handle)
        winningMessageElement.classList.remove('show');

        cell.addEventListener("click", handle, {once: true})
    })
}



function handle(e){
    const currentCell = e.currentTarget;
    const currentShape = shapeTurn ? circle : x
    // currentCell.classList.add('x');
    placeMark(currentShape, currentCell);

    

    // check for win or draw
    //////////////////////////
    if(checkWin(currentShape)){
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else{
        swap();
    }

}


function placeMark(currentShape, currentCell){
    currentCell.classList.add(currentShape)
}

function swap(){
    shapeTurn = !shapeTurn;
}

function checkWin(currentShape) {
   return winningCombo.some(combination => {
       return combination.every(index => {
          return  cells[index].classList.contains(currentShape)
        })
    })
}

function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(circle)
    })
}

function endGame(draw){
if(draw){
    winningMessageTextElement.innerText = 'Draw!';
} else{
    winningMessageTextElement.innerText = `${shapeTurn ? "O's" : "X's"} Wins!`
}
winningMessageElement.classList.add('show');
}

        