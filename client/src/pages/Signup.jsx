import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="email" />
              <TextInput type="email" placeholder="abc@xyz.com" id="email" />
            </div>
            <div>
              <Label value="password" />
              <TextInput type="password" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" pill>
              Sign Up
            </Button>
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
