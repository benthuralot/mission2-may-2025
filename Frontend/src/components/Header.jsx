import "../App.css";

export default function Header() {
  return (
    <header className="header">
      <img
        src="https://content.tgstatic.co.nz/webassets/contentassets/3e15c8546917474ca0a150b18e9fd64e/turnerscars_logo_1line_horz_true-rgb-desktop.png"
        alt="Turners Logo"
        className="logo"
      />
      <nav>
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
