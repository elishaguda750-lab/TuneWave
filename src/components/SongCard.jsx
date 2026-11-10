export default function SongCard({ song, isFavorite, onPlay, onFavorite }) {
  return (
    <article className="song-card">
      <div className="cover" aria-hidden="true">{song.emoji}</div>
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <p>{song.genre}</p>
        <div className="song-buttons">
          <button onClick={onPlay}>▶ Play</button>
          <button
            className={isFavorite ? "favorite-active" : ""}
            onClick={onFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove favorite" : "Add favorite"}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}
