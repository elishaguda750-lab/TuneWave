import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (username.trim().length < 3 || password.length < 4) {
      setMessage("Enter a username with at least 3 characters and a password with at least 4 characters.");
      return;
    }
    setMessage("");
    onLogin(username);
  }

  return (
    <main className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>🎵 TuneWave</h1>
        <h2>Welcome Back</h2>
        <p>Login to continue listening</p>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
          autoComplete="username"
          aria-label="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          autoComplete="current-password"
          aria-label="Password"
        />
        <button type="submit">Login</button>
        {message && <p className="login-message" role="alert">{message}</p>}
      </form>
    </main>
  );
}
