export default function Navbar({ username, searchText, onSearchChange, onLogout }) {
  return (
    <nav className="navbar">
      <h2>🎵 TuneWave</h2>
      <input
        type="search"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search songs..."
        aria-label="Search songs"
      />
      <span className="user-name">Hi, {username}</span>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
