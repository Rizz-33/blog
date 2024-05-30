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
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=settings">
            <Sidebar.Item
              active={tab === "settings"}
              icon={HiCog}
              labelColor="info"
              as="div"
            >
              Settings
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=signout">
            <Sidebar.Item
              active={tab === "signout"}
              icon={HiLogout}
              labelColor="warning"
              as="div"
            >
              Sign Out
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=delete">
            <Sidebar.Item
              active={tab === "delete"}
              icon={HiTrash}
              labelColor="danger"
              as="div"
            >
              Delete My Account
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;
