const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
  .then(localMediaStream =>{
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err => {
    console.err(`Oh noo please let me access webcame!`, err);
  })
}

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  setInterval(()=>{
    ctx.drawImage(video,0,0, width, height);
    //get data from the canvas
    let pixels = ctx.getImageData(0,0,width,height);
    //mess with pixels
    pixels = rgbSplit(pixels);
    //put pixels back
    ctx.putImageData(pixels,0,0)

  },16);
}

function redEffect(pixels){
  for (let i = 0 ; i < pixels.data.length; i+=4){
    pixels.data[i] += 100; //red channel
    pixels.data[i+1] -= 50; //green channel
    pixels.data[i+2] *= 0.5;//blue channel
  }
  return pixels;
}

function rgbSplit(pixels){
  for (let i = 0 ; i < pixels.data.length; i+=4){
    pixels.data[i - 150] = pixels.data[i] ; //red channel
    pixels.data[i+100] = pixels.data[i+1] ; //green channel
    pixels.data[i-150] = pixels.data[i+2] ;//blue channel
  }
  return pixels;
}

function takePhoto(){
  //play the sound
  snap.currentTime = 0 ;
  snap.play();
  //take the data out of canvas
    //data is a text based representation of the image
  const data = canvas.toDataURL('image/jpeg')
  // create link
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download','handsome');
  link.innerHTML = `<img src="${data}" alt="handsome man">`
  strip.insertBefore(link,strip.firstChild)
}

function greenScreen(pixels){
  
}

getVideo();

video.addEventListener('canplay',paintToCanvas)
