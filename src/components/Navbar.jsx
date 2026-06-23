import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container">
        <NavLink to="/" className="brand" aria-label="Página inicial">
          <span className="brand-mark">TD</span>
          <span>
            <strong>Total Drama RPG</strong>
            <small>Season 1</small>
          </span>
        </NavLink>

        <div className="nav-links" aria-label="Navegação principal">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/participantes">Participantes</NavLink>
          <NavLink to="/eliminados">Eliminados</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
