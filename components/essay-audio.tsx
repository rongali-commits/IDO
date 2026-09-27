"use client";

import { useEffect, useRef, useState } from "react";

type EssayAudioProps = {
  title: string;
  src: string;
};

const speeds = [1, 1.25, 1.5];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function EssayAudio({ title, src }: EssayAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncDuration = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    syncDuration();
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      setError(false);
      await audio.play();
    } catch {
      setError(true);
    }
  }

  function changeSpeed() {
    const nextSpeed = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
    setSpeed(nextSpeed);
  }

  return (
    <section className="essay-audio" aria-label={`Audio narration of ${title}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
        onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      <div className="essay-audio-heading">
        <div>
          <span className="essay-audio-kicker">Audio edition</span>
          <h2>Listen to this essay</h2>
          <p>Thoughtful synthetic narration · the full essay, read aloud</p>
        </div>
        <button className="essay-audio-play" type="button" onClick={togglePlayback} aria-label={playing ? "Pause narration" : "Play narration"}>
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="essay-audio-controls">
        <span aria-label="Elapsed time">{formatTime(time)}</span>
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="1"
          value={Math.min(time, duration || 1)}
          onChange={event => {
            const nextTime = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = nextTime;
            setTime(nextTime);
          }}
          aria-label="Seek narration"
          disabled={!duration}
        />
        <span aria-label="Total duration">{formatTime(duration)}</span>
        <button className="essay-audio-speed" type="button" onClick={changeSpeed} aria-label={`Playback speed ${speed} times. Change speed.`}>{speed}×</button>
      </div>
      {error && <p className="essay-audio-error" role="status">Audio could not be played. Please try again.</p>}
    </section>
  );
}
