import { useEffect, useState } from "react";
import axios from "axios";
import Show_Card from "../components/Show_Card";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Shows
  const fetchShows = async (url) => {
    try {
      const { data } = await axios.get(url);
      setShows(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error occurred while fetching shows.");
      setIsLoading(true);
    }
  };

  // Hook Calls
  useEffect(() => {
    fetchShows("https://api.tvmaze.com/search/shows?q=all");
  }, []);

  // Loading State
  if (isLoading) {
    return <p>Loading...</p>; // Display a loading indicator while data is being fetched
  }

  // Error State
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <main>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-16 py-10">
          {shows?.map((show) => {
            return <Show_Card key={show.show.id} show={show} />;
          })}
        </section>
      </main>
    </>
  );
};

export default Home;
