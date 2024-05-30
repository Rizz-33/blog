import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
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
    <div className="max-w-lg mx-auto p-3 w-full">
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
          <form className="flex flex-col items-center">
            <div className="w-42 h-42 cursor-pointer mb-4">
              <img
                onClick={() => filePick.current.click()}
                alt="user"
                className="rounded-full w-36 h-36 border-8 object-cover border-lightgray hover:border-blue-500 transition-all duration-300"
                src={imageURL || placeholderImageURL}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentUser?.name}
            </h2>
            <h3 className="text-lg font-medium text-gray-600">
              @{currentUser?.username}
            </h3>
            <p className="text-gray-600">{currentUser?.email}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
