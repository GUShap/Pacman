'use strict'

// var ghostHTML = `<div class="ghost" background-color: ${getRandomColor()}"></div>`;
const GHOST = 'ghost'
var gGhosts = []
var gRemovedGhosts = []
var gIntervalGhosts;
var gGhostColors = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: getRandomInt(1,8),
            j: getRandomInt(1,8)
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }
    gGhostColors.push(ghost.color)
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = ghost
}

function getGhostHTML(ghost) {
    var txt;
    txt = `<div class="ghost" style = " background-color: ${ghost.color}"></div>`
    // txt = `<span style = "color: ${ghost.color}">${GHOST}</span>`
    return txt
}
function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === CHERRY) return;

        if (nextCell === PACMAN) {
            gameOver(false);
            return;
        }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom

    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}



function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i].location;
        if (currGhost.i === location.i && currGhost.j === location.j) {
            var ghost = gGhosts.splice(i, 1)[0]
            if(ghost.currCellContent === FOOD) foodCount--
            gRemovedGhosts.push(ghost);

        }
    }
}

function addRemovedGhost() {
    gGhosts.push(gRemovedGhosts.shift())
    changeGhostColor()

}

function changeGhostColor() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (gPacman.isSuper) {
            ghost.color = 'blue';
        }
        else ghost.color = gGhostColors[i]
        gGhostColors.slice(i, 0)
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}