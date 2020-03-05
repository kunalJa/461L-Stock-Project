import React from "react"
import { Link } from "gatsby"

const Navbar = () => (
  <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/stockpage">
          Top 500 Stocks
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/newslanding">
          News
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/industrylanding">
          Industry Info
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/aboutpage">
          About Us
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
