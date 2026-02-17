// src/components/login/Login.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";

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

  const validatePassword = (pwd: string) => {
    const hasNumber = /\d/.test(pwd);
    const hasLetter = /[a-zA-Z]/.test(pwd);
    return pwd.length >= 8 && hasNumber && hasLetter;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, contain letters and numbers"
      );
      return;
    }

    if (username === "admin" && password === "Admin1234") {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${username}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      onLogin(username);
    } else {
      setError("Wrong username or password");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!regUsername || !regPassword) {
      setError("All fields are required");
      return;
    }

    if (!validatePassword(regPassword)) {
      setError(
        "Password must be at least 8 characters, contain letters and numbers"
      );
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `User ${regUsername} registered!`,
      timer: 2000,
      showConfirmButton: false,
    });

    // Clear form after registration
    setRegUsername("");
    setRegPassword("");
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200">
      <form
        onSubmit={showRegister ? handleRegister : handleLogin}
        className="bg-white shadow-xl rounded-2xl p-10 w-96 max-w-full"
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
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all"
        >
          {showRegister ? "Register" : "Login"}
        </button>

        {/* Toggle Register / Forgot Password */}
        <div className="flex justify-between mt-4 text-sm text-orange-600">
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
