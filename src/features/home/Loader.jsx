import React from "react";
import "./Loader.css";

export default function Loader({ message = "Loading posts..." }) {
  return (
    <div className="loader-wrapper" role="status" aria-live="polite">
      <div className="spinner">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
      <p className="loader-text">{message}</p>
    </div>
  );
}
