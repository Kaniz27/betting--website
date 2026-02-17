import React, { useState } from "react";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

type Mode = "login" | "register" | "forgot";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (mode === "register") {
      if (!form.username || !form.email || !form.password || !form.confirmPassword) {
        return "All fields are required";
      }
      if (form.password.length < 8) {
        return "Password must be at least 8 characters";
      }
      if (form.password !== form.confirmPassword) {
        return "Passwords do not match";
      }
    }

    if (mode === "login") {
      if (!form.username || !form.password) {
        return "All fields are required";
      }
      if (form.password.length < 8) {
        return "Password must be at least 8 characters";
      }
    }

    if (mode === "forgot") {
      if (!form.email) {
        return "Email is required";
      }
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (mode === "register") {
      Swal.fire("Success 🎉", "Registration Successful!", "success");
      setMode("login");
    }

    if (mode === "forgot") {
      Swal.fire("Email Sent 📩", "Password reset link sent to your email.", "success");
      setMode("login");
    }

    if (mode === "login") {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "https://betting-website-chi.vercel.app";
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-200"
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-2">
          {mode === "login" && "Admin Login"}
          {mode === "register" && "Register"}
          {mode === "forgot" && "Forgot Password"}
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {mode === "register" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
            />
          </>
        )}

        {mode === "login" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="input"
          />
        )}

        {mode !== "forgot" && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input pr-10"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-orange-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        )}

        {mode === "register" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="input"
          />
        )}

        {mode === "forgot" && (
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="input"
          />
        )}

        <button className="w-full bg-orange-500 text-white py-3 rounded-lg mt-4 hover:bg-orange-600 transition">
          {mode === "login" && "Login"}
          {mode === "register" && "Register"}
          {mode === "forgot" && "Send Reset Link"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          {mode === "login" && (
            <>
              <p
                className="cursor-pointer text-orange-500"
                onClick={() => setMode("forgot")}
              >
                Forgot Password?
              </p>
              <p>
                Don’t have an account?{" "}
                <span
                  className="text-orange-500 cursor-pointer"
                  onClick={() => setMode("register")}
                >
                  Register
                </span>
              </p>
            </>
          )}

          {mode !== "login" && (
            <p>
              Already have an account?{" "}
              <span
                className="text-orange-500 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </form>

      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            margin-bottom: 16px;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            ring: 2px solid orange;
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage;
