import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>Page Not Found</p>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    color: "#1e293b",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#6366f1",
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "0.3rem",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#64748b",
  },
};
