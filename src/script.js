var boxes = document.querySelectorAll('.box'); // all the boxes in upper part
var ansBoxes = document.querySelectorAll('.box_ans'); // all the boxes in downer part
var closeWinRes = document.querySelector('#symbol');
var openWinRes = document.querySelector('#statsButton');
var resultWindow = document.querySelector('.result-window');

var answerRequired = ["8", "-", "0", "-", "3", "/", "1"]
var resultRequired = 5
var col = 0 // location in column
var activeRow = 0 // location in row
var showNext = 1 // to reveal next row

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
            try {
                if (eval(temp.join('')) != resultRequired) {
                    console.log("Wrong answer!")
                } else {
                    console.log("Correct!")
                    let show = document.querySelector('#a_' + showNext++)
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
            } catch {
                console.log("invalid input")
            }

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
    console.log("close")
    resultWindow.style.display = "none";
})

openWinRes.addEventListener('click', () => {
    console.log("show")
    resultWindow.style.display = "flex";
})

document.addEventListener("keydown", userInput)

ansBoxes.forEach(box => box.addEventListener("click", userInput))