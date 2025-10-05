import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import defaultAvatar from "../../assets/imagenoone.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      if (currentUser) {
        const docRef = doc(db, "sobhyUsers", currentUser.uid);
        unsubscribeUserDoc = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUser({ uid: currentUser.uid, ...docSnap.data() });
            } else {
              setUser(currentUser);
            }
          },
          () => {
            setUser(currentUser);
          }
        );
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      unsubscribeAuth();
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="accent">Posts</span>
        </Link>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="nav-user"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={user.photoURL || defaultAvatar}
                      alt="user avatar"
                      className="nav-avatar"
                      onError={(e) => {
                        if (e.currentTarget.src !== defaultAvatar) {
                          e.currentTarget.src = defaultAvatar;
                        }
                      }}
                    />
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="btn-login"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
