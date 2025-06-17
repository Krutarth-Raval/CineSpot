export const MovieDetailsData = async ({ params }) => {
  const id = params.id; // Ensure consistency with the route param name
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&append_to_response=credits,images,videos`
    );

    if (!res.ok) throw new Error("Failed to fetch movie data");

    const data = await res.json(); // ✅ Await the response JSON
    // console.log(data); // ✅ Logs the correct data

    return data; // ✅ Return the parsed data
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null;
  }
};
