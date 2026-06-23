import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, LayoutDashboard, LogOut, Moon, Sparkles, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ darkMode, onToggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark"><Sparkles size={18} /></span>
        <span>AI DSA Lab</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {user && (
          <NavLink to="/dashboard">
            <LayoutDashboard size={17} /> Dashboard
          </NavLink>
        )}
      </nav>
      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Toggle theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {user ? (
          <button className="ghost-button" type="button" onClick={handleLogout}>
            <LogOut size={17} /> Logout
          </button>
        ) : (
          <>
            <Link className="ghost-button" to="/login">Login</Link>
            <Link className="primary-button" to="/signup">
              <BookOpen size={17} /> Start Learning
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
