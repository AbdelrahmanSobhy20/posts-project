import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./features/home/HomeView.jsx";
import Login from "./features/auth/Login.jsx";
import AddPost from "./features/posts/AddPost.jsx";
import Register from "./features/auth/Register.jsx";
import PageNotFound from "./features/pageNotFound/PangenotFound.jsx";
import ProfileView from "./features/Profile/profileView.jsx";
import { ToastContainer } from "react-toastify";
import MyPosts from "./features/Profile/MyPosts.jsx";
import PostDetails from "./features/posts/PostDetails.jsx";
import Loader from "./features/home/Loader.jsx";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
export default function App() {
  const [authInitializing, setAuthInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setAuthInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  if (authInitializing) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <Navbar />
        <div className="page-container">
          <Loader message="Initializing session..." />
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/MyPosts" element={<MyPosts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}
