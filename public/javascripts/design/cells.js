
const cells = document.querySelectorAll(".cell");
window.addEventListener("load", () => {
    cells.forEach((cell) => {
        cell.classList.add("make-cell-visible");
        let temp = `opacity ${Math.floor(Math.random() * 9) + Math.random()}s cubic-bezier(.57,.77,0,1.92)`;
        cell.style.setProperty("transition", temp);
        cell.style.setProperty("background-color", "black");
        if (cell.getAttribute('id') === '10-10') { cell.style.setProperty("background-color", "green"); }
        if (cell.getAttribute('id') === '10-40') { cell.style.setProperty("background-color", "blue"); }
    })
    // console.log(cell);
})

// cubic-bezier(.33,1.62,.7,.06) bgcolor

