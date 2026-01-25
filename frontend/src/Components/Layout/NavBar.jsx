import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const NavigationButton = ({ label, path, subpaths }) => {
  const ref = useRef(null);
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
  let LABEL = (label) ? label : "Label";
  let PATH = (path) ? path : "/";
  let SUBPATHS = (Array.isArray(subpaths) && subpaths.length > 0) ? subpaths : "";
  let activeSubroute = Array.isArray(SUBPATHS) && SUBPATHS.find((subpath) => subpath.path === window.location.pathname);
  const [isOpen, setIsopen] = useState(PATH === window.location.pathname);
  // if the user not clicks on the toggle button or menu, then close the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsopen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  })
  return (SUBPATHS.length > 0) ? (
    <div className="navigation-link">
      <div className="dropdown relative flex flex-col justify-start items-center">
        <div ref={ref} className={`dropdown-button flex justify-center items-center gap-[0.25rem] ${isMobile ? "p-2 rounded-2xl text-2xl" : "p-2 rounded-md text-xl"} bg-blue-400/0 h-fit w-full ${(isOpen || PATH == window.location.pathname) ? "bg-blue-400/100 opacity-100" : "bg-blue-400/0 opacity-50"} ${isMobile ? "p-2 rounded-2xl text-2xl" : "p-2 rounded-md text-xl"}`}>
          <NavLink to={PATH} onClick={() => setIsopen(false)} className={`flex justify-center items-center rounded-xl`}>
            <p className={`${isMobile ? "text-2xl" : "text-xl"} text-white text-nowrap`}>
              {"Services " + (activeSubroute ? `(${activeSubroute.shortlabel})` : "")}
            </p>
          </NavLink>
          <div className="icon" onClick={() => setIsopen(prev => !prev)} style={{
            transform: `rotate(${isMobile ? "180deg" : "0deg"})`
          }}>
            <ChevronDown className={`transform translate-y-[0.1rem] ${isMobile ? "size-[2rem]" : "size-[2rem]"} text-white`} strokeWidth={2.5} />
          </div>
        </div>
        {isOpen && <ul className={`dropdown-menu ${isMobile ? "flex flex-col relative p-5 gap-[0.5rem]" : "absolute top-[4.2rem] max-h-64 p-3 rounded-xl bg-gray-900 overflow-auto no-scrollbar"}`} data-lenis-prevent>
          {
            Array.isArray(SUBPATHS) && SUBPATHS.map((subpath, index) => (
              <NavigationButton key={index} label={subpath.label} path={subpath.path} />
            ))
          }
        </ul>}
      </div>
    </div>
  ) : (
    <div className={`navigation-link flex justify-center items-center h-fit w-full`}>
      <div className={`link flex justify-center items-center h-fit w-full`}>
        <NavLink
          className={`navigation-link ${isMobile ? "p-2 rounded-2xl text-2xl" : "p-2 rounded-md text-xl"} bg-blue-400/0 h-fit w-full text-center hover:bg-blue-400/100 ${(PATH === window.location.pathname) ? "bg-blue-400/100 text-white opacity-100" : "bg-blue-400/0 text-white opacity-50"}`}
          to={PATH}
        >{LABEL}</NavLink>
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
      path: "/manages-print-services",
      shortlabel: "MPS"
    },
    {
      label: "Annual Maintenance Contract",
      path: "/annual-maintenance-contract",
      shortlabel: "AMC"
    },
    {
      label: "Facility Management Services",
      path: "/facility-management-services",
      shortlabel: "FMS"
    },
    {
      label: "Document Management Solutions",
      path: "/document-management-solutions",
      shortlabel: "DMS"
    },
    {
      label: "Display Solutions",
      path: "/display-solutions",
      shortlabel: "DS"
    },
    {
      label: "Networking",
      path: "/networking",
      shortlabel: "N"
    },
    {
      label: "CCTV Solution",
      path: "/cctv-solution",
      shortlabel: "CCTV"
    },
    {
      label: "Video Conferencing Solutions",
      path: "/video-conferencing-solutions",
      shortlabel: "VCS"
    },
    {
      label: "IT Services",
      path: "/it-services",
      shortlabel: "ITS"
    }
  ];
  return (
    <header className={`${isOpen ? "opened" : ""} sticky top-0 flex flex-col justify-start items-center ${isOpen ? "h-screen" : "h-fit"} w-full backdrop-blur-md`}>
      <div className="header-wrapper flex justify-between items-center h-fit w-full p-[1rem]">
        <div className={`logo ${(isMobile) ? "h-[15vw]" : "h-[5vw]"}`}>
          <img className="h-full w-full object-cover" src="logo/logo.png" alt="Logo" />
        </div>
        {(!isMobile) && <nav className="flex justify-center items-center px-3 py-2 rounded-xl bg-gray-900">
          <NavigationButton label="Home" path="/" />
          <NavigationButton label="About" path="/about" />
          <NavigationButton label="Career" path="/career" />
          <NavigationButton label="Services" path="/services" subpaths={ServicesSubPaths} />
          <NavigationButton label="Contact" path="/contact" />
        </nav>}
        {isMobile && (
          <div className="hEader-toggle">
            <div className={`flex justify-center items-center bg-blue-500 h-[13vw] w-[13vw] p-1 rounded-lg`} onClick={() => onClick()}>
              {isOpen ? (
                <X className="h-full w-full object-cover" />
              ) : (
                <Menu className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        )}
      </div>
      {(isMobile && isOpen) && <div className={`header-menu flex flex-col justify-start items-center p-[2rem] w-full ${isOpen ? "h-full overflow-auto pb-[20rem]" : ""}`}>
        <nav className="flex flex-col justify-start items-center gap-[1rem] h-fit w-full">
          <NavigationButton label="Home" path="/" />
          <NavigationButton label="About" path="/about" />
          <NavigationButton label="Career" path="/career" />
          <NavigationButton label="Services" path="/services" subpaths={ServicesSubPaths} />
          <NavigationButton label="Contact" path="/contact" />
        </nav>
      </div>}
    </header>
  )
};

export default NavBar;