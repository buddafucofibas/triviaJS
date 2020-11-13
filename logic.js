let userAnswer
let round = 1
let questionNum = 0
let score = 0
let submit = document.querySelector('#submit')
let next = document.querySelector('#next')
let question = document.querySelector('.question')
let answers = document.querySelector('.answers')
let results = document.querySelector('.results')
let scoreDisplay = document.querySelector('.score span')
let roundDisplay = document.querySelector('.round span')

// Utility functions
const print = text => console.log(text)

const clearDisplay = () => {
  question.innerHTML = ''
  answers.innerHTML = ''
  results.innerHTML = ''
  submit.disabled = true
  next.disabled = true
}

// shuffles arrays and removes the last entry
const tf = array => {
  const size = array.length
  const order = []
  const newArray = []
  let i = 0

  while (i < size) {
    let num = Math.floor(Math.random() * size)
    if (!order.includes(num)) {
      order.push(num)
      i++
    }
  }

  for (let i = 0; i < size; i++) {
    newArray[order[i]] = array[i]
  }
  return newArray
}

// scrambles answers and renders to DOM
const drawAnswers = array => {
  let answers = document.querySelector('.answers')

  array.forEach(e => {
    let div = document.createElement('div')
    let input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('name', 'answer')
    input.setAttribute('value', e)
    input.setAttribute('id', `id_${e}`)
    let label = document.createElement('label')
    label.setAttribute('for', `id_${e}`)
    label.innerText = e

    div.append(input)
    div.append(label)
    answers.append(div)
  })
}
// takes as an argument a question object and renders the question and answer choices to the DOM
const displayQuestion = question => {
  let answerChoices = [...question.incorrect]
  answerChoices.push(question.correct)
  answerChoices = tf(answerChoices)
  document.querySelector('.question').innerText = `${questionNum + 1}. ${question.question}`
  drawAnswers(answerChoices)
}

// fetches data from local json and stores it in an array
// (async () => {
//     const raw = await fetch('/Apprentice_TandemFor400_Data.json');
//     const parsed = await raw.json();
//     data = tf(parsed);
//     data.pop();
// })();

// detects when a user selects a radio input and enables submit button
document.querySelector('.answers').addEventListener('click', e => {
  if (e.target.type == 'radio') {
    submit.disabled = false
  }
})

// checks user answer against correct answer and displays correct answer
submit.addEventListener('click', () => {
  document.querySelectorAll('input').forEach(e => {
    if (e.checked) {
      userAnswer = e.value
    } else {
      e.nextElementSibling.style.color = 'lightgray'
    }
  })

  // increment score if answer is correct
  if (userAnswer == data[questionNum].correct) {
    score++
  }

  // display correct answer
  results.innerText = `Correct answer: ${data[questionNum].correct}`
  // reset buttons
  submit.disabled = true
  next.disabled = false
  // increment question number counter;
  questionNum++
})

// displays next question when user hits 'next' button
next.addEventListener('click', () => {
  if (questionNum == 10) {
    round = 2
    scoreDisplay.innerText = score
  }

  if (questionNum == 20) {
    results.innerText = `Congratulations! You answered ${score} of ${data.length} questions correctly!`
    scoreDisplay.innerText = score
    next.disabled = true
    submit.disabled = true
    return
  }

  clearDisplay()
  displayQuestion(data[questionNum])
  roundDisplay.innerText = round
})

// Start game
document.querySelector('#start').addEventListener('click', function () {
  document.querySelector('#game_start').style.display = 'none'
  document.querySelector('.gameboard').style.display = 'flex'
  data = tf(data)
  data.pop()
  displayQuestion(data[questionNum])
})
