export const NewsData = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${
        import.meta.env.VITE_NEWS_API_KEY
      }`
    );
    const data = await response.json();
    return data.articles; // Returns an array of news articles
  } catch (error) {
    console.error("Error fetching movie news:", error);
  }
};
