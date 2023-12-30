import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`http://localhost:8080/movies?page=${currentPage}`, {
          const response = await fetch(`https://movie-watch-api.onrender.com/movies?page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        setMovies(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-8">
        <h2 className="sr-only">Movies</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={movie.href}
              className="group rounded-md bg-white border overflow-hidden shadow-lg hover:shadow-2xl "
              to={`/movie-detail/${movie.id}`}
            >
              <div className="aspect-w-5 aspect-h-5">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="object-cover w-full h-full group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-700 font-medium text-xl">{movie.title}</h3>
                <p className="mt-1 text-xs text-gray-900">{truncateText(movie.description)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">

          {totalPages > 1 && (
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded-full ${currentPage === index ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))
          )}
        </div>

        {/* <div className="flex justify-center mt-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded-full ${currentPage === index ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
}
