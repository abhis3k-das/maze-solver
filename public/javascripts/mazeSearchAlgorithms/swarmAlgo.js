var path = []
var searchPath = []
var swarm = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    let openSet = []
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

    openSet.push(start)
    searchPath.push([startRow, startCol])
    while (openSet.length > 0) {
        if (state) { break; }
        var ln = openSet.length;
        for (let i = 0; i < ln; i++) {
            var top = openSet.shift();
            closeSet.push(top);
            if (top === end) {
                var curr = top;
                while (curr.parent) {
                    path.push([curr.R, curr.C]);
                    curr = curr.parent;
                }
                path.push([curr.R, curr.C])
                state = true;
                break;
            }

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
                            searchPath.push([neighbor.R, neighbor.C])
                        }
                        neighbor.h = heuristic(neighbor, end)
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = top;
                    }

                }
            })
        }
    }
}
var getSearchPathAndActualPath___Swarm = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    swarm(mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol);
    return [searchPath, path.reverse()]
}

export { getSearchPathAndActualPath___Swarm }