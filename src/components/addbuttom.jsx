import React from "react";
import { Link } from "react-router-dom";

export default function AddButton({ buttonTitle, onClick, navigationPath }) {
  return (
    <div className="flex justify-center my-4">
      <Link
        to={navigationPath}
        onClick={onClick}
        className="btn btn-primary px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        {buttonTitle}
      </Link>
    </div>
  );
}
