const currentQuestion = document.querySelector(".label");
const questionTypeIndicator	= document.querySelector(".question-type-indicator")
const textArea = document.querySelector(".text-box");

const resultsArea = document.querySelector(".result-box");
const result = resultsArea.querySelector(".result");
const correctAnswer = resultsArea.querySelector(".correct-answer");

const confirmButton = document.querySelector(".check-answer");

let answerChecked = false
let usedQuestions = []
let accentBonus = 0
let difficultyLevel = 1
let chickenNumber = 1

//create the question/answer bank using difficulty level/chicken number

//NOTE: Figure out how to move the questions to a different .js file to conserve space for this file (because there will be a LOT of questions)

function loadQuestionBank() {
console.log(accentBonus)

if (chickenNumber === 1) {

if (difficultyLevel === 1) {
	let questionArray = ["Hello (Singular)", "Goodbye (Singular)", "Hello (Plural)", "Goodbye (Plural)", "My name is Marcus.", "I love", "You love", "He/She/It loves", "Amamus", "Amant"];
	let answerArray = [
		["salve", "salvē"],
		["vale", "valē"],
		"salvete",
		"valete",
		["nomen mihi est marcus", "nomen mihi marcus est", "marcus nomen mihi est", "nomen mihi est marcus.", "nomen mihi marcus est.", "marcus nomen mihi est."], //why am I checking for punctuation........ I feel like there should be a better way
		["amo", "amō"],
		"amas",
		"amat",
		"we love",
		"they love"
	];
	let questionOrder = [] 

	//alternate answers...?
	let alternateAnswerArray = ["salve", "vale", "salvete", "valete", "nomen mihi marcus est", "amo", "amas", "amat", "we love", "they love"]

	discoverQuestion(questionArray, answerArray)
}

if (difficultyLevel === 2) {
	//unfortunately the questions/answers are the exact same as Difficulty 1 because I'm just focusing on "simple" questions right now
	let questionArray = ["Hello (Singular)", "Goodbye (Singular)", "Hello (Plural)", "Goodbye (Plural)", "My name is Marcus.", "I love", "You love", "He/She/It loves", "Amamus", "Amant"];
	let answerArray = ["salve", "vale", "salvete", "valete", "nomen mihi est marcus", "amo", "amas", "amat", "we love", "they love"];

	discoverQuestion(questionArray, answerArray)
}
//more if loops for questions for chicken 1
}
//more if loops for chickens
}

function discoverQuestion(questionArray, answerArray) {
	num = Math.round(Math.random() * (questionArray.length - 1)); //generates a number betwween 0 and 9, then puts it in an array
	currentQuestion.textContent = questionArray[num]
	currentAnswer = answerArray[num]
	confirmButton.textContent = "Check"

	//use for debugging
	// console.log(num)
	// console.log(usedQuestions)

	if (usedQuestions.includes(num)) {
		discoverQuestion(questionArray, answerArray);
		return;
	} else {
		usedQuestions.unshift(num)
		console.log(usedQuestions)
	}

	//picks the question type indicator based on the type of question... this means that question types MUST be grouped together when coming up with the questionArray

	//Just realized that there is going to be a lot of these if loops (5 difficulty levels per chicken * 75 chickens = 375 if loops... maybe figure out how to alter the code so you just need a few [Froot] loops)
	if (difficultyLevel === 1 || num <= 7) {
		questionTypeIndicator.textContent = "Translate to Latin:"
	} else if (difficultyLevel === 1 || num > 7) {
		questionTypeIndicator.textContent = "Translate to English:"
	}

	//logs the answer to the console (for debugging and making sure everything works)
	console.log(`current answer = ${answerArray[num]}`)
}

confirmButton.addEventListener("click", (event) => {
	if (answerChecked === false) {
	event.preventDefault();
	checkAnswer();
}	else {
	event.preventDefault();
	loadQuestionBank();
}

});

function checkAnswer() {
	let response = textArea.value.toLowerCase();
	textArea.disabled = "true";

	console.log(`response = ${response}`)

	arrayedAnswer = response.split(" ")
	arrayedAnswer.forEach(autocorrectAnswer)

	correctedResponse = arrayedAnswer.toString().replaceAll(",", " ")
	console.log(`correctedResponse = ${correctedResponse}`)

	if (currentAnswer.constructor !== Array) {
		if (correctedResponse === currentAnswer) {
		 textArea.classList.add("correct");
		} else {
		 textArea.classList.add("incorrect");
		}
	}   else {
		for (i = 0; i <= (currentAnswer.length - 1); i += 1) {
			console.log(currentAnswer[i])
			if (correctedResponse === currentAnswer[i]) {
				textArea.classList.remove("incorrect")
				textArea.classList.add("correct")

					//IT'S ANOTHER IF LOOP RUN FOR YOUR LIVES
					if (currentAnswer[i].includes("ā") || currentAnswer[i].includes("ē") || currentAnswer[i].includes("ī") || currentAnswer[i].includes("ō") || currentAnswer[i].includes("ū")) {
						accentBonus += 1
						console.log(accentBonus)

						confirmButton.textContent = "Continue"
						answerChecked = true
						return;
					}

				confirmButton.textContent = "Continue"
				answerChecked = true
				return;
			} else {
				textArea.classList.add("incorrect")
			}
		}
	}

	confirmButton.textContent = "Continue"
	answerChecked = true
}

function checkForAccents(currentAnswer, i) {
	if (currentAnswer[i].includes("ā") || currentAnswer[i].includes("ē") || currentAnswer[i].includes("ī") || currentAnswer[i].includes("ō") || currentAnswer[i].includes("ū")) {
		accentBonus += 1
		console.log(accentBonus)
	}
}

//Might be a good idea to put the autocorrection function in a separate .js file as well, because I forsee this getting LONG
function autocorrectAnswer(item, index) {
	if (item === "et" || item === "es") {
		arrayedAnswer[index] = "est"
	}
	if (item === "tey" || item === "tjey") {
		arrayedAnswer[index] = "they"
	}
}

loadQuestionBank();
