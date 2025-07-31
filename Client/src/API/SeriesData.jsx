const PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy?endpoint=";
const BASE_URL = "/tv";

// ON AIR TV SHOWS
export const UpcomingSeries = async () => {
  try {
    const response = await fetch(`${PROXY}${encodeURIComponent(`${BASE_URL}/on_the_air`)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// AIRING TODAY TV SHOWS
export const NowPlayingSeries = async () => {
  try {
    const response = await fetch(`${PROXY}${encodeURIComponent(`${BASE_URL}/airing_today`)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// TOP RATED TV SHOWS
export const TopRatedSeries = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const endpoint = `/tv/top_rated?language=en-US&sort_by=first_air_date.asc&first_air_date.gte=${today}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// POPULAR TV SHOWS
export const PopularSeries = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const endpoint = `/tv/popular?language=en-US&sort_by=first_air_date.asc&first_air_date.gte=${today}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ALL TV SHOWS
export const AllSeries = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const endpoint = `/discover/tv?language=en-US&region=US&sort_by=first_air_date.desc&first_air_date.lte=${today}&with_original_language=en&vote_count.gte=100&include_adult=false&page=${page}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);
    if (!response.ok) throw new Error("Failed to fetch TV show data");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching All Series:", error);
    return { results: [] };
  }
};

// SEARCH TV SHOWS
export const searchTVShows = async (query) => {
  try {
    let allResults = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const endpoint = `/search/tv?language=en-US&query=${query}&page=${page}&include_adult=false`;
      const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);

      if (!response.ok) throw new Error("Failed to fetch TV shows");

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      totalPages = data.total_pages;
      page++;
    }

    return { results: allResults };
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return { results: [] };
  }
};
