import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Contact Turners: support@turners.co.nz | +64 9 123 4567</p>
      <div className="social-links">
        <a
          href="http://www.facebook.com/turnersNZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        |
        <a
          href="https://www.instagram.com/turners_cars"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
