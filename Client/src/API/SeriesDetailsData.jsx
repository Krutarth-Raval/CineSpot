const PROXY = "https://cinespot-server.onrender.com/api/tmdb/proxy?endpoint=";

export const SeriesDetailsData = async ({ params }) => {
  const id = params.id;

  try {
    const endpoint = `/tv/${id}?append_to_response=credits,images,videos`;
    const res = await fetch(`${PROXY}${encodeURIComponent(endpoint)}`);

    if (!res.ok) throw new Error("Failed to fetch series data");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching series details:", error);
    return null;
  }
};
