var path = []
var searchPath = []
var dijkstraSearch = (mazeRow, mazeCol, grid, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    function createRequire(grid) {
        var [distance, parent] = [[], []]
        var c = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === 0) {
                    distance[`${i}-${j}`] = 999999;
                    parent[`${i}-${j}`] = `0-0`;
                    c++;
                }
            }
        }
        return [distance, parent];
    }
    var [distance, parent] = createRequire(grid)
    var state = false;
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    var priorityQueue = []
    priorityQueue.push([startRow, startCol, 0])
    distance[`${startRow}-${startCol}`] = 0
    parent[`${startRow}-${startCol}`] = `${startRow}-${startCol}`
    while (priorityQueue.length !== 0) {
        priorityQueue.sort((a, b) => a[2] - b[2]);
        var [r, c, dist] = priorityQueue.shift();
        directions.forEach(([dx, dy]) => {
            var newR = r + dx;
            var newC = c + dy;
            var newDist = dist + 1;
            if (newR >= 0 && newR < mazeRow && newC >= 0 && newC < mazeCol && grid[newR][newC] === 0) {
                if (newDist < distance[`${newR}-${newC}`]) {
                    distance[`${newR}-${newC}`] = newDist;
                    parent[`${newR}-${newC}`] = `${r}-${c}`;
                    priorityQueue.push([newR, newC, newDist]);
                    searchPath.push([newR, newC])
                    if (newR === endRow && newC === endCol) {
                        state = true;
                    }
                }
            }
        });
        if (state) { break; }
    }

    var key = `${endRow}-${endCol}`;
    while (parent[`${key}`] !== key) {
        var [r, c] = key.split('-')
        if (r === "0" && c === "0") { }
        else {
            path.push([parseInt(r), parseInt(c)])
        }
        key = parent[`${key}`]
    }
    path.push([startRow, startCol])
}
var getSearchPathAndActualPath___Dijkstra = (mazeRow, mazeCol, grid, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    dijkstraSearch(mazeRow, mazeCol, grid, startRow, startCol, endRow, endCol);
    return [searchPath, path.reverse()];
}
export { getSearchPathAndActualPath___Dijkstra }