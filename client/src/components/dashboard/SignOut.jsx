import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signOut());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Signing Out...</h1>
    </div>
  );
};

export default SignOut;
