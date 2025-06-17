import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ListCard } from "../Components/UI/ListCard";
import { Loading } from "./Loading"; // ✅ Import Loader
import "../Styles/Movie.css";
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
      <div className="search-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search Movies..."
            className="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      <div className="all-movie-container">
        {/* SHOW LOADER IF DATA IS LOADING */}
        {isLoading ? (
          <Loading />
        ) : noResults ? (
          <p className="no-results">No movies found.</p>
        ) : (
          <ul className="movie-list">
            {(isSearching ? searchResults : AllMovies?.results)?.map(
              (curData) => (
                <li key={curData.id} className="movie-item">
                  <ListCard curData={curData} />
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      {!isSearching && (
        <div className="pagination">
          <button
            className={`page-btn ${page === 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <GrLinkPrevious className="page-icon" />
            Previous Page
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="page-btn"
          >
            Next Page
            <GrLinkNext className="page-icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default Movie;
