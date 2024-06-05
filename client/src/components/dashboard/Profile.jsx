import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

    if (!currentUser || !currentUser.id) {
      console.error("Current user ID is undefined");
      alert("Current user ID is undefined");
      return;
    }

    const user = {
      username,
      email,
    };

    if (password) {
      user.password = password;
    }

    dispatch(updateUserStart());

    try {
      const response = await fetch(
        `http://localhost:8000/user/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const result = await response.json();
        dispatch(updateUserSuccess(user));
        console.log(result.message);
        alert("Profile updated successfully");
      } else {
        const errorData = await response.json();
        dispatch(updateUserFailure(errorData.message));
        console.error("Failed to update profile", errorData);
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.toString()));
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <Button
                gradientDuoTone="purpleToPink"
                pill
                className="w-full"
                type="submit"
              >
                Update Profile
              </Button>
            </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
