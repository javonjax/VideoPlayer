// ===========Get page elements===========
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('button[data-skip]');
const sliders = player.querySelectorAll('.player__slider');


// ===========Functions===========

// Event handler for playing the video 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// Updates the play/pause button
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
}

// Updates video current time when skip buttons are pressed
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Updates video properties to match slider values
function handleSliderUpdate() {
    video[this.name] = this.value;
}

// Updates progress bar to match video current time
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

// Allows video current time to be set by dragging the progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Allows quick scrubbing forward and backward 5sec using L/R arrow keys
function quickScrub(e) {
    if(e.keyCode === 37){
        video.currentTime -= 5;
    }
    else if(e.keyCode === 39) {
        video.currentTime += 5;
    } else { 
        return;
    }

}

// ===========Event listeners===========

// Video
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// Play button
playButton.addEventListener('click', togglePlay);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Sliders
sliders.forEach(slider => slider.addEventListener('change', handleSliderUpdate));
sliders.forEach(slider => slider.addEventListener('mousemove', handleSliderUpdate));

// Progress bar
let mouseDown = false; // Mouse flag
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mouseover', (e) => {
    if(mouseDown){
        scrub(e);
    }
});

// Window
window.addEventListener('keyup', quickScrub);


/* #TODO:
        1. make video scrubbing smoother
        2. add a fullscreen button
        3. add labels for sliders*/