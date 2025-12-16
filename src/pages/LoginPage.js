import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import AuthContext from "../context/AuthContext";
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/auth/login", {
        email,
        password,
      });

      login(data);
      
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your credentials to access your events.</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">Log In</button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/signup" className="link-highlight">Sign Up</Link>
        </p>
        <p className="login-footer">
          <Link to="/" className="link-highlight" style={{fontSize: '0.8rem'}}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;