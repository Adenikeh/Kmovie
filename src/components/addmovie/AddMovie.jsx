import React, { useState } from 'react';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    imageUrl: '',
    youtubeUrl: '',
    description: '',
  });

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMovie = async () => {
    // Basic validation to ensure required fields are not empty
    if (!movieData.title.trim() || !movieData.imageUrl.trim() || !movieData.youtubeUrl.trim()) {
      setFeedback('Please fill in all required fields.');
      return;
    }
    setFeedback("")
    // Start loading
    setLoading(true);

    try {
      // Post movie data to the specified URL
      const response = await fetch('https://movie-watch-api.onrender.com/movies', {
      // const response = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: movieData.title,
          description: movieData.description,
          imageUrl: movieData.imageUrl,
          youtubeUrl: movieData.youtubeUrl,
        }),
      });
      console.log(response)

      if (response.ok) {
        setFeedback('Movie added successfully!');
        // Clear the input fields after adding the movie
        setMovieData({
          title: '',
          imageUrl: '',
          youtubeUrl: '',
          description: '',
        });
      } else {
        // Handle error response
        setFeedback('Failed to add the movie. Please try again.');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      setFeedback('An error occurred. Please try again later.');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className=' w-full lg:max-w-xl mx-auto'>
      {feedback && (
        <div className={`text-center ${feedback.includes('successfully!') ? 'text-green-500' : 'text-red-500'} mb-4`}>{feedback}</div>
      )}

      <label className="block text-sm font-medium text-gray-700">Movie Name *</label>
      <input
        type="text"
        name="title"
        value={movieData.title}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md outline-none"
        placeholder="Enter the movie name"
        required
        disabled={loading}
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Poster Image URL *</label>
      <input
        type="text"
        name="imageUrl"
        value={movieData.imageUrl}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md outline-none"
        placeholder="Enter the poster image URL"
        required
        disabled={loading}
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">YouTube URL *</label>
      <input
        type="text"
        name="youtubeUrl"
        value={movieData.youtubeUrl}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md outline-none"
        placeholder="Enter the YouTube URL"
        required
        disabled={loading}
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
      <textarea
        name="description"
        value={movieData.description}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full border rounded-md outline-none"
        placeholder="Enter the movie description"
        disabled={loading}
      />
      <div className='mt-4 w-full text-center'>
        <button
          onClick={handleAddMovie}
          className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer ${loading && 'opacity-50'}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
