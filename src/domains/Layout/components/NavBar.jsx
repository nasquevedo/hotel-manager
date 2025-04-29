import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <Link to="/" className="navbar-brand" href="#">Hotel Manager</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/hotels" className="nav-link">Hoteles</Link>
                    </li>
                    <li className="nav-items">
                        <Link to="/rooms" className="nav-link">Habitaciones</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar