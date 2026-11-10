import SongCard from "./SongCard.jsx";

const genres = ["All", "Pop", "Rock", "Chill", "Hip Hop"];

export default function MusicSection({
  songs,
  selectedGenre,
  onGenreChange,
  onPlay,
  favorites,
  onFavorite,
}) {
  return (
    <section id="musicSection" className="music-section">
      <h2>Popular Songs</h2>
      <div className="genres" aria-label="Filter by genre">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? "genre-active" : ""}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="songs">
        {songs.length ? (
          songs.map((song) => (
            <SongCard
              key={song.title}
              song={song}
              isFavorite={favorites.includes(song.title)}
              onPlay={() => onPlay(song.originalIndex ?? getSongIndex(song.title))}
              onFavorite={() => onFavorite(song)}
            />
          ))
        ) : (
          <p className="empty-state">No songs found. Try another search or genre.</p>
        )}
      </div>
    </section>
  );
}

import { songs as allSongs } from "./songData.js";
function getSongIndex(title) {
  return allSongs.findIndex((song) => song.title === title);
}
