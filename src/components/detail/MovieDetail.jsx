// MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import downloadIcon from '../editmovie/download-icon.svg';


const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://movie-watch-api.onrender.com/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovieData(data);
        } else {
          // Handle error response
          console.error('Failed to fetch movie details.');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieData) {
    // Loading state, you can replace this with a loading spinner or message
    return <div className=' w-full h-full text-center'>Loading...</div>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

const getYoutubeId = (url) =>{
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
    return null;
  } catch (e) {
    return null;
  }
}

  console.log(movieData.youtubeUrl)

  return (
    <div className="container mx-auto mt-8 max-w-screen-md">
      {/* YouTube Video */}
      <div className="relative h-0 overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <YouTube videoId={movieData.youtubeUrl} className=" block md:absolute top-0 left-0 mx-auto right-0 bottom-0 w-full h-full" />
      </div>

      {/* Movie Info Section */}
      <div className="flex flex-col md:flex-row mt-8">
        {/* Image Section */}
        <div className="w-full md:w-1/3 pr-4">
          <img src={movieData.imageUrl} alt={movieData.title} className="w-full h-fit" />
        </div>

        {/* Description Section */}
        <div className="w-2/3 flex flex-col justify-between">
          <div className=''>
            <h1 className="text-3xl font-bold">{movieData.title}</h1>
            <p className="text-gray-700 mt-4">{movieData.description}</p>
          </div>
          <Link to={`/edit-movie/${id}`} className="text-blue-500 hover:text-blue-700 mt-2 block">
            Edit Movie
          </Link>
        </div>
      </div>

      {/* Episodes List */}
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        {movieData.episodes.length === 0 ? (
          <p>No Episode yet</p>
        ) : (
          <ul>
            {movieData.episodes.map((episode) => (
              <li key={episode.id} className="border-b py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold">Episode {episode.episodeNumber}: </span>
                    <span className="ml-2 text-gray-500">{episode.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-500">{formatDate(episode.uploadedAt)}</span>
                    <a
                      href={episode.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" hover:bg-gray-200 p-2 rounded-full"
                    >
                    
                     <img src={downloadIcon} alt='download-icon' style={{
                        width: '20px'
                     }}/>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
