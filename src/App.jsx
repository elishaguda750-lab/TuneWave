import { useEffect, useMemo, useRef, useState } from "react";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MusicSection from "./components/MusicSection.jsx";
import Player from "./components/Player.jsx";
import { songs } from "./components/songData.js";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [searchText, setSearchText] = useState("");
  const [genre, setGenre] = useState("All");
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => playSong((currentSongIndex + 1) % songs.length);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", onEnded);
    };
  // Audio is created once; the ended handler is refreshed separately below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSongs = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return songs.filter((song) => {
      const matchesGenre = genre === "All" || song.genre === genre;
      const matchesSearch =
        !query ||
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query);
      return matchesGenre && matchesSearch;
    });
  }, [searchText, genre]);

  function handleLogin(name) {
    const cleanName = name.trim();
    setUsername(cleanName);
    localStorage.setItem("username", cleanName);
  }

  function logout() {
    audioRef.current?.pause();
    setIsPlaying(false);
    setUsername("");
    localStorage.removeItem("username");
  }

  async function playSong(index) {
    const audio = audioRef.current;
    if (!audio) return;
    const song = songs[index];
    if (!song) return;

    if (currentSongIndex !== index) {
      audio.src = song.audio;
      setCurrentSongIndex(index);
      setProgress(0);
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      console.error("Unable to play this audio file:", error);
    }
  }

  async function togglePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentSongIndex === -1) {
      await playSong(0);
    } else if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to resume audio:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function nextSong() {
    playSong(currentSongIndex < 0 ? 0 : (currentSongIndex + 1) % songs.length);
  }

  function previousSong() {
    playSong(currentSongIndex <= 0 ? songs.length - 1 : currentSongIndex - 1);
  }

  function toggleFavorite(song) {
    setFavorites((previous) => {
      const next = previous.includes(song.title)
        ? previous.filter((title) => title !== song.title)
        : [...previous, song.title];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  }

  function seekTo(value) {
    const audio = audioRef.current;
    if (audio?.duration) {
      audio.currentTime = (Number(value) / 100) * audio.duration;
      setProgress(Number(value));
    }
  }

  const currentSong = currentSongIndex >= 0 ? songs[currentSongIndex] : null;

  if (!username) return <Login onLogin={handleLogin} />;

  return (
    <div className="app-shell">
      <Navbar
        username={username}
        searchText={searchText}
        onSearchChange={setSearchText}
        onLogout={logout}
      />
      <Hero onExplore={() => document.getElementById("musicSection")?.scrollIntoView({ behavior: "smooth" })} />
      <MusicSection
        songs={filteredSongs}
        selectedGenre={genre}
        onGenreChange={setGenre}
        onPlay={playSong}
        favorites={favorites}
        onFavorite={toggleFavorite}
      />
      <Player
        song={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        onPrevious={previousSong}
        onToggle={togglePlayPause}
        onNext={nextSong}
        onSeek={seekTo}
      />
    </div>
  );
}
