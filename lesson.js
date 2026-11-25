const musicState = window.sessionStorage.getItem('music-state');

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