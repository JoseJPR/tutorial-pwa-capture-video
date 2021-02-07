// Default variables stream.
let globalStream = null;
let mediaRecorder = null;
let recordedChunks = [];
const config = {mimeType: 'video/webm'};

// Init element dom references.
const buttonCamera = document.getElementById('buttonCamera');
const buttonDownload = document.getElementById('buttonDownload');

/**
 * @name handlerStart
 * @description Function in order to start media instance.
 */
const handlerStart = () => {

  // Add class animation loop.
  buttonCamera.classList.add('animation-loop');

  // Init instance MediaRecorder.
  mediaRecorder = new MediaRecorder(globalStream, config);  
  
  // Event for save data recorered into array chunks.
  mediaRecorder.addEventListener('dataavailable', (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  });

  // Event stop where you can execute custom actions.
  mediaRecorder.addEventListener('stop', function() {
    console.log('addEventListener stop');

    // Create object url from blob.
    const objectRef = URL.createObjectURL(new Blob(recordedChunks));

    // Set button download href object reference and file name and extension;
    buttonDownload.href = objectRef;
    buttonDownload.download = 'record.webm';

    // Set player src object reference;
    player.src = objectRef;

    // Reset instance recorder.
    recordedChunks = [];
    mediaRecorder = null;
  });


  // Event start where you can execute custom actions.
  mediaRecorder.addEventListener('start', function() {
    console.log('addEventListener start');
  });

  // Event error where you can execute custom actions.
  mediaRecorder.addEventListener('error', function(err) {
    console.error('addEventListener error', err);
  });

  // Start recorder event of media recorder instance.
  mediaRecorder.start();
};

/**
 * @name handlerEnd
 * @description Function in order to stop media instance.
 */
const handlerEnd = () => {
  // Remove class animation loop.
  buttonCamera.classList.remove('animation-loop');

  // Stop recorder event of media recorder instance.
  mediaRecorder.stop();
};

// Active permisions of navigator for record audio.
navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((stream) => { 
    globalStream = stream;
  });

// Define all handlers for start and stop record desktop.
buttonCamera.addEventListener('mousedown', handlerStart);
buttonCamera.addEventListener('mouseup', handlerEnd);