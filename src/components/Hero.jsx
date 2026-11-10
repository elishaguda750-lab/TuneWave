export default function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">YOUR MUSIC, YOUR MOOD</p>
        <h1>Listen to your <span>favorite music.</span></h1>
        <p>Discover songs and enjoy your favorite music.</p>
        <button onClick={onExplore}>Explore Music</button>
      </div>
      <div className="music-icon" aria-hidden="true">🎧</div>
    </section>
  );
}
