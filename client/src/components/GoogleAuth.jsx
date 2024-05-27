import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";

const GoogleAuth = () => {
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
