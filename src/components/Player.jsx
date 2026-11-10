export default function Player({
  song,
  isPlaying,
  progress,
  onPrevious,
  onToggle,
  onNext,
  onSeek,
}) {
  return (
    <footer className="player">
      <div className="player-song">
        <strong>{song?.title || "Select a song"}</strong>
        <p>{song?.artist || "Artist"}</p>
      </div>
      <div className="controls">
        <button onClick={onPrevious} aria-label="Previous song">⏮</button>
        <button onClick={onToggle} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={onNext} aria-label="Next song">⏭</button>
      </div>
      <input
        className="progress"
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(event) => onSeek(event.target.value)}
        aria-label="Song progress"
      />
    </footer>
  );
}
