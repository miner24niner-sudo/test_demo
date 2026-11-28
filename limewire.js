//Limewire Music Player: Playing your audio since..... 2026????
//IMPORTANT: Don't use LiveServerPlus for this since currentTime doesn't work well.... use a local server! (For Sublime Text it's Ctrl+B) 
//(I'm going to need to find a new server to run this on....)

//TO USE:
////Set sessionStorage variables in a separate JavaScript document:
//////current-audio: Set to the filepath of the song you want to play
//////play-music (boolean): Set to true when playing music, set to false when not
//////toast-data: Set to the toast you want to show up when playing music
//////music-state and current-toast: Ignore, limewire.js will deal with this automatically. If not, there's a serious problem.

////////////////////////////////////////////////////////////////////////////////////////////////////////////

////MUSIC PLAYBACK LOGIC
//Set storage and variables, along with a custom event (which may or may not work in Firefox)
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

if (window.sessionStorage.getItem('play-music') === null) {
	window.sessionStorage.setItem('play-music', false)
}

if (window.sessionStorage.getItem('current-audio') === null) {
	window.sessionStorage.setItem('current-audio', "./snd/flowerman.ogg") //this is bugged if you try and comment it out and move it to main.js
}

const audioFilePath = window.sessionStorage.getItem('current-audio')
const currentAudio = new Audio(audioFilePath)
let singleUsePlaybackFix = true
window.sessionStorage.setItem('toast-data', "Flower Man - Toby Fox") //see above comment about being bugged

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

//this eventListener might be unnecessary, since it's only checking for things on the same tab and not on different ones
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

//Save the time of the song when window is about to be unloaded so it can be accessed and used
window.addEventListener('beforeunload', (event) => {
	console.log(currentAudio.currentTime)
	currentAudio.pause()
	const audioState = currentAudio.currentTime 
	window.sessionStorage.setItem('music-state', String(audioState))
});


////MUSIC TOAST LOGIC

window.sessionStorage.setItem('current-toast', "Interact with the document first!")

window.addEventListener("storage-set", showMusicToast)

if (navigator.userActivation.hasBeenActive === false && window.sessionStorage.getItem('play-music') === "true") {
	showMusicToast() //kinda redundant but it works lol
}

function showMusicToast() {

//If document is actually interacted with...
	if (navigator.userActivation.hasBeenActive === true && window.sessionStorage.getItem('play-music') === "true") {
	window.removeEventListener("storage-set", showMusicToast)
	window.sessionStorage.setItem('current-toast', window.sessionStorage.getItem('toast-data'))
	console.log(window.sessionStorage.getItem('current-toast'))
}

//If document has not been interacted with
if (navigator.userActivation.hasBeenActive === false && window.sessionStorage.getItem('play-music') === "true") {
	console.log(window.sessionStorage.getItem('current-toast'))
	document.addEventListener("click", redoMusicToast) //maybe change this later, just used for testing currently unless I like it
}
}

function redoMusicToast() {
		window.sessionStorage.setItem('music-state', 0) //...maybe change this later?
		window.sessionStorage.setItem('play-music', true)
		document.removeEventListener("click", redoMusicToast)
}