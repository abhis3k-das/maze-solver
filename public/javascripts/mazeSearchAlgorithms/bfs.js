var path = []
var searchPath = []
var bfs = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    const queue = []
    const distance = {}
    var state = false;
    for (var i = 0; i < mazeRow; i++) {
        for (var j = 0; j < mazeCol; j++) {
            if (maze[i][j] === 0) {
                var key = `${i}-${j}`
                distance[`${key}`] = [99999, [i, j]];
            }
        }
    }
    queue.push([startRow, startCol])
    searchPath.push([startRow, startCol])
    distance[`${startRow}-${startCol}`] = [0, [startRow, startCol]]
    while (queue.length > 0) {
        if (state) { break; }
        var [r, c] = queue.shift();
        directions.forEach(([dx, dy]) => {
            var newR = r + dx;
            var newC = c + dy;
            if (newR >= 0 && newC >= 0 && newR < mazeRow && newC < mazeCol && maze[newR][newC] === 0) {
                if (distance[`${newR}-${newC}`][0] > distance[`${r}-${c}`][0] + 1) {
                    queue.push([newR, newC]);
                    searchPath.push([newR, newC])
                    distance[`${newR}-${newC}`] = [distance[`${r}-${c}`][0] + 1, [r, c]]
                    if (newR === endRow && newC === endCol) {
                        state = true;
                    }
                }
            }
        });
    }
    var [r1, c1] = [endRow, endCol]
    if (state) {
        while (r1 !== startRow || c1 !== startCol) {
            var key = `${r1}-${c1}`
            path.push(distance[`${key}`][1])
            r1 = distance[`${key}`][1][0]
            c1 = distance[`${key}`][1][1]
        }
        path.pop();
    }

}
var getSearchPathAndActualPath___BFS = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    bfs(mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol);
    return [searchPath, path.reverse()]
}

export { getSearchPathAndActualPath___BFS }