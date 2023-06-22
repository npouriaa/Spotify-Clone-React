import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { SpotifyLogo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleSidebarState }) => {
  const handleClick = () => {
    handleSidebarState();
  };
  return (
    <div>
      {links.map((item) => (
        <NavLink
          onClick={() => handleClick()}
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-[#1FDF64]"
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateSidebarState = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className=" md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#121212]">
        <img
          className="w-full h-16 object-contain"
          src={SpotifyLogo}
          alt="logo"
        />
        <NavLinks />
      </div>
      <div className="absolute mt-20 md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2"
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3  backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          className="w-full h-20 object-contain"
          src={SpotifyLogo}
          alt="logo"
        />
        <NavLinks handleSidebarState={updateSidebarState} />
      </div>
    </>
  );
};

export default Sidebar;
