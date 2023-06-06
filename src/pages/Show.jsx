import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const { name } = useParams();
  const [show, setShow] = useState({});
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [bookings, setBookings] = useState([]);

  // Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch Show
  const fetchShow = async (url) => {
    try {
      const response = await axios.get(url);
      setShow(response.data);
    } catch (error) {
      setError("Failed to load data.");
    }
  };

  // Hook Call
  useEffect(() => {
    fetchShow(`https://api.tvmaze.com/singlesearch/shows?q=${name}`);
  }, [name]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  const submitFormData = (e) => {
    e.preventDefault();
    const { name, premiered, rating, image } = show;
    const ticketData = {
      username: user,
      name,
      premiered,
      rating: rating?.average,
      image: image?.original,
    };
    const updatedBookings = [...bookings, ticketData];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setFormData(ticketData);
    setIsFormOpen(false);
    alert("Ticket Booked Successfully!");
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto text-center">
          <div className="lg:w-4/5 mx-auto flex flex-wrap items-start">
            <img
              alt={show.name}
              className="lg:w-1/3 w-full mx-auto object-contain rounded"
              src={show.image?.original}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm text-gray-500 tracking-widest"></h2>
              <h1 className="text-gray-900 text-3xl font-medium mb-1">
                {show.name}
              </h1>
              <p className="leading-relaxed mt-4">{show.summary}</p>
              <div className="flex justify-between items-center mt-6 pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="font-semibold">Premiered:</span>
                  {show.premiered}
                </div>
                <div className="flex">
                  <ul className="flex flex-wrap">
                    {show.genres?.map((genre) => (
                      <li
                        key={genre}
                        className="font-semibold text-gray-600 mr-2"
                      >
                        {genre}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <span className="text-2xl text-gray-900 font-medium">
                  $95.00
                </span>
                <button
                  onClick={() => {
                    setIsFormOpen(true);
                  }}
                  className="flex ml-auto text-white bg-black border-0 py-2 px-6 rounded"
                >
                  Book Ticket
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>

              {isFormOpen && (
                <form className="mt-6" onSubmit={submitFormData}>
                  <h2 className="text-2xl  font-medium font-semibold">
                    Confirmation
                  </h2>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {formData.name}
                    </label>

                    <input
                      type="text"
                      value={show.name}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      disabled
                    />

                    <label htmlFor="username" className="mt-5">
                      <input
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        id="username"
                        placeholder="Enter your name"
                        className="shadow appearance-none border mt-5 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Show;
