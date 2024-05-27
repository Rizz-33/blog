import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";

const GoogleAuth = () => {
  const auth = getAuth(app);
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
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
