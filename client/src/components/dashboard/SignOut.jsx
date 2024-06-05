import { Button } from "flowbite-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Out</h1>
      <Button
        gradientDuoTone="purpleToPink"
        pill
        onClick={handleSignOut}
        className="w-full"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
