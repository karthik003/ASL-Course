import React, { useState, useEffect, useRef } from 'react';
import { Button, Slider } from '@mui/material';

const AudioRecorder = () => {
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const recorderRef = useRef(null);

  // Initialize recording functionality
  const initRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.addEventListener('dataavailable', handleAudioDataAvailable);
      recorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  // Handle audio data available after recording
  const handleAudioDataAvailable = (event) => {
    const audioBlob = new Blob([event.data], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioURL(audioUrl);
  };

  // Start recording audio
  const startRecording = () => {
    if (!isRecording) {
      initRecording();
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
      setIsRecording(false);
      // Ensure the stream is stopped as well
      recorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Toggle play/pause for the audio
  const togglePlayPause = () => {
    if (audioURL) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Setup audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      console.log('duration',audio.duration)
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      console.log('currentTime',audio.currentTime)
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioURL]);

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  return (
    <div>
      <Button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </Button>
      <Button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </Button>
      <Button onClick={togglePlayPause} disabled={!audioURL}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Slider
        min={0}
        // max={duration || 0}
        value={currentTime}
        // step={1}
        onChange={handleSliderChange}
        aria-labelledby="audio-playback-slider"
        disabled={!audioURL}
      />
      <audio ref={audioRef} src={audioURL} hidden />
    </div>
  );
};

export default AudioRecorder;
