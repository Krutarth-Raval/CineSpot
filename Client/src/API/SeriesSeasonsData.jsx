const SeriesSeasonsData = async (seriesId, seasonNumber) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    // console.log(data);
    return data.episodes; // Array of episodes
  } catch (error) {
    console.error("Error fetching season data:", error);
    return [];
  }
};

export default SeriesSeasonsData;
