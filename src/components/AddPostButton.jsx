import React from "react";
import "./AddPostButton.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config"; 
import { toast } from "react-toastify";

export default function AddPostButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const user = auth.currentUser;
    console.log("🔍 Current user:", user);

    if (user) {
      console.log("✅ User is logged in:", user.email);
      // toast.success("✅ You are logged in, going to Add Post screen...");
      navigate("/add");
    } else {
      console.log("⚠️ No user logged in");
      toast.error("⚠️ You must log in first!");
      navigate("/login");
    }
  };

  return (
    <button className="addpost-btn" onClick={handleClick}>
      +
    </button>
  );
}
