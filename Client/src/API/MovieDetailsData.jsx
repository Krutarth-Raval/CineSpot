const BACKEND_PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy";

export const MovieDetailsData = async ({ params }) => {
  const id = params.id;

  try {
    const endpoint = `/movie/${id}?append_to_response=credits,images,videos`;
    const response = await fetch(`${BACKEND_PROXY}?endpoint=${encodeURIComponent(endpoint)}`);

    if (!response.ok) throw new Error("Failed to fetch movie data");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null;
  }
};
