const boxes = document.querySelectorAll('.box'); // all the boxes in upper part
const ansBoxes = document.querySelectorAll('.box_ans'); // all the boxes in downer part
const closeWinRes = document.querySelector('#symbol');
const openWinRes = document.querySelector('#statsButton');
const resultWindow = document.querySelector('.result-window');
var countPlayed = document.querySelector('#count-played');
var countWon = document.querySelector('#count-Won');
var countWin = document.querySelector('#count-Win');

var answerRequired = ["8", "-", "0", "-", "3", "/", "1"]
var resultRequired = 5
var col = 0 // location in column
var activeRow = 0 // location in row
var showNext = 0 // to reveal next row
var correctAns = 0
countPlayed.innerText = 0
countWon.innerText = 0
countWin.innerText = 0

var currentBox = boxes[col + 7 * activeRow]

function userInput(e) {
    var keyFromkeyboard = e.key
    var keyFromMouse = e.target.innerText
    var keyButtonEnter
    var keyButtonBackspace
    var key = keyFromkeyboard || keyFromMouse // take from the active input

    if (e.target.id == 'Enter')
        keyButtonEnter = 'Enter'

    if (e.target.id == 'Backspace')
        keyButtonBackspace = 'Backspace'


    if (key.match(/[0-9]|\+|\-|\*|\//i) || e.key == 'Enter' || keyButtonEnter == 'Enter') { // only number and operators
        if (key.match(/[0-9]|\+|\-|\*|\//i)) {
            currentBox.innerText = key
            currentBox.setAttribute('class', 'box filled')
            col++
            currentBox = boxes[col + 7 * activeRow]
        }

        if ((col == 6) && (Object.is(e.code, 'Enter') || keyButtonEnter == 'Enter')) {
            var temp = []
            for (let i = 0; i < 7; i++)
                temp.push(boxes[i + 7 * activeRow].innerText)
                // try {
            if (eval(temp.join('')) != resultRequired) {
                console.log("Wrong answer!")
            } else {
                console.log("Correct!")
                correctAns++
                showNext++
                // finished game
                if (correctAns == 6) {
                    console.log("Game finished!")
                    countWon.innerText = Number(countWon.innerText) + 1
                    resultWindow.style.display = "flex;";
                    // show.setAttribute('style', 'display: flex;')
                }


                let show = document.querySelector('#a_' + showNext)
                show.setAttribute('style', 'display: block;')
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++)
                        if (Object.is(answerRequired[j], boxes[i + 7 * activeRow].innerText)) {
                            if (i == j) {
                                boxes[i + 7 * activeRow].setAttribute('class', 'box filled current')
                            } else {
                                if (Object.is(boxes[i + 7 * activeRow].getAttribute('class'), 'box filled current'))
                                    continue
                                boxes[i + 7 * activeRow].setAttribute('class', 'box filled wrongPlace')
                            }
                        }
                }


                activeRow++
                col = 0
                currentBox = boxes[col + 7 * activeRow]
            }
            // } catch {
            // console.log("invalid input")
            // }

        }
        if ((col % 7 == 0) && !(Object.is(e.code, 'Enter')) && !(keyButtonEnter == 'Enter')) { // don't move to next row
            col--
            currentBox = boxes[col + 7 * activeRow]
        }

    }

    if ((Object.is(e.code, 'Backspace') || keyButtonBackspace == 'Backspace') && col > 0) { // clear box
        if ((col == 6) && currentBox.innerText != '') {
            currentBox.setAttribute('class', 'box')
            currentBox.innerText = ''
        } else {
            col--
            currentBox = boxes[col + 7 * activeRow]
            currentBox.setAttribute('class', 'box')
            currentBox.innerText = ''
        }
    }
    e.stopPropagation();
}

closeWinRes.addEventListener('click', () => {
    resultWindow.style.display = "none";
})

openWinRes.addEventListener('click', () => {
    resultWindow.style.display = "flex";
})

document.addEventListener("keydown", userInput)

ansBoxes.forEach(box => box.addEventListener("click", userInput))