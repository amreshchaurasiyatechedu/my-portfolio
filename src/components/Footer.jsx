export default function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="wordmark" href="#home" aria-label="Amresh Chaurasiya home">AC<span>.</span></a>
      <p>Designed with curiosity. Built with intention.</p>
      <span>© {new Date().getFullYear()} Amresh Chaurasiya</span>
    </footer>
  );
}
