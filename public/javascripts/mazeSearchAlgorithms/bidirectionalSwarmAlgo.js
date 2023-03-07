var path = []
var searchPath = []
var bidirectionalSwarm = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    let openSetStart = []
    let openSetEnd = []
    let closeSet = []
    let directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let start;
    let end;
    let state = false;
    let grid = Array(mazeRow).fill().map(() => Array(mazeCol).fill(0))
    function Data(i, j) {
        this.R = i;
        this.C = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = undefined;
    }
    function heuristic(a, b) {
        return Math.abs(a.R - b.R) + Math.abs(a.C - b.C)

    }
    for (let i = 0; i < mazeRow; i++) {
        for (let j = 0; j < mazeCol; j++) {
            grid[i][j] = new Data(i, j);
        }
    }
    start = grid[startRow][startCol]
    end = grid[endRow][endCol]

    openSetStart.push(start);
    openSetEnd.push(end);

    searchPath.push([startRow, startCol]);
    searchPath.push([endRow, endCol]);

    while (openSetStart.length > 0 && openSetEnd.length > 0) {
        if (state) { break; }

        var startLn = openSetStart.length;
        var endLn = openSetEnd.length;

        for (let i = 0, j = 0; i < startLn && j < endLn; i++, j++) {
            var topStart = openSetStart.shift();
            var topEnd = openSetEnd.shift();
            closeSet.push(topStart);
            closeSet.push(topEnd);


            var func = (openSet, top, otherSet) => {
                directions.forEach(([dx, dy]) => {
                    var newR = top.R + dx;
                    var newC = top.C + dy;
                    if (newR >= 0 && newC >= 0 && newR < mazeRow && newC < mazeCol && maze[newR][newC] === 0) {
                        var neighbor = grid[newR][newC]
                        if (!closeSet.includes(neighbor)) {
                            var tempG = top.g + 1;
                            if (openSet.includes(neighbor)) {
                                if (tempG < neighbor.g) {
                                    neighbor.g = tempG;
                                }
                            } else {
                                neighbor.g = tempG;
                                openSet.push(neighbor);
                                if (otherSet.includes(neighbor)) {
                                    state = true;
                                    var getPath = (curr) => {
                                        while (curr.parent) {
                                            path.push([curr.R, curr.C]);
                                            curr = curr.parent;
                                        }
                                        path.push([curr.R, curr.C])
                                    }
                                    getPath(top)
                                    path = path.reverse();
                                    getPath(neighbor)
                                }
                                searchPath.push([neighbor.R, neighbor.C])
                            }
                            neighbor.h = heuristic(neighbor, end)
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.parent = top;
                        }

                    }
                })
                return openSet;
            }
            openSetStart = func(openSetStart, topStart, openSetEnd);
            if (state) { break; }
            openSetEnd = func(openSetEnd, topEnd, openSetStart);
        }
    }
}
var getSearchPathAndActualPath___biDirectionalSwarm = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    bidirectionalSwarm(mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol)
    return [searchPath, path.reverse()];
}
export { getSearchPathAndActualPath___biDirectionalSwarm }