const PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy?endpoint=";
const BASE_URL = "/movie";

// UPCOMING MOVIE DATA ===============
export const UpcomingMovie = async () => {
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/upcoming`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// TOP RATED MOVIE ----------------
export const TopRatedMovie = async () => {
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/top_rated`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// POPULAR MOVIE---------------------
export const PopularMovie = async () => {
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/popular`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// NOW PLAYING MOVIE --------------------
export const NowPlayingMovie = async () => {
  try {
    const response = await fetch(`${PROXY}${BASE_URL}/now_playing`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ALL MOVIE --------------------
export const AllMovie = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const endpoint = `/discover/movie?language=en-US&region=US&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&with_original_language=en&vote_count.gte=100&include_adult=false&page=${page}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);
    if (!response.ok) throw new Error("Failed to fetch movie data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching All Movies:", error);
    return { results: [] };
  }
};

// SEARCH MOVIE --------------------
export const SearchMovies = async (query) => {
  try {
    let allResults = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const endpoint = `/search/movie?language=en-US&query=${query}&page=${page}&include_adult=false`;
      const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      totalPages = data.total_pages;
      page++;
    }

    return { results: allResults };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [] };
  }
};
