import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

const GoogleAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        body: JSON.stringify({
          tokenId: resultFromGoogle.user.uid,
          displayName: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoURL: resultFromGoogle.user.photoURL,
          emailVerified: resultFromGoogle.user.emailVerified,
        }),
      });
      const data = await resultFromGoogle.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="purpleToPink"
      pill
      outline
      onClick={handleGoogle}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;
