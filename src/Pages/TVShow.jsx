import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ListCard } from "../Components/UI/ListCard";
import "../Styles/TvShow.css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { searchTVShows } from "../API/SeriesData";
import { NavLink } from "react-router-dom";
// import { NotFound } from "../Components/UI/NotFound";
import { Loading } from "./Loading";

const Series = () => {
  const { AllSeriesData, currentPage } = useLoaderData();
  const navigate = useNavigate();
  const [page, setPage] = useState(currentPage || 1);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [searchPage, setSearchPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setIsSearching(true);
    setIsLoading(true);

    const data = await searchTVShows(query);
    setSearchResults(data.results || []);
    setNoResults(data.results.length === 0);

    setIsLoading(false);
  };

  const handlePageChange = async (newPage) => {
    setIsLoading(true); // Show loader when changing pages
    setPage(newPage);
    navigate(`/tvshow?page=${newPage}`);
    window.scrollTo(0, 0);
    setIsLoading(false);
  };

  return (
    <>
      {/* SEARCH BAR & BUTTON */}
      <div className="search-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search TV Shows..."
            className="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required={true}
          />
          <NavLink to="/tvshow" target="_blank">
            <button type="submit" className="search-btn">
              Search
            </button>
          </NavLink>
        </form>
      </div>

      <div className="all-series-container">
        {isLoading ? (
          <Loading />
        ) : noResults ? (
          <p className="no-results">No TV shows found.</p>
        ) : (
          <ul className="series-list">
            {(isSearching ? searchResults : AllSeriesData?.results)?.map(
              (curData, index) => (
                <li key={`${curData.id}-${index}`} className="series-item">
                  <ListCard curData={curData} />
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      {!noResults && !isSearching && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            style={{
              opacity: page === 1 ? 0.5 : 1,
              cursor: page === 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => handlePageChange(page - 1)}
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

export default Series;
