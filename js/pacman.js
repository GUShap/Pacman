'use strict'

var pacmanHTML='<div class="pacman"></div>';
const PACMAN = pacmanHTML;
var superFoodCount = 4;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    else if (nextCell === FOOD) {
        foodCount--;
        updateScore(1);
        if (!foodCount) {
            gameOver(true)
            foodCount = 56
        }
    }
    else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        foodCount--
        eatSuperFood();
        updateScore(1)

    }

    else if (nextCell === CHERRY) {
        updateScore(10)
        renderCell(gPacman.location, EMPTY)

    }

    if (gPacman.isSuper && nextCell === GHOST) {
        removeGhost(nextLocation)
        setTimeout(addRemovedGhost, 2000)
        renderCell(gPacman.location, pacmanHTML)
    }

    else if (!gPacman.isSuper && nextCell === GHOST) {
        gameOver(false);
        renderCell(gPacman.location, EMPTY)
        foodCount = 60
        return;
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, pacmanHTML);
    console.log(foodCount);
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            pacmanHTML = '<div class="pacman" style = "transform: rotate(-90deg)"></div>'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            pacmanHTML = '<div class="pacman" style = "transform: rotate(90deg)"></div>'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            pacmanHTML = '<div class="pacman" style = "transform: rotate(180deg)"></div>'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            pacmanHTML = '<div class="pacman"></div>'
            break;
        default:
            return null;
    }
    return nextLocation;
}


// super
function eatSuperFood() {
    gPacman.isSuper = true
    changeGhostColor();
    setTimeout(() => {
        gPacman.isSuper = false
        changeGhostColor();
    }, 3000);
    superFoodCount--;
}