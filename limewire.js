//Limewire Music Player: Playing your audio since..... 2026????

//TO USE:
////Set sessionStorage variables in a separate JavaScript document:
//////current-audio: Set to the filepath of the song you want to play
//////play-music (boolean): Set to true when playing music, set to false when not
//////music-state: Ignore, Limewire will deal with this automatically

//Sets storage and variables, along with a custom event (which may or may not work in Firefox)
if (window.sessionStorage.getItem('play-music') === null) {
	window.sessionStorage.setItem('play-music', false)
}

if (window.sessionStorage.getItem('current-audio') === null) {
	window.sessionStorage.setItem('current-audio', "./snd/flowerman.ogg")
}

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

//Play music if play-music = true, from the place the music was left off on (default = 0)
window.addEventListener("storage-set", (event) => {
	if (sessionStorage.getItem('play-music') === "true") {
		let songTime = window.sessionStorage.getItem('music-state')

		currentAudio.currentTime = songTime
		currentAudio.play()
		currentAudio.loop = true
	}
	if (sessionStorage.getItem('play-music') === "false") {
		currentAudio.pause()
	}
});

//might be unnecessary, since it's only checking for things on the same tab and not on different ones
window.addEventListener("storage", (event) => {
	if (sessionStorage.getItem('play-music') === "true") {
		let songTime = window.sessionStorage.getItem('music-state')
		currentAudio.load()
		currentAudio.currentTime = songTime
		currentAudio.play()
		currentAudio.loop = true
	}
	if (sessionStorage.getItem('play-music') === "false") {
		currentAudio.pause()
	}
});

//might also be unnecessary since you can't do autoplay if user hasn't interacted with document
if (sessionStorage.getItem('play-music') === "true") {
	let songTime = window.sessionStorage.getItem('music-state')
	currentAudio.load()
	currentAudio.currentTime = songTime
	currentAudio.play()
	currentAudio.loop = true
}


//Save the time of the song when window is about to be unloaded so it can be accessed and used
window.addEventListener('beforeunload', (event) => {
	console.log(currentAudio.currentTime)
	currentAudio.pause()
	const audioState = currentAudio.currentTime 
	window.sessionStorage.setItem('music-state', String(audioState))
});
