import style from '../Styles/About.module.css';

const About = () => {
return (
  <div className={style.about_section}>

    {/* ABOUT CINESPOT */}
    <p className={style.about_title}>ABOUT CINESPOT</p>
    <p className={style.about_description}>
      CineSpot is your trusted platform for exploring movies and TV shows.<br />
      Whether you're looking for trending films, hidden gems, or detailed cast and crew information, CineSpot makes entertainment discovery effortless.
    </p>

    {/* OUR MISSION */}
    <div className={style.about_section_block}>
      <h3 className={style.about_features_title}>OUR MISSION</h3>
      <p className={style.about_description}>
        At CineSpot, our mission is simple — to make movie and TV discovery easy, enjoyable, and accessible to everyone. Whether you're a casual viewer or a true cinephile, we help you stay informed and entertained.
      </p>
    </div>

    {/* WHY CINESPOT */}
    <div className={style.about_section_block}>
      <h3 className={style.about_features_title}>WHY CINESPOT?</h3>
      <ul className={style.about_features_list}>
        <li className={style.about_feature_item}>No clutter, just clean and focused information</li>
        <li className={style.about_feature_item}>Built with performance and user experience in mind</li>
        <li className={style.about_feature_item}>Constant improvements based on user feedback</li>
      </ul>
    </div>

    {/* FEATURES */}
    <div className={style.about_blocks}>
      <div className={style.style_features}>
        <h3 className={style.about_features_title}>FEATURES</h3>
        <ul className={style.about_features_list}>
          <li className={style.about_feature_item}>Extensive movie and TV show database powered by TMDb</li>
          <li className={style.about_feature_item}>Detailed cast, crew, and production information</li>
          <li className={style.about_feature_item}>Fast, intuitive search functionality</li>
          <li className={style.about_feature_item}>Clean, responsive design for seamless browsing</li>
          <li className={style.about_feature_item}><em>Upcoming: AI-powered movie summaries & personal watchlists</em></li>
        </ul>
      </div>

      {/* CONTACT US */}
      <div className={style.style_contactus}>
        <h3 className={style.about_contact_title}>CONTACT US</h3>
        <p className={style.about_description}>
          Suggestions, feedback, or bug reports? Connect with me:
        </p>
        <ul className={style.about_contact_us_list}>
          <li className={style.about_contact_us_item}>
            For inquiries, <a href="mailto:ravalkrutarth95@gmail.com">Click Here</a> to email me.
          </li>
          <li className={style.about_contact_us_item}>
            <a href="https://linkedin.com/in/raval-krutarth" target="_blank" rel="noopener noreferrer">Click Here</a> to view my LinkedIn profile.
          </li>
          <li className={style.about_contact_us_item}>
            <a href="https://github.com/krutarth-raval" target="_blank" rel="noopener noreferrer">Click Here</a> to explore my GitHub projects.
          </li>
        </ul>
      </div>
    </div>

    {/* TECH STACK */}
    <div className={style.about_section_block}>
      <h3 className={style.about_features_title}>TECH STACK</h3>
      <p className={style.about_description}>
        CineSpot is developed using:
      </p>
      <ul className={style.about_features_list}>
        <li className={style.about_feature_item}>React (Frontend Library)</li>
        <li className={style.about_feature_item}>TMDb API (Movie & TV Data)</li>
        <li className={style.about_feature_item}>CSS Modules & Responsive Design</li>
      </ul>
    </div>

    {/* CREDITS */}
    <p className={style.about_info}>
      <em>
        This website uses the TMDb API but is not endorsed or certified by&nbsp;
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDb</a>
      </em>
    </p>
  </div>
);
};

export default About;
