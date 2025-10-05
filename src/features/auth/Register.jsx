import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebase/config.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InputField from "../../components/InputField.jsx";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    if (password !== confirm) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let uploadedPhotoURL = "";
      if (photoFile) {
        const fileRef = ref(
          storage,
          `avatars/${user.uid}-${Date.now()}-${photoFile.name}`
        );
        await uploadBytes(fileRef, photoFile);
        uploadedPhotoURL = await getDownloadURL(fileRef);
      }

      await setDoc(doc(db, "sobhyUsers", user.uid), {
        name: name.trim(),
        email: user.email,
        bio: bio.trim() || "New user on our platform",
        photoURL: uploadedPhotoURL || "",
        phone: phone.trim() || "",
        location: location.trim() || "",
        createdAt: serverTimestamp(),
      });

      navigate("/profile");
    } catch (error) {
      console.error("❌ Error registering:", error.code, error.message);
      alert(error.message);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us and start your journey today</p>
        </div>

        <div className="auth-form-group">
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Create Account
        </button>

        <p className="small">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
