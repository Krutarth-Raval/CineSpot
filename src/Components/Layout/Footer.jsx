import { NavLink } from "react-router-dom";
import "../../Styles/Footer.css";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo-container">
        <p className="footer-logo-text">CINESPOT</p>
      </div>
      <div className="link-container">
        <div className="quick-links">
          <p className="quick-links-title">Quick Links</p>
          <ul className="quick-links-list">
            <li>
              <NavLink className="links" to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink className="links" to="/movie">
                MOVIE
              </NavLink>
            </li>
            <li>
              <NavLink className="links" to="/tvshow">
                TV SHOW
              </NavLink>
            </li>
            <li>
              <NavLink className="links" to="collection">
                {" "}
                COLLECTION
              </NavLink>
            </li>
            <li>
              <NavLink className="links" to="about">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="social-links">
          <p className="social-links-title">Social Links</p>
          <ul className="social-links-list">
            <li>
              <NavLink
                to="https://www.facebook.com/share/1HAV9Ytj6V/?mibextid=qi2Omg "
                className="links"
                target="_blank"
              >
                <FaFacebookSquare className="link-icon" />
                FACEBOOK
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.instagram.com/raval_krutarth?igsh=aHMzeDk3cm55cXht "
                className="links"
                target="_blank"
              >
                <FaInstagramSquare className="link-icon" />
                INSTAGRAM
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://x.com/_krutarth_raval?t=wBw3fjx4nzTOmna6nl-ayg&s=08"
                className="links"
                target="_blank"
              >
                <BsTwitterX className="link-icon" /> X
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/raval-krutarth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                className="links"
                target="_blank"
              >
                <FaLinkedin className="link-icon" />
                LINKEDIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <p className="site-rights">
        Copyright © 2024. All Rights Reserved By{" "}
        <a href="/" target="_blank" rel="noopener noreferrer">
          CineSpot
        </a>
      </p>
    </div>
  );
};

export default Footer;
