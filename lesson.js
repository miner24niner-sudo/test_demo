const currentQuestion = document.querySelector(".label");
const questionTypeIndicator	= document.querySelector(".question-type-indicator")
const textArea = document.querySelector(".text-box");
const accentButtons = document.querySelectorAll(".accent-button")

const tooltipArea = document.querySelector(".tooltip-box");
const tooltipContent = document.querySelector(".tooltip-content")
const currentQuestionBox = document.querySelector(".current-question-box")

const resultsArea = document.querySelector(".result-box");
const result = resultsArea.querySelector(".result");
const correctAnswer = resultsArea.querySelector(".correct-answer");

const confirmButton = document.querySelector(".check-answer");
const progressBar = document.querySelector(".progress-bar");

const replaceableCharacters = /[-();:'",./?&*]/g //if any of these characters are matched in the answer it will be replaced with ""

const correctNoise = new Audio('./snd/correctnoise.mp3')
const incorrectNoise = new Audio('./snd/incorrectnoise.mp3')
const musicState = window.sessionStorage.getItem('music-state');


//global variables.... some of these should get turned into non-global variables... maybe check if Ruby on Rails can fix this issue? (basically all of them except for EQN & answerChecked)
let answerChecked = false
let answerCorrect = true
let usedQuestions = []
let incorrectQuestions = []
let correctQuestions = []
let accentBonus = 0 
let difficultyLevel = 1
let chickenNumber = 1
let extraQuestionNodes = ""
let questionNum = 1

//Limewire Music Player
if ((musicState !== null) && (musicState !== "0.001")) {
	const audioData = window.sessionStorage.getItem('music-state');
	const currentSong = new Audio(window.sessionStorage.getItem('current-audio'))

	currentSong.addEventListener("loadedmetadata", () => {
		if (currentSong && audioData) {
		currentSong.currentTime = audioData
		console.log(currentSong.currentTime)
	}
		currentSong.play()
	})
	console.log(audioData)
	console.log(currentSong)
	console.log(window.sessionStorage.getItem("current-audio"))

	// if (currentSong && audioData) {
	// currentSong.currentTime = audioData
	// console.log(currentSong.currentTime)
	// currentSong.play()
	// }
}

//Changes the butons depending on which language is selected (>75 = Spanish, <=75 = Latin)
if (chickenNumber > 75) {
	accentButtons[5].style.display = "inline"
	accentButtons[0].style.marginLeft = "0.25vw"

	accentButtons[0].textContent = "á"
	accentButtons[1].textContent = "é"
	accentButtons[2].textContent = "í"
	accentButtons[3].textContent = "ó"
	accentButtons[4].textContent = "ú"
}

//create the question/answer bank using difficulty level/chicken number

//NOTE: Figure out how to move the questions to a different .js file to conserve space for this file (because there will be a LOT of questions)

function loadQuestionBank() {
answerChecked = false;
textArea.removeAttribute("disabled"); //It has recovered from its illness
textArea.value = "";

textArea.classList.remove("correct");
textArea.classList.remove("incorrect");
resultsArea.classList.remove("correct");
resultsArea.classList.remove("incorrect");

result.textContent = ""
correctAnswer.textContent = ""

currentQuestion.style.display = "inline"

console.log(`questionNum = ${questionNum}`)
console.log(`incorrectQuestions = ${incorrectQuestions}`)

if (document.querySelector(".temp-label") !== null) {
	let extraQuestionNodes = document.querySelectorAll(".temp-label");
	for (i = 0; i < extraQuestionNodes.length; i++) {
	extraQuestionNodes[i].remove();
	}
	extraQuestionNodes = ""
} 

if (incorrectQuestions.length === 0 && usedQuestions.length === 15) {
	finishLesson();
}

// console.log(accentBonus)

if (chickenNumber === 1) {

if (difficultyLevel === 1) {
	let questionArray = ["Hello (Singular)", "Goodbye (Singular)", "Hello (Plural)", "Goodbye (Plural)", 
		["My ", "name ", "is ", "Marcus."], //For this question, the amount of elements in the array and the amount of elements in the tooltipArray should be EQUAL
		"I love", "You love (sing.)", "He/She/It loves", "We love", "You love (plu.)", "They love", "amō", "amas", "amat", "amant"];

	let answerArray = [ //For answers, add no punctuation, no capital letters, & no whitespace (spaces before and after a string)
		["salve", "salvē"],
		["vale", "valē"],
		"salvete",
		"valete",
		["nomen mihi est marcus", "nomen mihi marcus est", "marcus nomen mihi est", "mihi nomen est marcus"],
		["amo", "amō"],
		"amas",
		"amat",
		"amamus",
		"amatis",
		"amant",
		"i love",
		"you love",
		["he loves", "she loves", "it loves", "hesheit loves"],
		"they love"
	];

	let tooltipArray = [
		"salvē",
		"valē", 
		"salvete", 
		"valete", 
		["mihi", "nomen", "est", "Marcus"], 
		"amare", 
		"amare", 
		"amare", 
		"amare", 
		"amare", 
		"amare", 
		"I love",
		"You love", 
		"He/She/It loves",
		"They love"
	];

	let displayedAnswerArray = [
		"salvē", "valē", "salvete", "valete", "Nomen mihi Marcus est. (or any variation)", "amō", "amas", "amat", "amamus", "amatis", "amant", "I love", "You love", "He loves/She loves/It loves", "They love"
	];
		discoverQuestion(questionArray, answerArray, tooltipArray, displayedAnswerArray);

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

function discoverQuestion(questionArray, answerArray, tooltipArray, displayedAnswerArray) {

	if (questionNum <= 15) {
		num = Math.round(Math.random() * (questionArray.length - 1));
		console.log(num)
		if (usedQuestions.includes(num)) {
			discoverQuestion(questionArray, answerArray, tooltipArray, displayedAnswerArray);
			return;
		} else {
			usedQuestions.push(num)
			console.log(usedQuestions)
		}
	}  else {
		num = incorrectQuestions[0]
		incorrectQuestions.shift(0)
		console.log(num)
		console.log(incorrectQuestions)

		if (straightShotXP !== 0) {
			straightShotXP = correctQuestions.length
		}
	}

	if (questionArray[num].constructor === Array) {
	for (i = 0; i < questionArray[num].length; i += 1) {
			currentQuestion.style.display = "none"
			el = document.createElement("h2")
			currentQuestionBox.appendChild(el)

			elContent = document.createTextNode(questionArray[num][i])
			el.appendChild(elContent)
			el.classList.add("temp-label")

			el.style.display = "inline"
		}

		let extraQuestionNodes = document.querySelectorAll(".temp-label");

		console.log(extraQuestionNodes)

		for (i = 0; i < extraQuestionNodes.length; i += 1) {

		let inc = i //This seems redundant but deleting this will break the event listeners for the extraQuestionNodes

		extraQuestionNodes[i].addEventListener("mouseover", (event) => {
			extraQuestionNodes[inc].classList.add("add-tooltip")	
			tooltipArea.style.border = "1px dotted black"
			tooltipArea.style.height = "5vh"
			tooltipContent.textContent = currentTooltip[inc]
		});

		extraQuestionNodes[i].addEventListener("mouseout", (event) => {
			extraQuestionNodes[inc].classList.remove("add-tooltip")
			tooltipArea.style.border = ""
			tooltipArea.style.height = "0"
			tooltipContent.textContent = ""
		})
	}
	}

	currentQuestion.textContent = questionArray[num]
	currentAnswer = answerArray[num]
	currentDisplayedAnswer = displayedAnswerArray[num]
	currentTooltip = tooltipArray[num]

	confirmButton.textContent = "Check"

	//use for debugging
	console.log(`current answer = ${answerArray[num]}`);
	// console.log(`currentTooltip = ${currentTooltip}`);
	// console.log(tooltipArray);
	// console.log(tooltipArray[num]);
	// console.log(currentTooltip);
	// console.log(usedQuestions);

	//picks the question type indicator based on the type of question... this means that question types MUST be grouped together when coming up with the questionArray

	//Just realized that there is going to be a lot of these if loops (5 difficulty levels per chicken * 75 chickens = 375 if loops... maybe figure out how to alter the code so you just need a few [Froot] loops)
	if (difficultyLevel === 1 && num <= 10) {
		questionTypeIndicator.textContent = "Translate to Latin:"
	} else if (difficultyLevel === 1 && num > 10) {
		questionTypeIndicator.textContent = "Translate to English:"
	}
}

function functionForCorrectAnswer() {
	textArea.classList.remove("incorrect")
	textArea.classList.add("correct")

	resultsArea.classList.add("correct")
	result.textContent = "Correct!"

	correctAnswer.textContent = `Correct Answer: ${currentDisplayedAnswer}`

	if (!correctQuestions.includes(num)) {
		correctQuestions.push(num)
	}

	let progressPercent = Math.round((correctQuestions.length * 6.66))
	progressBar.style.width = progressPercent + "%"

	correctNoise.play()
}

function functionForIncorrectAnswer() {
	textArea.classList.remove("correct");
	textArea.classList.add("incorrect")

	resultsArea.classList.add("incorrect")
	result.textContent = "Incorrect!"

	incorrectNoise.play()

	correctAnswer.textContent = `Correct Answer: ${currentDisplayedAnswer}`

//This is a band-aid solution...
//So this might not work later (It's "temporary")
	if (!incorrectQuestions.includes(num)) {
		incorrectQuestions.push(num)
	}
}

function checkAnswer() {
	let response = textArea.value.toLowerCase().replaceAll(replaceableCharacters, "").trim(); //method after method after method...
	textArea.disabled = "true";

	console.log(`response = ${response}`)

	let arrayedAnswer = response.split(" ")
	arrayedAnswer.forEach(autocorrectAnswer)

	let correctedResponse = arrayedAnswer.toString().replaceAll(",", " ")
	console.log(`correctedResponse = ${correctedResponse}`)

	let noAccentResponse = correctedResponse.replaceAll("ā", "a")
	noAccentResponse = noAccentResponse.replaceAll("ē", "e")
	noAccentResponse = noAccentResponse.replaceAll("ī", "i")
	noAccentResponse = noAccentResponse.replaceAll("ō", "o")
	noAccentResponse = noAccentResponse.replaceAll("ū", "u")

	if (currentAnswer.constructor !== Array) {
		if (correctedResponse === currentAnswer) {
		 functionForCorrectAnswer()
		} else {
		 functionForIncorrectAnswer()
		}
	}   else {
		for (i = 0; i <= (currentAnswer.length - 1); i += 1) {
			console.log(currentAnswer[i])
			if ((correctedResponse === currentAnswer[i]) || (noAccentResponse === currentAnswer[i])) {

					//IT'S ANOTHER IF LOOP RUN FOR YOUR LIVES
					if (currentAnswer[i].includes("ā") || currentAnswer[i].includes("ē") || currentAnswer[i].includes("ī") || currentAnswer[i].includes("ō") || currentAnswer[i].includes("ū")) {
						accentBonus += 1
						console.log(accentBonus)

						confirmButton.textContent = "Continue"
						answerChecked = true
						functionForCorrectAnswer()
						return;
					} else {
						functionForCorrectAnswer()
					}

				confirmButton.textContent = "Continue"
				answerChecked = true
				return;
			} else {
				if (i === currentAnswer.length - 1) {
				functionForIncorrectAnswer()
				}
			}
		}
	}

	confirmButton.textContent = "Continue"
	answerChecked = true
}

confirmButton.addEventListener("click", (event) => {
	if (answerChecked === false) {
	event.preventDefault();
	checkAnswer();
}	else { 
	event.preventDefault();
	questionNum += 1
	loadQuestionBank();
}
});

currentQuestion.addEventListener("mouseover", (event) => {
	currentQuestion.classList.add("add-tooltip")
	tooltipArea.style.border = "1px dotted black"
	tooltipArea.style.height = "5vh"
	tooltipContent.textContent = currentTooltip
});

currentQuestion.addEventListener("mouseout", (event) => {
	currentQuestion.classList.remove("add-tooltip")
	tooltipArea.style.border = ""
	tooltipArea.style.height = "0"
	tooltipContent.textContent = ""
});

for (i = 0; i < accentButtons.length - 1; i++) {
	let inc = i
	console.log(accentButtons[inc].textContent)
	accentButtons[inc].addEventListener("mousedown", (event) => {
		event.preventDefault();
		textArea.value += accentButtons[inc].textContent
	})
	accentButtons[inc].addEventListener("click", (event) => {
		event.preventDefault();
	})
}


function finishLesson() {
	console.log("The lesson has been finished. Yay.")
	let totalXP = straightShotXP + accentBonus + 10
	console.log(`TotalXP = ${totalXP}`)
}

//FIX THE AUTOCORRECT PLEASE
function autocorrectAnswer(item, index) {
	if (item === "et" || item === "es") {
		arrayedAnswer[index] = "est"
	}
	if (item === "tey" || item === "tjey") {
		arrayedAnswer[index] = "they"
	}
}

loadQuestionBank();