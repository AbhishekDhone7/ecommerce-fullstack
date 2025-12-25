import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">Products</Link>
        {user && <Link to="/cart">Cart</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user?.role !== "user" && <Link to="/admin">Admin</Link>}
      </div>
      <div>
        {user ? <button className="btn secondary" onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}
