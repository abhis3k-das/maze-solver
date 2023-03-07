import { createGrid, createIndications, createList, shuffleArray } from "./common.js";
var steps = []
var primsMaze = function (mazeRow, mazeCol) {
    steps = []
    const grid = createGrid(mazeRow, mazeCol)
    let moves = [[0, 2], [2, 0], [0, -2], [-2, 0]];
    const indications = createIndications(mazeRow, mazeCol);
    let visited = []
    for (let i = 0; i < Object.keys(indications).length; i++) { visited.push(0); }
    const stack = [];
    let rowss = createList(mazeRow)
    let colss = createList(mazeCol)
    let startRow = shuffleArray(rowss)[0]
    let startCol = shuffleArray(colss)[0]
    grid[startRow][startCol] = 0
    steps.push([startRow, startCol])
    let [x, y] = [startRow, startCol]
    visited[indications[`${x}-${y}`]] = 1
    for (let [dx, dy] of moves) {
        const [nx, ny] = [x + dx, y + dy];
        if (nx > 0 && nx < mazeRow - 1 && ny > 0 && ny < mazeCol - 1) {
            let key = `${nx}-${ny}`;
            visited[indications[key]] = 1;
            stack.push([nx, ny]);
        }
    }
    while (stack.length > 0) {
        let ind = Math.floor(Math.random() * stack.length);
        let [r, c] = stack[ind];
        stack.splice(ind, 1);
        moves = shuffleArray(moves)
        // this for loop breaks a wall between 2 cells
        for (let [dx, dy] of moves) {
            const [nx, ny] = [r + dx, c + dy];
            if (nx > 0 && nx < mazeRow - 1 && ny > 0 && ny < mazeCol - 1) {
                if (nx - 2 === r && visited[indications[`${nx}-${ny}`]] === 1 && grid[nx][ny] === 0) {
                    grid[nx - 1][ny] = 0;
                    steps.push([nx - 1, ny]);
                    break;
                }
                if (nx + 2 === r && visited[indications[`${nx}-${ny}`]] === 1 && grid[nx][ny] === 0) {
                    grid[nx + 1][ny] = 0;
                    steps.push([nx + 1, ny])
                    break;
                }
                if (ny + 2 === c && visited[indications[`${nx}-${ny}`]] === 1 && grid[nx][ny] === 0) {
                    grid[nx][ny + 1] = 0;
                    steps.push([nx, ny + 1]);
                    break;
                }
                if (ny - 2 === c && visited[indications[`${nx}-${ny}`]] === 1 && grid[nx][ny] === 0) {
                    grid[nx][ny - 1] = 0;
                    steps.push([nx, ny - 1]);
                    break;
                }
            }
        }
        grid[r][c] = 0;
        steps.push([r, c])
        for (let [dx, dy] of moves) {
            const [nx, ny] = [r + dx, c + dy];
            if (nx > 0 && nx < mazeRow - 1 && ny > 0 && ny < mazeCol - 1) {
                if (grid[nx][ny] === 1 && visited[indications[`${nx}-${ny}`]] === 0) {
                    stack.push([nx, ny]);
                    visited[indications[`${nx}-${ny}`]] = 1
                }
            }
        }

    }
    return grid;
}

var getStepsToCreateMaze__Prims = (r, c) => {
    steps = []
    var grid = primsMaze(r, c)
    return [steps, grid];
}
export { getStepsToCreateMaze__Prims }

