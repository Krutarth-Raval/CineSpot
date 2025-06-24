import { NavLink } from "react-router-dom";
import styles from "../../Styles/Footer.module.css";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_logo_container}>
        <p className={styles.footer_logo_text}>CINESPOT</p>
      </div>
      <div className={styles.link_container}>
        <div className={styles.quick_links}>
          <p className={styles.quick_links_title}>Quick Links</p>
          <ul className={styles.quick_links_list}>
            <li>
              <NavLink className={styles.links} to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.links} to="/movie">
                MOVIE
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.links} to="/tvshow">
                TV SHOW
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.links} to="collection">
                {" "}
                COLLECTION
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.links} to="about">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.social_links}>
          <p className={styles.social_links_title}>Social Links</p>
          <ul className={styles.social_links_list}>
            <li>
              <NavLink
                to="https://www.facebook.com/share/1HAV9Ytj6V/?mibextid=qi2Omg "
                className={styles.links}
                target="_blank"
              >
                <FaFacebookSquare className={styles.link_icon} />
                FACEBOOK
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.instagram.com/raval_krutarth?igsh=aHMzeDk3cm55cXht "
                className={styles.links}
                target="_blank"
              >
                <FaInstagramSquare className={styles.link_icon} />
                INSTAGRAM
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://x.com/_krutarth_raval?t=wBw3fjx4nzTOmna6nl-ayg&s=08"
                className={styles.links}
                target="_blank"
              >
                <BsTwitterX className={styles.link_icon }/> X
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/raval-krutarth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
                className={styles.links}
                target="_blank"
              >
                <FaLinkedin className={styles.link_icon }/>
                LINKEDIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.site_rights}>
        Copyright © 2025. All Rights Reserved By{" "}
         <a href="/" target="_blank" rel="noopener noreferrer">
           CineSpot
        </a>
      </p>
    </div>
  );
};

export default Footer;
