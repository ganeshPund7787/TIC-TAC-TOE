let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, playerX
// this is patterns of game 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// this is for reset all game and play new game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// EventListener's for all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.style.color = "blue";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "green";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })

})

// showWinner time disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// reset game enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// this is only used for showWinner

const showWinner = (winner) => {
    msg.innerText = `Congratulations  Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}



// this is only for check winner and display winner function call

const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if (pos1val != "" && pos2val != "" && pos3val != "") {
                if (pos1val == pos2val && pos2val == pos3val) {
                    showWinner(pos1val);
                }
            }
        }
        handleDraw();
}

// this is for reset Game or new game event function call 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);



// This function checks if the game is a draw
const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // If any box is empty, game is not a draw
        }
    }
    return true; // If no empty boxes found, game is a draw
}

// This function is called after each move to check for a draw
const handleDraw = () => {
    if (checkDraw()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}
