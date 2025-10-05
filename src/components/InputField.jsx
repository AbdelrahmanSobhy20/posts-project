import React from "react";

export default function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="input input-bordered w-full max-w-md rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
