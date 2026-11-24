const button = document.querySelector("button")
const audioFilePath = "./snd/greenroom.ogg" //change <audio></audio> in HTML as well
const currentAudio = new Audio(audioFilePath)
window.sessionStorage.setItem('current-audio', audioFilePath)

button.addEventListener("click", (event) => {
	currentAudio.play()
	currentAudio.loop = true
})

window.addEventListener('beforeunload', (event) => {
	console.log(currentAudio.currentTime)
	const audioState = currentAudio.currentTime 
	// const audioData = JSON.stringify(audioState)
	window.sessionStorage.setItem('music-state', audioState)
})
