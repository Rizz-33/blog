import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        let errorMessage = "Sign-in failed";

        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }

        dispatch(signInFailure(errorMessage));
        throw new Error(errorMessage);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      setSuccess(data.message);
      window.location.href = "/";
    } catch (error) {
      dispatch(
        signInFailure(
          error.message || "An error occurred. Please try again later."
        )
      );
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-28">
        <div className="flex-1">
          <Link
            to="/"
            className="text-4xl font-extrabold dark:text-white pb-6 pr-12"
          >
            Blog
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-5xl">
              .
            </span>
          </Link>
          <p className="text-sm mt-5">
            Welcome back to Blog.! Sign in with your username and password to
            continue your journey.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              pill
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account? </span>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
