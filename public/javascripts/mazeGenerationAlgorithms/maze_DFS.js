import { createGrid, shuffleArray, createList } from './common.js'

var steps = []
var dfsMaze = (mazeRow, mazeCol) => {
    steps = [];
    let grid = createGrid(mazeRow, mazeCol)
    let rowss = createList(mazeRow)
    let colss = createList(mazeCol)
    let startRow = shuffleArray(rowss)[0]
    let startCol = shuffleArray(colss)[0]
    function carvePath(r, c) {
        var shuffledDirections = shuffleArray(["U", "R", "D", "L"]);
        for (let i = 0; i < 4; i++) {
            switch (shuffledDirections[i]) {
                case "U":
                    if (r - 2 > 0 && grid[r - 2][c] !== 0) {
                        grid[r][c] = 0;
                        grid[r - 1][c] = 0
                        grid[r - 2][c] = 0
                        steps.push([r, c], [r - 1, c], [r - 2, c])
                        carvePath(r - 2, c);
                    }
                    break;
                case "R":
                    if (c + 2 < mazeCol && grid[r][c + 2] !== 0) {
                        grid[r][c] = 0;
                        grid[r][c + 1] = 0;
                        grid[r][c + 2] = 0;
                        steps.push([r, c], [r, c + 1], [r, c + 2]);
                        carvePath(r, c + 2);
                    }
                    break;
                case "D":
                    if (r + 2 < mazeRow && grid[r + 2][c] !== 0) {
                        grid[r][c] = 0;
                        grid[r + 1][c] = 0;
                        grid[r + 2][c] = 0;
                        steps.push([r, c], [r + 1, c], [r + 2, c]);
                        carvePath(r + 2, c);
                    }
                    break;
                case "L":
                    if (c - 2 > 0 && grid[r][c - 2] !== 0) {
                        grid[r][c] = 0;
                        grid[r][c - 1] = 0;
                        grid[r][c - 2] = 0;
                        steps.push([r, c], [r, c - 1], [r, c - 2]);
                        carvePath(r, c - 2);
                    }
                    break;
            }
        }
    }
    carvePath(startRow, startCol)
    return grid;
}
var getStepsToCreateMaze__DFS = (r, c) => {
    steps = []
    var grid = dfsMaze(r, c)
    return [steps, grid];
}
export { getStepsToCreateMaze__DFS };