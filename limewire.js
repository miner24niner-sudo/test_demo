//limewire logic

const setSessionItem = window.sessionStorage.setItem

sessionStorage.setItem = function(key, value) {
	setSessionItem.call(sessionStorage, key, value)

	window.dispatchEvent(new CustomEvent('storage-set', {
		detail: {
			key: key,
			newValue: value,
			type: "set"
		}
	}))
}

const audioFilePath = window.sessionStorage.getItem('current-audio')
const currentAudio = new Audio(audioFilePath)
// window.sessionStorage.setItem('play-music', false) //remove once adding more ways to set 'play-music'

window.addEventListener("storage-set", (event) => {
	if (sessionStorage.getItem('play-music') === "true") {
		let songTime = window.sessionStorage.getItem('music-state')
		currentAudio.currentTime = songTime //does not work :(
		currentAudio.play()
		currentAudio.loop = true
	}
	if (sessionStorage.getItem('play-music') === "false") {
		currentAudio.pause()
	}
});

window.addEventListener("storage", (event) => {
	if (sessionStorage.getItem('play-music') === "true") {
		let songTime = window.sessionStorage.getItem('music-state')
		currentAudio.currentTime = songTime //does not work :(
		currentAudio.play()
		currentAudio.loop = true
	}
	if (sessionStorage.getItem('play-music') === "false") {
		currentAudio.pause()
	}
});

if (sessionStorage.getItem('play-music') === "true") {
	let songTime = window.sessionStorage.getItem('music-state')
	currentAudio.currentTime = songTime //does not work :(
	currentAudio.play()
	currentAudio.loop = true
}

window.addEventListener('beforeunload', (event) => {
	console.log(currentAudio.currentTime)
	currentAudio.pause()
	const audioState = currentAudio.currentTime 
	window.sessionStorage.setItem('music-state', audioState)
});


//stuff for main.html
const button = document.querySelector("button")
if (button !== null) {
button.addEventListener("click", (event) => {
	if (window.sessionStorage.getItem('play-music') === "false") { 
		window.sessionStorage.setItem('play-music', true)
		currentAudio.currentTime = 0 //comment out if not wanted
	}
	else if (window.sessionStorage.getItem('play-music') === "true") {
		window.sessionStorage.setItem('play-music', false)
	}
	else {
		console.log("But nobody came.")
	}
})
}
