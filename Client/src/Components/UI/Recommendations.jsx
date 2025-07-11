import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../Styles/Recommendations.css";

export const Recommendations = ({ id, type }) => {
  const [recommendations, setRecommendations] = useState([]);
  const scrollRef = useRef(null);
  const cardWidth = 320 + 30;
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id || !type) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }`
        );
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          setRecommendations(data.results.slice(0, 15)); // Show top 15 recommendations
        } else {
          setRecommendations([]); // Fallback for invalid results
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]); // Fallback on error
      }
    };

    fetchRecommendations();
  }, [id, type]);

  // Scroll Left - Moves by one card width
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Scroll Right - Moves by one card width
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">RECOMMENDATIONS</h2>

      <div className="recommendations-controls">
        <button className="scroll-btn" onClick={scrollLeft}>
          <FaAngleLeft />
        </button>
        <button className="scroll-btn" onClick={scrollRight}>
          <FaAngleRight />
        </button>
      </div>

      <div className="recommendations-list" ref={scrollRef}>
        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <NavLink
              key={item.id}
              to={`/${type === "movie" ? "movieoverview" : "seriesoverview"}/${
                item.id
              }`}
              className="recommendation-card"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title || item.name}
              />
            </NavLink>
          ))
        ) : (
          <p className="no-recommendations">No recommendations found.</p>
        )}
      </div>
    </div>
  );
};
