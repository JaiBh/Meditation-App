const app = () => {
	// Audio track
	const song = document.querySelector(`.song`);
	// Play button
	const play = document.querySelector(`.play`)
	// Video duration circle
	const outline = document.querySelector(`.moving-outline circle`);
	// The video
	const video = document.querySelector(`.vid-container video`)

	// Sounds
	const sounds = document.querySelectorAll(`[data-sound]`)
	// Time display
	const timeDisplay = document.querySelector(`.time-display`)
	// Buttons to choose duration
	const timeSelect = document.querySelectorAll(`[data-time]`)
	// Get the length of outline
	const outlineLength = outline.getTotalLength();
	// Duration
	let fakeDuration = 600;

	outline.style.strokeDasharray = outlineLength;
	outline.style.strokeDashoffset = outlineLength;

	//Pick different sounds
	sounds.forEach(sound => {
		sound.addEventListener(`click`, function() {
			song.src= this.dataset.sound
			video.src= this.dataset.video
			checkPlaying(song);
		})
	})
	// PLay sound
	play.addEventListener(`click`, () => {
		checkPlaying(song);
	})

	// Function to stop and play sounds
	const checkPlaying = song => {
		if(song.paused){
			song.play();
			video.play();
			play.src="./svg/pause.svg"
		}else{
			song.pause();
			video.pause();
			play.src= "./svg/play.svg"
		}	
	};

	// Select Time
	timeSelect.forEach(option => {
		option.addEventListener(`click`, function () {
			fakeDuration = this.dataset.time;
			song.currentTime = 0;
		})
	})


	// Animate the cirle
	song.ontimeupdate = () => {
		let currentTime = song.currentTime;
		let elapsedTime = fakeDuration - currentTime;
		let minutes = Math.floor(elapsedTime / 60);
		let seconds = Math.floor(elapsedTime % 60);
		timeDisplay.textContent = `${minutes < 10 ? `0`: ``}${minutes}:${seconds < 10 ? `0`: ``}${seconds}`

		let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
		outline.style.strokeDashoffset = progress;

		if(currentTime >= fakeDuration){
			song.pause();
			song.currentTime = 0;
			play.src= "./svg/play.svg"
			video.pause();
		}
	}
};

app();

