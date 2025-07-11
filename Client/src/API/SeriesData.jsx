// ONE AIR TV SHOWS
export const UpcomingSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// AIRING TODAY TV SHOWS
export const NowPlayingSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// TOP RATED TV SHOWS
export const TopRatedSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&sort_by=first_air_date.asc&first_air_date.gte=${
        new Date().toISOString().split("T")[0]
      }`
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// POPULAR TV SHOWS
export const PopularSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&sort_by=first_air_date.asc&first_air_date.gte=${
        new Date().toISOString().split("T")[0]
      }`
    );
    const data = response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
//  ALL TV SHOWS

export const AllSeries = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&region=US&sort_by=first_air_date.desc&first_air_date.lte=${today}&with_original_language=en&vote_count.gte=100&include_adult=false&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch TV show data");
    }

    const data = await response.json();
    // console.log(`Fetched Series (Page ${page}):`, data.results);
    return data;
  } catch (error) {
    console.error("Error fetching All Series:", error);
    return { results: [] };
  }
};

// search series

export const searchTVShows = async (query) => {
  try {
    let allResults = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&query=${query}&page=${page}&include_adult=false`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch TV shows");
      }

      const data = await response.json();
      allResults = [...allResults, ...data.results]; // Merge results
      totalPages = data.total_pages; // Get total pages from API response
      page++; // Increment to fetch next page
    }

    return { results: allResults };
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return { results: [] };
  }
};
