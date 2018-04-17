let numSquares = 6;
let colors = [];
let pickedColor;
let winstatus;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.getElementById('message');
let h1 = document.querySelector('h1');
let resetButton = document.getElementById('reset');
let modeBtn = document.querySelectorAll('.mode');
let dropBtn = document.getElementById('dropBtn');
let dropBtnFlashInt = setInterval(function(){}, 400);
let resetBtnFlashInt = setInterval(function(){}, 400);
let messageDisFlashInt = setInterval(function(){}, 400);

init();

function init() {
    //mode buttons event listener creation
    setUpModeBtn();
    //sets squares for initial game
    setUpSquares();
    reset();
}

function setUpModeBtn() {
    for(let i = 0; i < modeBtn.length; i++) {
        modeBtn[i].addEventListener("click", function () {
            modeBtn[0].classList.remove("selected");
            modeBtn[1].classList.remove("selected");
            modeBtn[2].classList.remove("selected");
            this.classList.add("selected");
            switch (this.textContent) {
                case "Easy":
                    numSquares = 3;
                    break;
                case "Medium":
                    numSquares = 6;
                    break;
                default:
                    numSquares = 9;
            };
            reset();
        });
    }
}

//CHECKS IF WON and sets up squares
function setUpSquares() {
    for(let i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            //compare color to clicked color CHECK IF WON
            if (clickedColor === pickedColor && !winstatus) {
                winstatus = true;
                messageDisplay.textContent = "correct";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
                flash();
             } else if (!winstatus) {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "try Again";
             }
        });
    }
}

//gives new colours and squares depending on numSquares val
function reset() {
    winstatus = false;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = '';
    resetButton.textContent = "New Colors";
    for(let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i] 
        } else {
            squares[i].style.display = "none";
        }
    }; stopFlash();
}

resetButton.addEventListener("click", function () {
   reset();
});

//change square color to winning color
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//picks color for guessing
function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }  return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function flash() { 
    dropBtnFlashInt = setInterval(function(){
        dropBtn.style.color = dropBtn.style.color != "white" ? "white" : pickedColor;
    }, 400);
    resetBtnFlashInt = setInterval(function(){
        resetButton.style.color = resetButton.style.color != "white" ? "white" : pickedColor;           
    }, 400);
    messageDisFlashInt = setInterval(function(){
        messageDisplay.style.color = messageDisplay.style.color != "white" ? "white" : pickedColor;        
    }, 400);
}

function stopFlash() {
    window.clearInterval(dropBtnFlashInt);
    window.clearInterval(resetBtnFlashInt);
    window.clearInterval(messageDisFlashInt);
    resetButton.style.color = "rgb(255, 189, 46)";
    dropBtn.style.color = "rgb(255, 189, 46)";
    messageDisplay.style.color = "rgb(255, 189, 46)";
    h1.style.backgroundColor = "rgb(255, 189, 46)";
}