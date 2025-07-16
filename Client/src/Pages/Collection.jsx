import { useContext, useEffect, useState } from "react";
import style from "../Styles/Collection.module.css";
import { AppContent } from "../context/AppContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const Collection = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [movies, setMovies] = useState([]);

  const fetchCollection = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/collection/user`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setMovies(data.data);
      }
    } catch (error) {
      console.error("Error loading collection:", error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchCollection();
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className={style.not_logged_in}>
        <h2>Access Denied</h2>
        <p>Please log in to view your collection.</p>
        <Link to="/login" className={style.login_button}>Go to Login</Link>
      </div>
    );
  }
const handleRemove = async (movieId) => {
  try {
    const res = await fetch(`${backendUrl}/api/collection/remove/${movieId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Removed from collection!");
      setMovies((prev) => prev.filter((item) => item.movieId !== movieId));
    } else {
      toast.error("Failed to remove item.");
    }
  } catch (error) {
    console.error("Error removing item:", error.message);
    toast.error("Something went wrong.");
  }
};

  return (
    <div className={style.collection_page}>
      <div className={style.header_section}>
        <div className={style.avatar}>
          <span className={style.initial}>
            {userData?.name ? userData.name[0].toUpperCase() : "?"}
          </span>
        </div>
        <div className={style.user_details}>
          <p className={style.welcome}>Welcome back,</p>
          <h1 className={style.username}>{userData?.name?.toUpperCase() || "USER"}</h1>
          <p className={style.count}>{movies.length} items saved</p>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className={style.empty_state}>
          <h2>No Movies or Series Yet</h2>
          <p>Your collection is empty. Start saving your favorites!</p>
        </div>
      ) : (
        <div className={style.grid_container}>
          {movies.map((item) => (
            <div key={item.movieId} className={style.card}>
              <Link to={`/overview/${item.movieId}`} className={style.image_link}>
                <img
                  className={style.poster}
                  src={`https://image.tmdb.org/t/p/w500${item.poster}`}
                  alt={item.title}
                />
              </Link>
              <div className={style.card_footer}>
                <p className={style.title}>{item.title}</p>
                <button
                  className={style.remove_button}
                  onClick={() => handleRemove(item.movieId)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
