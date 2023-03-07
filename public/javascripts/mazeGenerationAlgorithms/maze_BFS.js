import { shuffleArray, createGrid, createIndications, createList } from "./common.js";
let steps = []
var bfs = (mazeRow, mazeCol) => {
    let grid = createGrid(mazeRow, mazeCol);
    let indications = createIndications(mazeRow, mazeCol);
    let visited = Array(Object.keys(indications).length).fill(0);
    let rowss = createList(mazeRow)
    let colss = createList(mazeCol)
    let startRow = shuffleArray(rowss)[0]
    let startCol = shuffleArray(colss)[0]
    let queue = []
    queue.push([startRow, startCol])
    grid[startRow][startCol] = 0;
    steps.push([startRow, startCol]);
    visited[indications[`${startRow}-${startCol}`]] = 1
    while (queue.length > 0) {
        queue = shuffleArray(queue)
        let [r, c] = queue.shift();
        let directions = shuffleArray([[2, 0, 1, 0], [0, 2, 0, 1], [-2, 0, -1, 0], [0, -2, 0, -1]])
        while (directions.length > 0) {
            //wtoR & wtoC these are walls between cells 
            let [dx, dy, wtoR, wtoC] = directions.shift();
            let key = `${r + dx}-${c + dy}`;
            if (key in indications && visited[indications[key]] === 0) {
                visited[indications[key]] = 1;
                steps.push([r + wtoR, c + wtoC], [r + dx, c + dy])
                grid[r + dx][c + dy] = 0;
                grid[r + wtoR][c + wtoC] = 0;
                queue.push([r + dx, c + dy]);
            }
        }
    }
    return grid;
}
var getStepsToCreateMaze__BFS = (r, c) => {
    steps = []
    var grid = bfs(r, c)
    return [steps, grid];
}
export { getStepsToCreateMaze__BFS }