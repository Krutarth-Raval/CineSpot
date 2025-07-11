import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ListCard } from "../Components/UI/ListCard";
import { Loading } from "./Loading"; // ✅ Import Loader
import styles from "../Styles/Movie.module.css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { SearchMovies } from "../API/MovieData";


const Movie = () => {
  const { AllMovies, currentPage } = useLoaderData();
  const navigate = useNavigate();
  const [page, setPage] = useState(currentPage || 1);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setIsSearching(true);
    setIsLoading(true); // ✅ Start loader
    const data = await SearchMovies(query);
    setSearchResults(data.results || []);
    setNoResults(data.results.length === 0);
    setIsLoading(false); // ✅ Stop loader
  };

  const handlePageChange = (newPage) => {
    if (isSearching) {
      handleSearch(newPage);
    } else {
      setPage(newPage);
      navigate(`/movie?page=${newPage}`);
    }
    window.scrollTo(0, 0); // Scrolls to top when changing pages
  };

  return (
    <>
      {/* SEARCH BAR */}
      <div className={styles.search_container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search Movies..."
            className={styles.search_bar}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit" className={styles.search_btn}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.all_movie_container}>
        {/* SHOW LOADER IF DATA IS LOADING */}
        {isLoading ? (
          <Loading />
        ) : noResults ? (
          <p className={styles.no_results}>No movies found.</p>
        ) : (
          <ul className={styles.movie_list}>
            {(isSearching ? searchResults : AllMovies?.results)?.map(
              (curData) => (
                <li key={curData.id} className={styles.movie_item}>
                  <ListCard curData={curData} />
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      {!isSearching && (
        <div className={styles.pagination}>
          <button
            className={`${styles.page_btn} ${page === 1 ? styles.disabled : ""}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <GrLinkPrevious className={styles.page_icon} />
            Previous Page
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className={styles.page_btn}
          >
            Next Page
            <GrLinkNext className={styles.page_icon} />
          </button>
        </div>
      )}
    </>
  );
};

export default Movie;
