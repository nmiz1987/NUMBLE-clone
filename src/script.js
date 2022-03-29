var boxes = document.querySelectorAll('.box');
var answerRequired = ["8", "-", "0", "-", "3", "/", "1"]
var resultRequired = 5
var col = 0
var activeRow = 0
var showNext = 1

var currentBox = boxes[col + 7 * activeRow]

document.addEventListener("keydown", (e) => {
    var key = e.key

    if (key.match(/[0-9]|\+|\-|\*|\//i) || e.key == 'Enter') { // only number and ops
        if (key.match(/[0-9]|\+|\-|\*|\//i)) {
            currentBox.innerText = key
            currentBox.setAttribute('class', 'box filled')
            col++
            currentBox = boxes[col + 7 * activeRow]
        }

        if ((col == 6) && Object.is(e.code, 'Enter')) {
            var temp = []
            for (let i = 0; i < 7; i++)
                temp.push(boxes[i + 7 * activeRow].innerText)
            if (eval(temp.join('')) != resultRequired) {
                console.log("NO")
            } else {
                console.log("YES")
                let show = document.querySelector('#a_' + showNext++)
                show.setAttribute('style', 'display: block;')
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++)
                    // if (answerRequired[j] === boxes[i + 7 * activeRow].innerText) {
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
        }
        if ((col % 7 == 0) && !(Object.is(e.code, 'Enter'))) { // don't move to next row
            col--
            currentBox = boxes[col + 7 * activeRow]
        }
    }

    if (Object.is(e.code, 'Backspace') && col > 0) { // clear box
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
})