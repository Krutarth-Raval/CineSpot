const PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy?endpoint=";

const SeriesSeasonsData = async (seriesId, seasonNumber) => {
  try {
    const endpoint = `/tv/${seriesId}/season/${seasonNumber}`;
    const response = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);

    if (!response.ok) throw new Error("Failed to fetch season data");

    const data = await response.json();
    return data.episodes;
  } catch (error) {
    console.error("Error fetching season data:", error);
    return [];
  }
};

export default SeriesSeasonsData;
