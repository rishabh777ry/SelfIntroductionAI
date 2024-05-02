document.addEventListener('DOMContentLoaded', function() {
    const startVoiceTypingButton = document.getElementById('startVoiceTyping');
    const textArea = document.querySelector('.boxone textarea');
    const feedbackDiv = document.getElementById('feedback');

    if (startVoiceTypingButton && textArea) {
        startVoiceTypingButton.addEventListener('click', startVoiceTyping);
    }

    let recognition;

    function startVoiceTyping() {
        console.log("Recording started"); 
        startVoiceTypingButton.classList.add('recording');
        recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        feedbackDiv.innerText = "Recording started";

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            textArea.value = transcript;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            startVoiceTypingButton.classList.remove('recording');
            feedbackDiv.innerText = "";
        };

        recognition.start();
        console.log('Speech recognition started');
    }
});

const stopRecordingButton = document.getElementById('stopRecording');
if (stopRecordingButton) {
    stopRecordingButton.addEventListener('click', stopVoiceTyping);
}

function stopVoiceTyping() {
    if (recognition) {
        recognition.stop();
        console.log('Speech recognition stopped');
    }
}

