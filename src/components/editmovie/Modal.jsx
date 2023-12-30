import React, { useState } from 'react';

const Modal = ({ isOpen, onRequestClose, handleModalClose, episodeData, setEpisodeData, onAddOrEditEpisode }) => {

  const [episodeFeedback, setEpisodeFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setEpisodeData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
};


  const handleSaveEpisode = async () => {
    // Validate episode data
    if (!episodeData.title.trim() ||
    episodeData.episodeNumber <= 0 ||
      !episodeData.downloadUrl.trim()) {
      setEpisodeFeedback('Please fill in all required fields for the new episode.');
      return;
    }
    setEpisodeFeedback('')
    setLoading(true);
    onAddOrEditEpisode(episodeData);
    setLoading(false);
  };


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-600 opacity-50"
            onClick={onRequestClose}
          ></div>
          <div className="z-50 bg-white p-4 rounded-md w-full mx-3 shadow-md md:w-1/3 md:mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{episodeData.id === null ? 'Add New Episode' : 'Edit Episode'}</h2>
              <button
                onClick={onRequestClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className='w-full'>
              <div className="bg-white p-4 rounded-md flex flex-col max-w-screen-md mx-auto">
                {episodeFeedback && (
                  <div className={`text-center ${episodeFeedback.includes('successfully!') ? 'text-green-500' : 'text-red-500'} mb-4`}>{episodeFeedback}</div>
                )}
                {/* <h2 className="text-2xl font-bold mb-4">{episodeData.id === null ? 'Add New Episode' : 'Edit Episode'}</h2> */}
                {/* Input fields for episode data */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Title: *</label>
                  <input
                    type="text"
                    name="title"
                    value={episodeData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md outline-none"
                    disabled={loading}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Episode Number: *</label>
                  <input
                    type="number"
                    name="episodeNumber"
                    value={episodeData.episodeNumber}
                    onChange={(e) => handleInputChange('episodeNumber', parseInt(e.target.value, 10))}
                    className="mt-1 p-2 w-full border rounded-md outline-none"
                    disabled={loading}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Download URL: *</label>
                  <input
                    type="text"
                    name="downloadUrl"
                    value={episodeData.downloadUrl}
                    onChange={(e) => handleInputChange('downloadUrl', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md outline-none"
                    disabled={loading}
                  />
                </div>
                {/* Save and Close buttons */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveEpisode}
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer mr-2"
                  >
                    {loading ? 'Uploading' : 'Save Episode'}
                  </button>
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 cursor-pointer"
                    disabled={loading}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
