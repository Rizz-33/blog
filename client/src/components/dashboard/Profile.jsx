import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const filePick = useRef();

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL);
      localStorage.setItem("userAvatar", objectURL);
    } else {
      console.error("The selected file is not an image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      id: currentUser._id,
      username,
      password,
      email,
    };

    try {
      const response = await fetch("/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating profile");
    }
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setImageURL(storedAvatar);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const placeholderImageURL = "https://www.w3schools.com/howto/img_avatar.png";

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      <div className="min-h-screen flex flex-col items-center py-8">
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageInput}
            ref={filePick}
            hidden
          />
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="w-42 h-42 cursor-pointer mb-4">
              <img
                onClick={() => filePick.current.click()}
                alt="user"
                className="rounded-full w-36 h-36 border-4 border-lightgray hover:border-purple-500 transition-all duration-300"
                src={imageURL || placeholderImageURL}
              />
            </div>
            <div className="mb-4 w-full max-w-md">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="border border-gray-400 mb-2 p-2 rounded-lg focus:outline-none focus:border-purple-500 w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="mb-4 w-full max-w-md">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border border-gray-400 mb-2 p-2 rounded-lg focus:outline-none focus:border-purple-500 w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="mb-4 w-full max-w-md">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border border-gray-400 mb-2 p-2 rounded-lg focus:outline-none focus:border-purple-500 w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div className="mt-4 w-full max-w-md">
              <Button gradientDuoTone="purpleToPink" pill className="w-full">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
