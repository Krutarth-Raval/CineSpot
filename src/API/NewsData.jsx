export const NewsData = async () => {
  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${apiKey}`;
    
    const response = await fetch(proxy + encodeURIComponent(url));
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching movie news:", error);
    return [];
  }
};
