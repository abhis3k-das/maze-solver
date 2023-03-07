import { shuffleArray } from "./javascripts/mazeGenerationAlgorithms/common.js"

import { getStepsToCreateMaze__RecursiveDivision } from "./javascripts/mazeGenerationAlgorithms/maze_RecursiveDivision.js"
import { getStepsToCreateMaze__BFS } from "./javascripts/mazeGenerationAlgorithms/maze_BFS.js"
import { getStepsToCreateMaze__DFS } from "./javascripts/mazeGenerationAlgorithms/maze_DFS.js"
import { getStepsToCreateMaze__Kruskal } from "./javascripts/mazeGenerationAlgorithms/maze_KruskalRandomized.js"
import { getStepsToCreateMaze__Prims } from "./javascripts/mazeGenerationAlgorithms/maze_PrimsRandomized.js"

import { getSearchPathAndActualPath___aStar } from "./javascripts/mazeSearchAlgorithms/aStarAlgo.js"
import { getSearchPathAndActualPath___biDirectionalSwarm } from "./javascripts/mazeSearchAlgorithms/bidirectionalSwarmAlgo.js"
import { getSearchPathAndActualPath___Dijkstra } from "./javascripts/mazeSearchAlgorithms/dijkstraAlgo.js"
import { getSearchPathAndActualPath___Swarm } from "./javascripts/mazeSearchAlgorithms/swarmAlgo.js"
import { getSearchPathAndActualPath___BFS } from "./javascripts/mazeSearchAlgorithms/bfs.js"
import { getSearchPathAndActualPath___DFS } from "./javascripts/mazeSearchAlgorithms/dfs.js"


const createMazeButton = document.querySelector(".mazeButton");
const beginSearchButton = document.querySelector(".searchButton");
const clearBoard = document.getElementById("clearBoard");
const clearPath = document.getElementById("clearPath");
const mazebox = document.querySelector(".maze-box");

var h = mazebox.clientHeight;
var w = mazebox.clientWidth;
const rows = 21;
const cols = 51;
const height = h / rows;
const width = w / cols;
var startRow = 10;
var startCol = 10;
var endRow = 10;
var endCol = 40;
var grid = Array(rows).fill().map(() => Array(cols).fill(1));
grid[startRow][startCol] = 0
grid[endRow][endCol] = 0
var stepsToCreateMaze = [];
var stepsToSearchPath = [];
var path = [];
var cells = []
var buttons = document.querySelectorAll('button')
var stack = []
document.querySelector(".searchButton").innerHTML = "select search algo"
var b1 = document.querySelector(".searchButton").disabled
var b2 = document.querySelector(".mazeButton").disabled
var clickedOnSE = ["", "", "", ""]



for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        stack.push([i, j])
    }
}
for (let i = 0; i < rows; i++) {
    var temp = []
    for (let j = 0; j < cols; j++) {
        const div = document.createElement("div")
        div.className = "cell";
        div.id = `${i}-${j}`;
        div.style.width = `${width - 2}px`;
        div.style.height = `${height - 2}px`;
        mazebox.appendChild(div);
        temp.push(div);
    }
    cells.push(temp)
}


createMazeButton.addEventListener('click', function () {
    b1 = document.querySelector(".searchButton").disabled
    b2 = document.querySelector(".mazeButton").disabled
    switch (mazeMethod) {
        case "bfs": switchInitialMazeColor("black", getStepsToCreateMaze__BFS); break;
        case "dfs": switchInitialMazeColor("black", getStepsToCreateMaze__DFS); break;
        case "kruskal": switchInitialMazeColor("black", getStepsToCreateMaze__Kruskal); break;
        case "prims": switchInitialMazeColor("black", getStepsToCreateMaze__Prims); break;
        case "recursive": switchInitialMazeColor("", getStepsToCreateMaze__RecursiveDivision); break;
        default: console.log("choose a maze Method"); break;
    }

})

clearPath.addEventListener("click", clearPathfunc)

beginSearchButton.addEventListener('click', function () {
    grid = regenerateGrid()
    b1 = document.querySelector(".searchButton").disabled
    b2 = document.querySelector(".mazeButton").disabled
    switch (searchMethod) {
        case "astar": searchPath(getSearchPathAndActualPath___aStar); break;
        case "swarm": searchPath(getSearchPathAndActualPath___Swarm); break;
        case "bidirectionalswarm": searchPath(getSearchPathAndActualPath___biDirectionalSwarm); break;
        case "dijkstra": searchPath(getSearchPathAndActualPath___Dijkstra); break;
        case "bfs": searchPath(getSearchPathAndActualPath___BFS); break;
        case "dfs": searchPath(getSearchPathAndActualPath___DFS); break;
        default: console.log("Choose a Search Method"); break;
    }
})

for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
        var box = cells[i][j]
        box.addEventListener("dblclick", () => {
            if (((i === startRow && j === startCol) || (i === endRow && j === endCol)) === false) {
                console.log(grid[i])
                grid[i][j] = grid[i][j] === 1 ? 0 : 1
                console.log(i, j)
                console.log(grid[i])
                cells[i][j].style.backgroundColor = grid[i][j] ? "black" : ""
                for (let i = 1; i < rows - 1; i++) {
                    for (let j = 1; j < cols - 1; j++) {
                        var curr = cells[i][j]
                        curr.addEventListener("mouseenter", turnCell);
                        curr.addEventListener("click", removeAll)
                    }
                }
            } else {
                clickedOnSE[0] = cells[i][j].style.backgroundColor
                var temp = cells[i][j].getAttribute("id").split()
                clickedOnSE[1] = cells[i][j]
                clickedOnSE[2] = ""
                clickedOnSE[3] = 0
                cells[i][j].addEventListener("click", removeAll)
                for (let i = 1; i < rows - 1; i++) {
                    for (let j = 1; j < cols - 1; j++) {
                        var curr = cells[i][j]
                        curr.addEventListener("mouseenter", turnCell2);
                        curr.addEventListener("click", removeAll)
                    }
                }
            }

        });
        function turnCell2() {
            var myColor = this.style.backgroundColor
            var val = this.getAttribute("id").split("-")
            var cuVal = grid[parseInt(val[0])][parseInt(val[1])]
            grid[parseInt(val[0])][parseInt(val[1])] = clickedOnSE[3]
            this.style.backgroundColor = clickedOnSE[0];
            clickedOnSE[1].style.backgroundColor = clickedOnSE[2]
            clickedOnSE[2] = myColor;
            clickedOnSE[1] = this;
            clickedOnSE[3] = cuVal
            if (clickedOnSE[0] === "green") {
                startRow = parseInt(val[0])
                startCol = parseInt(val[1])
            }
            else {
                endRow = parseInt(val[0])
                endCol = parseInt(val[1])
            }
        }
        function turnCell() {
            var temp = this.getAttribute("id").split("-")
            var r = parseInt(temp[0])
            var c = parseInt(temp[1])
            if (r === startRow && c === startCol) { return }
            if (r === endRow && c === endCol) { return }
            this.style.backgroundColor = this.style.backgroundColor === "black" ? "" : "black";
            var [gridRow, gridCol] = this.getAttribute("id").split("-")
            grid[parseInt(gridRow)][parseInt(gridCol)] = grid[parseInt(gridRow)][parseInt(gridCol)] === 1 ? 0 : 1
        }
        function removeAll() {
            if (startRow === endRow && startCol === endCol) {
                var nR = startRow - 1 > 0 ? startRow - 1 : 2
                var nC = startCol - 1 > 0 ? startCol - 1 : 2
                var clr = cells[startRow][startCol].style.backgroundColor;
                cells[nR][nC].style.backgroundColor = clr === "green" ? "blue" : "green"
                if (clr === "green") {
                    endRow = nR
                    endCol = nC
                }
                else {
                    startRow = nR
                    startCol = nC
                }

            }
            for (let i = 1; i < rows - 1; i++) {
                for (let j = 1; j < cols - 1; j++) {
                    var rbox = cells[i][j]
                    rbox.removeEventListener("mouseenter", turnCell);
                    rbox.removeEventListener("click", removeAll);
                    rbox.removeEventListener("mouseenter", turnCell2);
                }
            }
            grid = regenerateGrid()
        }

    }
}


function f2(setSearchAfterClearBoard = undefined) {
    document.querySelector(".searchButton").disabled = setSearchAfterClearBoard === undefined ? b1 : true;
    document.querySelector(".mazeButton").disabled = b2
}
function f1(f2, setSearchAfterClearBoard) {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            var temp = f2(setSearchAfterClearBoard)
            resolve();
        }, time)
    })
    return promise;
}
function disableButton(turnTo) {
    buttons.forEach((button) => {
        button.disabled = turnTo
    })
}
function setColor(forMaze, [r, c], color) {

    if (r === startRow && c === startCol) {
        cells[r][c].style.backgroundColor = "green";
    }
    else if (r === endRow && c === endCol) {
        cells[r][c].style.backgroundColor = "blue";
    }
    else {
        cells[r][c].style.backgroundColor = forMaze && cells[r][c].style.backgroundColor === "black" ? "black" : color;
    }
    grid[startRow][startCol] = 0
    grid[endRow][endCol] = 0

}
function runLater(callback, timeInMs, forMaze, cell, color) {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            var temp = callback(forMaze, cell, color);
            resolve();
        }, timeInMs)
    })
    return promise;
}
function switchInitialMazeColor(color, mazeFunction = undefined) {
    var nt = 0
    grid = Array(rows).fill().map(() => Array(cols).fill(1));
    var funcAddOn = runLater(disableButton, time, true);
    funcAddOn = funcAddOn.then(runLater(setColor, nt += 0, false, [0, 0], color));

    stack = shuffleArray(stack)
    stack.forEach((each) => {
        funcAddOn = funcAddOn.then(runLater(setColor, nt += 0, false, each, color))
    })

    if (mazeFunction !== undefined) {
        funcAddOn.then(function () {
            var promise = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    var temp = createMaze(mazeFunction, "black" === color ? "" : "black");
                    resolve();
                }, nt += 2)
            })
            return promise;
        });
    }
    else {
        funcAddOn.then(runLater(disableButton, time, false)).then(f1(f2, true));
    }
}



clearBoard.addEventListener("click", () => {
    b1 = true;
    stepsToCreateMaze = []
    stepsToSearchPath = []
    path = []
    searchMethod = ""
    startRow = 10
    startCol = 10
    endRow = 10
    endCol = 40
    document.getElementById("table-search").innerHTML = "None";
    grid = Array(rows).fill().map(() => Array(cols).fill(1));

    document.querySelector(".searchButton").disabled = true
    document.querySelector(".searchButton").innerHTML = "select search algo"
    switchInitialMazeColor("black");


    grid[startRow][startCol] = 0
    grid[endRow][endCol] = 0
})
function clearPathfunc() {
    var funcAddOn = runLater(setColor, 0, false, stepsToSearchPath[0], "")
    while (stepsToSearchPath.length > 0) {
        var temp = stepsToSearchPath.shift()
        if (cells[temp[0]][temp[1]].style.backgroundColor !== "black")
            funcAddOn = funcAddOn.then(runLater(setColor, 0, false, temp, ""));
    }
}




function regenerateGrid() {
    var temp = []
    for (let i = 0; i < rows; i++) {
        var tmp = []
        for (let j = 0; j < cols; j++) {
            var clr = cells[i][j].style.backgroundColor
            var val = clr === "black" ? 1 : 0
            tmp.push(val)
            if (clr === "green") {
                startRow = i
                startCol = j
            }
            else if (clr === "blue") {
                endRow = i
                endCol = j
            }
        }
        temp.push(tmp)
    }
    return temp;
}
// create a Maze
function createMaze(mazeFunction, color) {
    var temp = mazeFunction(rows, cols)
    grid = temp[1]
    stepsToCreateMaze = temp[0]
    var funcAddOn = runLater(disableButton, time, true);
    funcAddOn = funcAddOn.then(runLater(setColor, time += mt, false, [startRow, startCol], "black" === color ? "" : "black"))
    funcAddOn = funcAddOn.then(runLater(setColor, time += mt, false, [endRow, endCol], "black" === color ? "" : "black"));
    startRow = 1
    startCol = 1
    endRow = rows - 2
    endCol = cols - 2
    for (let i = 0; i < stepsToCreateMaze.length; i++) {
        funcAddOn = funcAddOn.then(runLater(setColor, time += mt, false, stepsToCreateMaze[i], color));
    }
    funcAddOn = funcAddOn.then(runLater(setColor, time += mt, false, [startRow, startCol], "green"));
    funcAddOn = funcAddOn.then(runLater(setColor, time += mt, false, [endRow, endCol], "blue"));
    funcAddOn.then(runLater(disableButton, time += mt, false)).then(f1(f2));
    time = 0
    stepsToCreateMaze = []
    stepsToSearchPath = []
    path = []
}
//search a Path
function searchPath(searchFunction) {
    if (stepsToSearchPath.length !== 0) { clearPathfunc() }
    stepsToSearchPath = []
    path = []
    grid = regenerateGrid()
    var temp = searchFunction(rows, cols, grid, startRow, startCol, endRow, endCol);
    stepsToSearchPath = temp[0]
    path = temp[1]
    if (stepsToSearchPath.length === 0) { return; }
    var funcAddOn = runLater(disableButton, time, true);
    funcAddOn = funcAddOn.then(runLater(setColor, time, true, stepsToSearchPath[0], "#BAD7E9"));
    for (let i = 1; i < stepsToSearchPath.length; i++) {
        funcAddOn = funcAddOn.then(runLater(setColor, time += st, true, stepsToSearchPath[i], "#BAD7E9"));
    }
    for (let i = 0; i < path.length; i++) {
        funcAddOn = funcAddOn.then(runLater(setColor, time += st, true, path[i], "#8EC3B0"));//#00B8A9
    }
    funcAddOn.then(runLater(disableButton, time, false)).then(f1(f2));
    time = 0
}

