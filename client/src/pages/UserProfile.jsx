import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import navbar
// import footer

const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false); 
  const navigate = useNavigate(); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // handle file upload to the server
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleExploreRecipesClick = () => {
    navigate('/recipes'); // placeholder for redirecting to the featured recipes page
  };

  return (
    <div className="bg-green-50 min-h-screen font-urbanist">
      <div className="container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="border-b pb-4 mb-4">
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <li><a href="#" className="font-bold text-green-800 border-b-2 border-green-800 pb-2">Account</a></li>
              <li>
                <button
                  onClick={toggleNotifications}
                  className="text-gray-500 hover:text-green-800 hover:border-green-800 pb-2"
                >
                  Notification
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 border-r pr-4 mb-4 md:mb-0">
              <div className="flex flex-col items-center">
                <img
                  src={file ? URL.createObjectURL(file) : "https://via.placeholder.com/100"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border"
                />
                <h2 className="text-xl font-bold mt-4">User Name</h2>
                <p className="text-gray-500">Title</p>
                <div className="flex space-x-4 mt-4">
                  <div className="text-center">
                    <span className="block text-xl font-bold">21</span>
                    <span className="text-gray-500">Recipes</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold">238</span>
                    <span className="text-gray-500">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold">101</span>
                    <span className="text-gray-500">Following</span>
                  </div>
                </div>
                <button
                  onClick={handleUploadClick}
                  className="mt-4 bg-customGreen text-white px-4 py-2 rounded hover:bg-green-950"
                >
                  Upload new avatar
                </button>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-gray-500 mt-4 text-center">Soul Society</p>
                <p className="text-gray-500 text-center">I'm a budding Pastry Chef</p>
              </div>
            </div>

            <div className="w-full md:w-2/3 pl-4">
              <h2 className="text-xl font-bold mb-4">Basic Info</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">First Name</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Title</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full mt-1 p-2 border rounded" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-gray-700">About Me</label>
                    <textarea className="w-full mt-1 p-2 border rounded" rows="4"></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button type="button" className="px-4 py-2 border rounded hover:bg-customGreen">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-customGreen text-white rounded hover:bg-green-950">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Notification Panel */}
        {showNotifications && (
          <div className="fixed inset-0 top-1/2 transform -translate-y-1/2 bg-green-50 shadow-lg p-6 rounded-lg max-w-md mx-auto transition-transform duration-300 ease-in-out">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close Notification Panel"
              >
                <span className="text-2xl">&times;</span>
              </button>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">No Notifications Yet!</h3>
                <p className="mb-4">It looks like you don’t have any notifications right now. Why not explore some new recipes and get inspired?</p>
                <button
                  onClick={handleExploreRecipesClick}
                  className="bg-customGreen text-white px-4 py-2 rounded hover:bg-green-950"
                >
                  Explore Recipes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
