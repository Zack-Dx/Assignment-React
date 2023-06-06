import { Link } from "react-router-dom";
const Show_Card = ({
  show: {
    score,
    show: { name, summary, rating, image },
  },
}) => {
  return (
    <>
      <Link to={`/show/${name}`}>
        <div className="max-w-xs mx-auto bg-white shadow-lg cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition">
          <img
            className="w-full h-56 object-cover object-center"
            src={image.original}
            alt={image.medium}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="mt-2 text-gray-600">
              {summary.replace(/<\/?p>/g, "").slice(0, 150)}
            </p>
            <div className="flex items-center justify-between mt-4">
              <button
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white font-semibold rounded"
              >
                Read More
              </button>
              <div className="flex font-bold items-center">
                <span className="text-gray-700 text-sm mr-2">
                  {rating.average ? `Rating: ${rating?.average}` : ""}
                </span>
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={image.medium}
                  alt={image.medium}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Show_Card;
