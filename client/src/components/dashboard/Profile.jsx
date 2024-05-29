import { Avatar } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="min-h-screen flex flex-col items-center py-8">
        <div className="flex flex-col">
          <form className="flex flex-col items-center">
            <div className="w-42 h-42 cursor-pointer mb-4">
              <Avatar
                alt="user"
                rounded
                size="xl"
                className="rounded-full w-42 h-42 border-8 object-cover border-lightgray hover:border-blue-500 transition-all duration-300"
                src={currentUser?.avatarUrl || "default-avatar.png"}
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
