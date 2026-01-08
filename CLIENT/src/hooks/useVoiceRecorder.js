import { useState, useEffect, useCallback } from 'react';

export const useVoiceRecorder = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const resultText = event.results[current][0].transcript;
      setTranscript(resultText);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    window._recognition = recognition; // Save reference to stop it later
  }, []);

  const stopListening = () => {
    if (window._recognition) {
      window._recognition.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};