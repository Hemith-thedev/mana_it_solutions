import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const NavigationButton = ({ label, path, subpaths }) => {
  const [isOpen, setIsopen] = useState(false);
  let LABEL = (label) ? label : "Label";
  let PATH = (path) ? path : "/";
  let SUBPATHS = (Array.isArray(subpaths) && subpaths.length > 0) ? subpaths : "";
  return (SUBPATHS.length > 0) ? (
    <div className="navigation-link">
      <div className="dropdown">
        <div className="dropdown-button">
          <NavLink to={PATH}>
            <p>Services</p>
            <ChevronDown />
          </NavLink>
        </div>
      </div>
    </div>
  ) : (
    <div className="navigation-link">
      <div className="link">
        <NavLink to={PATH}>{LABEL}</NavLink>
      </div>
    </div>
  )
}

const NavBar = ({ isOpen, onClick }) => {
  const [isMobile, setIsmobile] = useState(false);
  useEffect(() => {
    function CheckIsMobile() {
      if (window.innerWidth <= 768) {
        setIsmobile(true);
      } else {
        setIsmobile(false);
      }
    }
    CheckIsMobile();
    document.addEventListener("DOMContentLoaded", CheckIsMobile);
    window.addEventListener("resize", CheckIsMobile);
    return () => {
      document.removeEventListener("DOMContentLoaded", CheckIsMobile);
      window.removeEventListener("resize", CheckIsMobile);
    }
  }, []);
  const ServicesSubPaths = [
    {
      label: "Managed Print Services",
      path: "/manages-print-services"
    },
    {
      label: "Annual Maintenance Contract",
      path: "/annual-maintenance-contract"
    },
    {
      label: "Facility Management Services",
      path: "/facility-management-services"
    },
    {
      label: "Document Management Solutions",
      path: "/document-management-solutions"
    },
    {
      label: "Display Solutions",
      path: "/display-solutions"
    },
    {
      label: "Networking",
      path: "/networking"
    },
    {
      label: "CCTV Solution",
      path: "/cctv-solution"
    },
    {
      label: "Video Conferencing Solutions",
      path: "/video-conferencing-solutions"
    },
    {
      label: "IT Services",
      path: "/it-services"
    }
  ];
  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <img src="logo/logo.png" alt="Logo" />
        </div>
        <nav>
          <NavigationButton label="Home" path="/" />
          <NavigationButton label="About" path="/about" />
          <NavigationButton label="Career" path="/career" />
          <NavigationButton label="Services" path="/services" subpaths={ServicesSubPaths} />
          <NavigationButton label="Contact" path="/contact" />
        </nav>
        {isMobile && (
          <div className="hader-toggle">
            <div className="icon" onClick={() => onClick()}>
              {isOpen ? (
                <X />
              ) : (
                <Menu />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
};

export default NavBar;