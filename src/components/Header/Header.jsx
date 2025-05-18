import "./Header.css";
import netflixlogo from "../../assets/netflix-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu on resize to larger screens
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    }
  };

  return (
    <div className="header-outer-container">
      <div className="header-container">
        <div className="header-left">
          {/* Always visible logo */}
          <img
            src={netflixlogo}
            alt="netflix-logo"
            width="100px"
            className="netflix-logo"
          />

          {/* Nav list */}
          <ul
            className={`header-left-list ${
              showMobileMenu && isMobile ? "mobile-menu-open" : ""
            }`}
          >
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Games</li>
            <li>New & Popular</li>
            {/* <li>Latest</li> */}
            <li>My List</li>
            <li>Browse by Languages</li>
            <li className="browse-language">Browse by language</li>
          </ul>
        </div>

        <div className="header-right">
          <ul>
            <li>
              <SearchIcon />
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li className="dropdown-arrow" onClick={toggleMobileMenu}>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
