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