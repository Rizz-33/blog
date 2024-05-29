import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiCog, HiLogout, HiTrash, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const CustomSidebar = () => {
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
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            active={tab === "settings"}
            icon={HiCog}
            labelColor="info"
          >
            Settings
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === "signout"}
            icon={HiLogout}
            labelColor="warning"
          >
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === "delete"}
            icon={HiTrash}
            labelColor="danger"
          >
            Delete My Account
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
