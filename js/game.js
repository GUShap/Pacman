'use strict'
const WALL = '<div class="wall"></div>'
const FOOD = '<div class="food"></div>'
const SUPER_FOOD = '<div class="super-food"></div>'
const CHERRY = '🍒'
const EMPTY = ' ';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gIntervalCherrys;
var foodCount;
function init() {
    gGame.score = 0
    updateScore(gGame.score)
    var elBoard = document.querySelector('.board-container')
    var elModal = document.querySelector('.modal')
    elBoard.style.display = 'block'

    elModal.classList.remove('game-over', 'victory');
    // console.log('hello')
    gBoard = buildBoard()
    foodCount = countFood(gBoard);
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    console.log(foodCount);
    gIntervalCherrys = setInterval(addCherry, 15000);
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === SIZE - 2 && j === 1) ||
                (i === 1 && j === SIZE - 2) || (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD
            }

        }
    }
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(isWin) {
    var elBoard = document.querySelector('.board-container')
    var elModal = document.querySelector('.modal')
    var elText = elModal.querySelector('span')

    elBoard.style.display = 'none'

    if (!isWin) {
        elModal.classList.add('game-over')
        elText.innerText = 'Game Over'
    }
    else {
        elModal.classList.add('victory')
        elText.innerText = 'Congratulations, You Won!!'
    }

    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherrys)
}
function findEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var emptyCell = {
                location: {
                    i: i,
                    j: j
                }
            }
            if (board[i][j] === EMPTY) emptyCells.push(emptyCell)
        }
    }
    return emptyCells
}

function addCherry() {
    var emptyCells = findEmptyCells(gBoard)
    if (!emptyCells.length) return;

    var idx = getRandomInt(0, emptyCells.length - 1);
    var cell = emptyCells[idx];

    // model
    gBoard[cell.location.i][cell.location.j] = CHERRY
    //DOM
    renderCell(cell.location, CHERRY)
}

function countFood(board) {
    var foodCount = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === FOOD || board[i][j]===SUPER_FOOD) foodCount++
        }
    }
    return foodCount
}