import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Sign-up failed");
      }
      const data = await res.json();
      setSuccess(data.message);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
            Welcome to Blog., your go-to platform for sharing ideas and stories.
            Sign up quickly with your username, email, and password. Create your
            blog, connect with readers and writers, and explore diverse topics.
            Join us today and start your journey of creative expression!
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
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="abc@xyz.com"
                id="email"
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
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <GoogleAuth />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account? </span>
            <Link
              to="/signin"
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
