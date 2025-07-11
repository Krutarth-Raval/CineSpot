import { NavLink } from "react-router-dom";
import styles from "../../Styles/Footer.module.css";
import { FaFacebookF , FaPinterestP , FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        
        <div className={styles.footer_logo_container}>
          <p className={styles.footer_logo_text}>CINESPOT</p>
          <p className={styles.tagline}>Your Movie & TV Show Hub</p>
        </div>

        <div className={styles.link_container}>
          <NavLink className={styles.link} to="/">Home</NavLink>
          <NavLink className={styles.link} to="/movie">Movies</NavLink>
          <NavLink className={styles.link} to="/tvshow">TV Shows</NavLink>
          <NavLink className={styles.link} to="/news">News</NavLink>
          <NavLink className={styles.link} to="/collection">Collection</NavLink>
          <NavLink className={styles.link} to="/about">About</NavLink>
        </div>

        <div className={styles.social_container}>
          <a href="https://www.facebook.com/share/1HAV9Ytj6V/?mibextid=qi2Omg" className={`${styles.social_icon} ${styles.facebook}`} target="_blank" rel="noopener noreferrer"><FaFacebookF  /></a>
          <a href="https://www.instagram.com/raval_krutarth?igsh=aHMzeDk3cm55cXht" className={`${styles.social_icon} ${styles.instagram}`} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://x.com/_krutarth_raval?t=wBw3fjx4nzTOmna6nl-ayg&s=08" className={`${styles.social_icon} ${styles.twitter}`} target="_blank" rel="noopener noreferrer"><BsTwitterX /></a>
          <a href="https://in.pinterest.com/krutarth_raval/" className={`${ styles.social_icon_pinterest} ${styles.pinterest}`} target="_blank" rel="noopener noreferrer"><FaPinterestP  /></a>
        </div>

      </div>

      <div className={styles.footer_bottom}>
        <p>&copy; {new Date().getFullYear()} <a href="/" target="_blank" rel="noopener noreferrer">CineSpot</a>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
