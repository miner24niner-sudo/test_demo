//Copy of ver 0.0.1

const currentQuestion = document.querySelector(".label");
const questionTypeIndicator	= document.querySelector(".question-type-indicator");
const textArea = document.querySelector(".text-box");

const resultsArea = document.querySelector(".result-box");
const result = resultsArea.querySelector(".result");
const correctAnswer = resultsArea.querySelector(".correct-answer");

const confirmButton = document.querySelector(".check-answer");
// let usedQuestions = [1, 2, 3, 4, 5, 6, 7, 8]
let difficultyLevel = 1
let chickenNumber = 1

//discover questions + cooresponding answers using difficulty level

//NOTE: Figure out how to move the questions to a different .js file to conserve space for this file (because there will be a LOT of questions)

function loadQuestionBank() {
if (chickenNumber === 1) {

if (difficultyLevel === 1) {
	let questionArray = ["Hello (Singular)", "Goodbye (Singular)", "Hello (Plural)", "Goodbye (Plural)", "My name is Marcus.", "I love", "You love", "He/She/It loves", "Amamus", "Amant"];
	let answerArray = ["salve", "vale", "salvete", "valete", "nomen mihi est marcus", "amo", "amas", "amat", "we love", "they love"];

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
	num = Math.round(Math.random() * 9); //generates a number betwween 0 and 9, then puts it in an array
	console.log(num)
	currentQuestion.textContent = questionArray[num]
	let currentAnswer = answerArray[num]
	// console.log("usedQuestions array")
	// console.log(usedQuestions)

	// if usedQuestions.includes(num) {
	// 	discoverQuestion(questionArray, answerArray)
	// } else {
	// 	usedQuestions.push(num)
	// }

	//picks the question type indicator based on the type of question... this means that question types MUST be grouped together when coming up with the questionArray

	//Just realized that there is going to be a lot of these if loops (5 difficulty levels per chicken * 75 chickens = 375 if loops... figure out how to alter the code so you just need a few [Froot] loops)
	if (difficultyLevel === 1 || num <= 7) {
		questionTypeIndicator.textContent = "Translate to Latin:"
	} else if (difficultyLevel === 1 || num > 7) {
		questionTypeIndicator.textContent = "Translate to English:"
	}

	//logs the answer to the console (for debugging and making sure everything works)
	console.log(`answer = ${answerArray[num]}`)
}

confirmButton.addEventListener("click", (event) => {
	if (checkAnswer === true) {
	event.preventDefault();
	checkAnswer();
}	else {
	discoverQuestion
}

});

function checkAnswer() {
	let response = textArea.value.toLowerCase();
	textArea.disabled = "true";

	console.log(response)

	arrayedAnswer = response.split(" ")
	arrayedAnswer.forEach(autocorrectAnswer)

	correctedResponse = arrayedAnswer.toString().replaceAll(",", " ")
	console.log(correctedResponse)

	if (response === currentAnswer) {
	 textArea.classList.add("correct");
	} else {
	 textArea.classList.add("incorrect");
	}
}

//Might be a good idea to put the autocorrection function in a separate .js file as well, because I forsee this getting LONG
function autocorrectAnswer(item, index) {
	if (item === "et" || item === "es") {
		arrayedAnswer[index] = "est"
	}
	if (item === "tey") {
		arrayedAnswer[index] = "they"
	}
}

loadQuestionBank()