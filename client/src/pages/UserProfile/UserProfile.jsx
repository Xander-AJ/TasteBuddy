import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [recipes, setRecipes] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setFirstName(localStorage.getItem("firstName") || "");
      setLastName(localStorage.getItem("lastName") || "");
      setTitle(localStorage.getItem("title") || "");
      setEmail(localStorage.getItem("email") || "");
      setAboutMe(localStorage.getItem("aboutMe") || "");

      await fetchNotifications();
      await fetchBookmarks();
      await fetchUserStats();

      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("title", title);
      localStorage.setItem("email", email);
      localStorage.setItem("aboutMe", aboutMe);
    }
  }, [firstName, lastName, title, email, aboutMe, isLoading]);

  const fetchNotifications = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/bookmarks");
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const fetchUserStats = async () => {
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/user-stats");
      const data = await response.json();
      setRecipes(data.recipes);
      setFollowers(data.followers);
      setFollowing(data.following);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleExploreRecipesClick = () => {
    navigate("/recipes");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "aboutMe":
        setAboutMe(value);
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen font-urbanist">
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
              <li>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`font-bold ${
                    activeTab === "account"
                      ? "text-green-800 border-b-2 border-green-800"
                      : "text-gray-500"
                  } pb-2 transition duration-300 ease-in-out hover:text-green-600`}
                >
                  Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`font-bold ${
                    activeTab === "notifications"
                      ? "text-green-800 border-b-2 border-green-800"
                      : "text-gray-500"
                  } pb-2 transition duration-300 ease-in-out hover:text-green-600`}
                >
                  Notifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("bookmarks")}
                  className={`font-bold ${
                    activeTab === "bookmarks"
                      ? "text-green-800 border-b-2 border-green-800"
                      : "text-gray-500"
                  } pb-2 transition duration-300 ease-in-out hover:text-green-600`}
                >
                  My Bookmarks
                </button>
              </li>
            </ul>
          </div>

          {activeTab === "account" && (
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="w-full md:w-1/3 border-r border-gray-200 pr-8 mb-8 md:mb-0">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-green-100 shadow-md"
                  />
                  <h2 className="text-2xl font-bold mt-6 text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-600 font-medium">{title}</p>
                  <div className="flex space-x-8 mt-6">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-green-800">
                        {recipes}
                      </span>
                      <span className="text-gray-600">Recipes</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-green-800">
                        {followers}
                      </span>
                      <span className="text-gray-600">Followers</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-green-800">
                        {following}
                      </span>
                      <span className="text-gray-600">Following</span>
                    </div>
                  </div>

                  <button
                    onClick={handleUploadClick}
                    className="mt-6 bg-customGreen text-white px-6 py-3 rounded-full hover:bg-green-950 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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
                  <p className="text-gray-600 mt-6 text-center">Soul Society</p>
                  <p className="text-gray-600 text-center">{aboutMe}</p>
                </div>
              </div>

              <div className="w-full md:w-2/3 pl-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Basic Info
                </h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        About Me
                      </label>
                      <textarea
                        name="aboutMe"
                        value={aboutMe}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-customGreen text-white rounded-lg hover:bg-green-950 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Notifications
              </h3>
              {notifications.length > 0 ? (
                <ul className="space-y-4">
                  {notifications.map((notification, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4">
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-500">
                        {notification.timestamp}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center">
                  <p className="mb-6 text-gray-600">
                    It looks like you don't have any notifications right now.
                    Why not explore some new recipes and get inspired?
                  </p>
                  <button
                    onClick={handleExploreRecipesClick}
                    className="bg-customGreen text-white px-6 py-3 rounded-full hover:bg-green-950 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Explore Recipes
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                My Bookmarks
              </h3>
              {bookmarks.length > 0 ? (
                <ul className="space-y-4">
                  {bookmarks.map((bookmark, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {bookmark.title}
                      </h4>
                      <p className="text-gray-600">{bookmark.description}</p>
                      <a
                        href={bookmark.url}
                        className="text-customGreen hover:underline"
                      >
                        View Recipe
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center">
                  <p className="mb-6 text-gray-600">
                    You haven't bookmarked any recipes yet. Start exploring and
                    save your favorite recipes here!
                  </p>
                  <button
                    onClick={handleExploreRecipesClick}
                    className="bg-customGreen text-white px-6 py-3 rounded-full hover:bg-green-950 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Discover Recipes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;