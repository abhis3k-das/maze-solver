import { createGrid, shuffleArray } from './common.js'
var steps = []
var kruskalMaze = (mazeRow, mazeCol) => {
    steps = []
    const row = mazeRow
    const col = mazeCol
    const directions = ["U", "D", "L", "R"]
    const indications = {}
    let grid = createGrid(row, col);
    let stack = [];
    let parent = [];
    let rank = [];
    let visited = []
    function createStack() {
        let c = 0;
        for (let i = 1; i <= row - 1; i += 2) {
            for (let j = 1; j <= col - 1; j += 2) {
                let temp = {};
                temp[c] = `${i}-${j}`
                indications[`${i}-${j}`] = c
                stack.push(temp);
                c++;
            }
        }
    }

    createStack();
    stack = shuffleArray(stack)

    function setParentAndRank() {
        for (let i = 0; i < Object.entries(indications).length; i++) {
            parent.push(i);
            rank.push(0);
            visited.push(0)
        }
    }
    setParentAndRank()
    function findParent(node) {
        if (parent[node] === node) {
            return node;
        }
        parent[node] = findParent(parent[node])
        return parent[node];
    }
    function union(u, v) {
        u = findParent(u)
        v = findParent(v)

        if (rank[u] < rank[v]) {
            parent[u] = v;
        }
        else if (rank[v] < rank[u]) {
            parent[v] = u;
        }
        else {
            parent[u] = v;
            rank[v]++;
        }
    }
    function kruskalAlgo(u, v) {
        if (findParent(u) === findParent(v)) {
            return false;
        }
        union(u, v);
        return true;
    }

    while (true) {
        if (parent.every(val => val === parent[0])) { break; }

        let topObj = stack[0];
        let u = parseInt(Object.keys(topObj)[0]);
        let rcPair = topObj[u].split("-");
        let r = parseInt(rcPair[0]);
        let c = parseInt(rcPair[1]);

        let state = false;
        let newc = ""
        let newr = ""
        let v = ""
        let key = ""

        let shuffledDirections = shuffleArray(directions)
        for (let i = 0; i <= shuffledDirections.length; i++) {
            if (i === shuffledDirections.length) {
                stack = shuffleArray(stack);
                break;
            }
            switch (shuffledDirections[i]) {
                case 'U':
                    if (r - 2 > 0) {
                        newr = r - 2;
                        key = `${newr}-${c}`;
                        v = parseInt(indications[key]);
                        if (kruskalAlgo(u, v)) {
                            grid[r][c] = 0;
                            grid[r - 1][c] = 0;
                            grid[r - 2][c] = 0;
                            steps.push([r, c], [r - 1, c], [r - 2, c]);
                            state = true
                        }
                    }
                    break;
                case 'D':
                    if (r + 2 < row - 1) {
                        newr = r + 2;
                        key = `${newr}-${c}`;
                        v = parseInt(indications[key]);
                        if (kruskalAlgo(u, v)) {
                            grid[r][c] = 0;
                            grid[r + 1][c] = 0;
                            grid[r + 2][c] = 0;
                            steps.push([r, c], [r + 1, c], [r + 2, c]);
                            state = true;
                        }
                    }
                    break;
                case 'R':
                    if (c + 2 < col - 1) {
                        newc = c + 2;
                        key = `${r}-${newc}`;
                        v = parseInt(indications[key]);
                        if (kruskalAlgo(u, v)) {
                            grid[r][c] = 0;
                            grid[r][c + 1] = 0;
                            grid[r][c + 2] = 0;
                            steps.push([r, c], [r, c + 1], [r, c + 2]);
                            state = true
                        }
                    }
                    break;
                case 'L':
                    if (c - 2 > 0) {
                        newc = c - 2;
                        key = `${r}-${newc}`;
                        v = parseInt(indications[key]);
                        if (kruskalAlgo(u, v)) {
                            grid[r][c] = 0;
                            grid[r][c - 1] = 0;
                            grid[r][c - 2] = 0;
                            steps.push([r, c], [r, c - 1], [r, c - 2]);
                            state = true
                        }
                    }
                    break;
            }
            if (state) {
                break;
            }
        }

    }
    return grid;
}
var getStepsToCreateMaze__Kruskal = (r, c) => {
    steps = []
    var grid = kruskalMaze(r, c)
    return [steps, grid];
}
export { getStepsToCreateMaze__Kruskal }