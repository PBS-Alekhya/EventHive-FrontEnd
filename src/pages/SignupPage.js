import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './SignupPage.css'; 

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/auth/signup", {
        name,
        email,
        password,
      });
      
      alert("Signup Successful! Please login.");
      navigate("/login"); 
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Signup Failed"));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Join EventHive</h2>
        <p className="signup-subtitle">Start organizing memorable events today.</p>
        
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="Tony Stark"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-signup-submit">Create Account</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login" className="link-highlight">Login here</Link>
        </p>
        <p className="signup-footer">
          <Link to="/" className="link-highlight" style={{fontSize: '0.8rem', color: '#ccc'}}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;