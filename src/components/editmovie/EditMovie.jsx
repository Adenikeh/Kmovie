import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import EditIcon from './edit.svg';
import DeleteIcon from './delete.svg';


const EditMovie = () => {
    const { id } = useParams();
    const base_url = "https://movie-watch-api.onrender.com/movies"
    // const base_url = "http://localhost:8080/movies"

    const [movieData, setMovieData] = useState({
        title: '',
        imageUrl: '',
        youtubeUrl: '',
        description: '',
        episodes: [],
    });

    const [newEpisodeData, setNewEpisodeData] = useState({
        id: null,
        title: '',
        episodeNumber: 0,
        downloadUrl: '',
    });

    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMovieDetails = useCallback(async () => {
        try {
            const response = await fetch(`${base_url}/${id}`);
            if (response.ok) {
                const data = await response.json();
                setMovieData(data);
            } else {
                console.error('Failed to fetch movie details for editing.');
            }
        } catch (error) {
            console.error('Error fetching movie details for editing:', error);
        }
    }, [base_url, id]);

    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleEditEpisode = (episode) => {
        setNewEpisodeData({
            id: episode.id,
            title: episode.title,
            episodeNumber: episode.episodeNumber,
            downloadUrl: episode.downloadUrl,
        });
        // setNewEpisodeData{episode};
        setIsModalOpen(true)
    }

    const handleDeleteEpisode = (episodeId) => {
        deleteEpisodeCall(episodeId)
    }


    const handleDeleteMovie = async () => {
        // setLoading(true)
        try {
            // Put updated movie data to the specified URL
            const response = await fetch(`${base_url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                setFeedback('Movie deleted successfully!');
            } else {
                // Handle error response
                setFeedback('Failed to delete the Movie. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting Movie:', error);
            setFeedback('An error occurred. Please try again later.');
        } finally {
            // Stop loading
            // setLoading(false);
        }
    }


    const deleteEpisodeCall = async (episodeId) => {
        setLoading(true)
        try {
            // Put updated movie data to the specified URL
            const response = await fetch(`${base_url}/${id}/episode/${episodeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                setFeedback('Movie Episode deleted successfully!');
            } else {
                // Handle error response
                setFeedback('Failed to delete the Episode. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting episode:', error);
            setFeedback('An error occurred. Please try again later.');
        } finally {
            // Stop loading
            setLoading(false);
        }
    }

    const handleEditMovie = async () => {
        // Basic validation to ensure required fields are not empty
        if (!movieData.title.trim() || !movieData.imageUrl.trim() || !movieData.youtubeUrl.trim()) {
            setFeedback('Please fill in all required fields.');
            return;
        }
        setFeedback("");

        // Start loading
        setLoading(true);

        try {
            // Put updated movie data to the specified URL
            const response = await fetch(`${base_url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    title: movieData.title,
                    description: movieData.description,
                    imageUrl: movieData.imageUrl,
                    youtubeUrl: movieData.youtubeUrl,
                    episodes: movieData.episodes,
                }),
            });

            if (response.ok) {
                setFeedback('Movie updated successfully!');
            } else {
                // Handle error response
                setFeedback('Failed to update the movie. Please try again.');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
            setFeedback('An error occurred. Please try again later.');
        } finally {
            // Stop loading
            setLoading(false);
        }
    };

    // Function to add a new episode
    const handleAddEpisode = () => {
        setNewEpisodeData({
            id: null,
            title: '',
            episodeNumber: 0,
            downloadUrl: '',
        });
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Clear new episode data when the modal is closed
        setNewEpisodeData({
            id: null,
            title: '',
            episodeNumber: 0,
            downloadUrl: '',
        });
    };

    const onAddOrEditEpisode = (updatedEpisodeData) => {
        setMovieData((prevMovieData) => {
            const episodeIndex = prevMovieData.episodes.findIndex(
                (episode) => episode.id === updatedEpisodeData.id
            );
    
            const updatedEpisodes = [...prevMovieData.episodes];
            
            if (episodeIndex < 0) {
                updatedEpisodes.push(updatedEpisodeData);
            } else {
                updatedEpisodes[episodeIndex] = {
                    ...updatedEpisodes[episodeIndex],
                    ...updatedEpisodeData,
                };
            }
    
            return {
                ...prevMovieData,
                episodes: updatedEpisodes,
            };
        });
    
        handleModalClose();
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

            {/* List of Episodes */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Episodes</h2>
                {movieData.episodes.length > 0 ? (
                    <ul>
                        {movieData.episodes.map((episode) => (
                            <li key={episode.id} className="border-b py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-semibold">Episode {episode.episodeNumber}</span>
                                        <span className="ml-2 text-gray-500">{episode.title}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-gray-500">{episode.uploadedDate}</span>
                                        <div>
                                            <button onClick={() => handleEditEpisode(episode)} disabled={loading}>
                                                <img src={EditIcon} alt='download-icon' style={{
                                                    width: '20px',
                                                    marginRight: '10px'
                                                }} />
                                            </button>
                                            <button onClick={() => handleDeleteEpisode(episode.id)} disabled={loading}>
                                                <img src={DeleteIcon} alt='download-icon' style={{
                                                    width: '20px'
                                                }} />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className=' text-center mb-0'>No episodes yet.</p>
                )}
            </div>

            {/* Add Episode Button */}
            <div className="mt-4 w-full text-center">
                <button
                    onClick={handleAddEpisode}
                    className=" bg-transparent text-blue-500 border-none mb-6 rounded-md text-sm cursor-pointer"
                >
                    Add Episode
                </button>
            </div>

            {/*  */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                handleModalClose={handleModalClose}
                episodeData={newEpisodeData}
                setEpisodeData={setNewEpisodeData}
                onAddOrEditEpisode={onAddOrEditEpisode}
            >

            </Modal>

            {/* Edit Movie Button */}
            <div className="mt-4 w-full flex gap-10 justify-center text-center">
                <button
                    onClick={handleEditMovie}
                    className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer ${loading && 'opacity-50'}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Submit'}
                </button>
                <button
                    onClick={handleDeleteMovie}
                    className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer ${loading && 'opacity-50'}`}
                    disabled={loading}
                >
                    Delete Movie
                </button>
            </div>
        </div>
    );
};

export default EditMovie;
