import { shuffleArray } from "./common.js";
var steps = []
var recursive_division = (mazeRow, mazeCol) => {

    let grid = Array(mazeRow).fill().map(() => Array(mazeCol).fill(0));
    let visited = Array(mazeRow).fill().map(() => Array(mazeCol).fill(0));
    for (let i = 0; i < mazeRow; i++) {
        grid[i][0] = 1;
        grid[i][mazeCol - 1] = 1;
        steps.push([i, 0])
        steps.push([i, mazeCol - 1])
    }
    for (let i = 0; i < mazeCol; i++) {
        grid[0][i] = 1;
        grid[mazeRow - 1][i] = 1;
        steps.push([0, i])
        steps.push([mazeRow - 1, i])
    }
    function range(start, stop, step) {
        return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    }
    function whichWay(h, w) {
        if (h > w)
            return "HORIZONTAL";
        if (h < w)
            return "VERTICAL";
        return Math.random() > 0.5 ? "HORIZONTAL" : "VERTICAL"
    }
    function recursiveDivision(sr, sc, er, ec, visited) {
        let height = er - sr;
        let width = ec - sc;
        if (height <= 2 || width <= 2) {
            return;
        }
        let rowRange, colRange, gapRowRange, gapColRange;
        rowRange = shuffleArray(range(sr + 2, er - 2, 1));
        colRange = shuffleArray(range(sc + 2, ec - 2, 1));
        gapRowRange = shuffleArray(range(sr + 1, er - 1, 1));
        gapColRange = shuffleArray(range(sc + 1, ec - 1, 1));

        let horizontal = whichWay(height, width) === "HORIZONTAL";

        if (horizontal) {
            if (rowRange.length === 0) {
                return;
            }
            // we need to cut horizontally
            // so we will select row randomly

            let randomRow = rowRange[0]; // this row will be treated as wall
            let gapCell = gapColRange[0]; // this col will be treated as path

            // iterating over cols as row is constant
            for (let c = sc + 1; c <= ec - 1; c++) {
                if (c === gapCell) {
                    grid[randomRow][gapCell] = 0;
                }
                else if (visited[randomRow][c] !== 1) {
                    grid[randomRow][c] = 1;
                    steps.push([randomRow, c]);
                }
            }
            visited[randomRow][gapCell] = 1
            if (randomRow - 1 > 0 && randomRow - 1 < mazeRow - 1) { visited[randomRow - 1][gapCell] = 1 }
            if (randomRow + 1 > 0 && randomRow + 1 < mazeRow - 1) { visited[randomRow + 1][gapCell] = 1 }
            recursiveDivision(sr, sc, randomRow, ec, visited);
            recursiveDivision(randomRow, sc, er, ec, visited);
        }
        else {
            if (colRange.length === 0) {
                return;
            }
            // we need to cut vertically
            // so we will select a col randomly

            let randomCol = colRange[0];
            let gapCell = gapRowRange[0];
            // iterating over rows as col is constant
            for (let r = sr + 1; r <= er - 1; r++) {
                if (r === gapCell) {
                    grid[gapCell][randomCol] = 0;
                }
                else if (visited[r][randomCol] !== 1) {
                    grid[r][randomCol] = 1;
                    steps.push([r, randomCol]);
                }
            }
            visited[gapCell][randomCol] = 1;
            if (randomCol - 1 > 0 && randomCol - 1 < mazeCol - 1) { visited[gapCell][randomCol - 1] = 1; }
            if (randomCol + 1 > 0 && randomCol + 1 < mazeCol - 1) { visited[gapCell][randomCol + 1] = 1; }
            recursiveDivision(sr, sc, er, randomCol, visited);
            recursiveDivision(sr, randomCol, er, ec, visited);
        }

    }
    recursiveDivision(0, 0, mazeRow - 1, mazeCol - 1, visited)
    return grid
}

var getStepsToCreateMaze__RecursiveDivision = (r, c) => {
    steps = []
    var grid = recursive_division(r, c)
    return [steps, grid];
}
export { getStepsToCreateMaze__RecursiveDivision }