import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/blogs" className="navbar-logo">
          <span className="logo-text">Blog App</span>
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/blogs" className="navbar-link">
              Blogs
            </Link>
          </li>

          {isAuthenticated() ? (
            <>
              <li className="navbar-item">
                <Link to="/create-blog" className="navbar-link">
                  Create Blog
                </Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user">
                  Welcome, {user?.userName || 'User'}
                </span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link navbar-link-register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
