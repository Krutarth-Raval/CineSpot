const BACKEND_PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy";

const SeasonsData = async (seriesId) => {
  try {
    const endpoint = `/tv/${seriesId}`; // `api_key` is added on backend
    const response = await fetch(`${BACKEND_PROXY}?endpoint=${encodeURIComponent(endpoint)}`);

    if (!response.ok) throw new Error("Failed to fetch series data");

    const seriesData = await response.json();
    return seriesData.seasons;
  } catch (error) {
    console.error("Error fetching series data:", error);
    return [];
  }
};

export default SeasonsData;
