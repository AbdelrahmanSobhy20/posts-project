import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import InputField from "../../components/InputField";
import { auth } from "../../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    console.log("📩 Submitting login form:", { email, password });

    try {
      console.log("⏳ Signing in...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("✅ Logged in user:", userCredential.user);
      navigate("/");
    } catch (error) {
      console.error("❌ Error logging in:", error.code, error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to your account</p>
        </div>

        <div className="auth-form-group">
          <InputField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">Sign In</button>

        <p className="small">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
