import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeleteProfile from "../components/dashboard/Delete";
import Profile from "../components/dashboard/Profile";
import Sidebar from "../components/dashboard/Sidebar";
import SignOut from "../components/dashboard/Signout";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <Sidebar />
      </div>
      {tab === "profile" && <Profile />}
      {tab === "delete" && <DeleteProfile />}
      {tab === "signout" && <SignOut />}
    </div>
  );
};

export default Dashboard;
