// UPCOMING MOVIE DATA ===============
export const UpcomingMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// TOP RATED MOVIE ----------------
export const TopRatedMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// POPULAR MOVIE---------------------
export const PopularMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// NOW PLAYING MOVIE --------------------
export const NowPlayingMovie = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// ALL MOVIE --------------------
export const AllMovie = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&region=US&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&with_original_language=en&vote_count.gte=100&include_adult=false&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const data = await response.json();
    // console.log(`Fetched Movies (Page ${page}):`, data.results);
    return data;
  } catch (error) {
    console.error("Error fetching All Movies:", error);
    return { results: [] };
  }
};

// sesrch movie

export const SearchMovies = async (query) => {
  try {
    let allResults = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&query=${query}&page=${page}&include_adult=false`
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      allResults = [...allResults, ...data.results];
      totalPages = data.total_pages; // Get total pages from API
      page++; // Move to next page
    }

    return { results: allResults };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [] };
  }
};
