const SeasonsData = async (seriesId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const seriesData = await response.json();
    // console.log(seriesData);
    return seriesData.seasons;
  } catch (error) {
    console.error("Error fetching series data:", error);
    return [];
  }
};

export default SeasonsData;
