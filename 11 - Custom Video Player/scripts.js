// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build our functions
function togglePlay(){
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(){
  const icon = this.paused ? '►' :'||'
  toggle.textContent = icon;
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percentage = video.currentTime / video.duration * 100;
  progressFilled.style['flex-basis'] = `${percentage}%`;
}

function scrub(e){
  video.currentTime = video.duration * e.offsetX / progressBar.offsetWidth;

}

// hook up event listeners
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate))
video.addEventListener('click',togglePlay)
toggle.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
skipButtons.forEach(button => button.addEventListener('click',skip))
video.addEventListener('timeupdate',handleProgress)

let mousedown = false;
progressBar.addEventListener('click',scrub)
progressBar.addEventListener('mousemove',(e)=>mousedown && scrub(e))
progressBar.addEventListener('mousedown',()=>mousedown = true)
progressBar.addEventListener('mouseup',()=>mousedown = false)
