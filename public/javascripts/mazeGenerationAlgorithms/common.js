var createGrid = (r, c) => {
    let grid = Array(r).fill().map(() => Array(c).fill(1));
    return grid;
}
var shuffleArray = (arr) => {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

var createList = (x) => {
    let temp = []
    for (let i = 1; i < x; i += 2) {
        temp.push(i)
    }
    return temp
}

var createIndications = (r, c) => {
    let temp = {};
    let count = 0;
    for (let i = 1; i < r; i += 2) {
        for (let j = 1; j < c; j += 2) {
            temp[`${i}-${j}`] = count
            count++;
        }
    }
    return temp;
}

export { createGrid, shuffleArray, createList, createIndications }

