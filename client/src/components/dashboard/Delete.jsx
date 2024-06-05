import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";

const DeleteProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleDeleteAccount = async () => {
    if (!currentUser || !currentUser.id) {
      alert("Current user ID is undefined");
      return;
    }

    dispatch(deleteUserStart());

    try {
      const response = await fetch(
        `http://localhost:8000/user/${currentUser.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(deleteUserSuccess());
        alert("Account deleted successfully");
        // Redirect to a different page or handle post-deletion logic here
      } else {
        const errorData = await response.json();
        dispatch(deleteUserFailure(errorData.message));
        alert(`Failed to delete account: ${errorData.message}`);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.toString()));
      alert("An error occurred while deleting account");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Delete My Account</h1>
      <div className="min-h-screen flex flex-col items-center py-8">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete My Account"}
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default DeleteProfile;
