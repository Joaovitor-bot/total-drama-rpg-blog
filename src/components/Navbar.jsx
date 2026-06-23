import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <div className="brand-icon">TD</div>

        <div>
          <strong>Drama Total RPG</strong>
          <span>1ª Temporada</span>
        </div>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/participantes">Participantes</NavLink>
        <NavLink to="/eliminados">Eliminados</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;