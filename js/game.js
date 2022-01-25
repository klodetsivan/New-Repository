'use strict'
const WALL = '⬛'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🍕'

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

var gFoodCount = -1;

function init() {
    closeModal()
    gFoodCount = -1;
    updateScore(0)
    // console.log('Hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    creatSuperFood(gBoard)
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    openModal()
    console.log('Game Over');
    gGame.score = 0;
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
}

function openModal() {

    var elMsg = document.querySelector('.modal')
    elMsg.querySelector('span')
    if (gGame.score === gFoodCount) {
        elMsg.innerText = 'VICTORY!!!'
    } else {
        elMsg.innerText = 'GAME OVER'
    }
    elMsg.style.display = 'block';

    // Todo: show the modal and schedule its closing
}
function closeModal() {

    var elMsg = document.querySelector('.modal span')
    elMsg.style.display = 'none';
    // Todo: hide the modal
}

function creatSuperFood(board) {
    board[1][1] = SUPERFOOD;
    board[1][8] = SUPERFOOD;
    board[8][8] = SUPERFOOD;
    board[8][1] = SUPERFOOD;
    // gFoodCount -= 4;
}

function checkVictory() {
    if (gGame.score === gFoodCount) {
        gameOver()
    }
}