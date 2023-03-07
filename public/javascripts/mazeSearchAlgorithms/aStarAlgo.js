var path;
var searchPath;
var aStarAlgo = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    let openSet = []
    let closeSet = []
    let directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let start;
    let end;
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
        var smallestPathIdx = openSet.reduce((idx, currObj, currIdx) => {
            if (currObj.f < openSet[idx].f) {
                return currIdx;
            } else {
                return idx;
            }
        }, 0)

        var smallestPathEle = openSet[smallestPathIdx]
        if (smallestPathEle === end) {
            var curr = smallestPathEle;
            while (curr.parent) {
                path.push([curr.R, curr.C]);
                curr = curr.parent;
            }
            path.push([curr.R, curr.C])
            break;
        }
        openSet.splice(smallestPathIdx, 1);
        closeSet.push(smallestPathEle);
        directions.forEach(([dx, dy]) => {
            var newR = smallestPathEle.R + dx;
            var newC = smallestPathEle.C + dy;
            if (newR >= 0 && newR < mazeRow - 1 && newC >= 0 && newC < mazeCol - 1 && maze[newR][newC] === 0) {
                var neighbor = grid[newR][newC];
                if (!closeSet.includes(neighbor)) {
                    var tempG = smallestPathEle.g + 1; // distance between smallestPath and neighbor
                    if (openSet.includes(neighbor)) {  // if neighbor is in open set that means we have a calculated distance
                        if (tempG < neighbor.g) {     // update the distance only if neighor's has a larger value
                            neighbor.g = tempG;
                        }
                    } else {                        // its not in open set that means we have not visited so update the distance and add to open set
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                        searchPath.push([neighbor.R, neighbor.C])
                    }
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = smallestPathEle;
                }
            }
        })
    }
}
var getSearchPathAndActualPath___aStar = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    aStarAlgo(mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol);
    return [searchPath, path.reverse()]
}
export { getSearchPathAndActualPath___aStar }