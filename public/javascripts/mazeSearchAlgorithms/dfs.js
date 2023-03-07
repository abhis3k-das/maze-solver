var path = []
var searchPath = []
var dfs = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    var visited = Array(mazeRow).fill().map(() => Array(mazeCol).fill(0));
    function searchMaze(r, c) {
        console.log(r, c)
        if (r < 0 || r >= mazeRow || c < 0 || c >= mazeCol || visited[r][c] === 1 || maze[r][c] === 1) {
            return false;
        }
        if (r === endRow && c === endCol && maze[r][c] === 0) {
            path.push([r, c])
            return true;
        }
        if (visited[r][c] === 0) {
            searchPath.push([r, c])
        }
        visited[r][c] = 1;
        let state = false;
        for (let i = 0; i < 4; i++) {
            state = state || searchMaze(r - 1, c)
            state = state || searchMaze(r + 1, c)
            state = state || searchMaze(r, c + 1)
            state = state || searchMaze(r, c - 1)
            if (state === true) {
                path.push([r, c])
                return true
            }
        }
        return false;
    }
    searchMaze(startRow, startCol)
}
var getSearchPathAndActualPath___DFS = (mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol) => {
    path = []
    searchPath = []
    dfs(mazeRow, mazeCol, maze, startRow, startCol, endRow, endCol);
    return [searchPath, path.reverse()]
}

export { getSearchPathAndActualPath___DFS }