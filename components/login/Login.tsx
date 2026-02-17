// src/components/login/Login.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react"; // Make sure lucide-react installed

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Password validation: min 8 chars, at least 1 letter and 1 number
  const validatePassword = (pwd: string) => {
    const hasNumber = /\d/.test(pwd);
    const hasLetter = /[a-zA-Z]/.test(pwd);
    return pwd.length >= 8 && hasNumber && hasLetter;
  };

  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(trimmedPassword)) {
      setError(
        "Password must be at least 8 characters, contain letters and numbers"
      );
      return;
    }

    // Flexible login example: just check username & password are valid format
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome back, ${trimmedUsername}!`,
      timer: 2000,
      showConfirmButton: false,
    });
    onLogin(trimmedUsername);
    setUsername("");
    setPassword("");
  };

  // Registration function
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = regUsername.trim();
    const trimmedPassword = regPassword.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(trimmedPassword)) {
      setError(
        "Password must be at least 8 characters, contain letters and numbers"
      );
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `User "${trimmedUsername}" registered!`,
      timer: 2000,
      showConfirmButton: false,
    });

    setRegUsername("");
    setRegPassword("");
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 px-4">
      <form
        onSubmit={showRegister ? handleRegister : handleLogin}
        className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          {showRegister ? "Register" : "Admin Login"}
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {showRegister ? (
          <>
            {/* Registration Form */}
            <input
              type="text"
              placeholder="Username or Email"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="relative mb-6">
              <input
                type={showRegPassword ? "text" : "password"}
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowRegPassword(!showRegPassword)}
              >
                {showRegPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Login Form */}
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all mb-3"
        >
          {showRegister ? "Register" : "Login"}
        </button>

        {/* Toggle Register / Forgot Password */}
        <div className="flex justify-between text-sm text-orange-600">
          <button
            type="button"
            className="hover:underline"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "Back to Login" : "Register"}
          </button>
          {!showRegister && (
            <button
              type="button"
              className="hover:underline"
              onClick={() =>
                Swal.fire("Forgot Password", "Please contact admin!", "info")
              }
            >
              Forgot Password?
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
