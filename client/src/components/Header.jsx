import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white pb-6 pr-12"
      >
        Blog
        <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-5xl">
          .
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          icon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Item>
              <div className="user-info p-4 text-center">
                <strong className="block text-lg font-semibold">
                  {currentUser.username}
                </strong>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider className="my-2" />
            <Dropdown.Item className="p-4 hover:bg-gray-100">
              <Link
                to="/dashboard?tab=profile"
                className="block text-center text-gray-800"
              >
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="p-4 hover:bg-gray-100">
              <Link to="/settings" className="block text-center text-gray-800">
                Settings
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider className="my-2" />
            <Dropdown.Item className="p-4 hover:bg-gray-100">
              <Link to="/signout" className="block text-center text-red-600">
                Sign Out
              </Link>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="purpleToPink" outline pill>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
