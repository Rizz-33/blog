import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const FooterSec = () => {
  return (
    <Footer container className="border border-t-8 border-purple-500">
      <div className="">
        <div>
          <div>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-xl sm:text-2xl font-bold dark:text-white pb-6 pr-12"
            >
              Blog
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-5xl">
                .
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4 sm:gap-6">
            <div className="pt-5">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link to="/about">Overview</Footer.Link>
                <Footer.Link to="/projects">Projects</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="pt-5">
              <Footer.Title title="Projects" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/stars/Rizz-33/lists/react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/stars/Rizz-33/lists/go"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Golang
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/stars/Rizz-33/lists/tailwind-css"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="pt-5">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Rizz-33"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/risini-amarathunga-5b64901b2/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="pt-5">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms of Use</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSec;
