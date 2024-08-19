import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setTitle(user.title);
    setEmail(user.email);
    setAboutMe(user.aboutMe);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Replace this with your actual API call
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          title,
          email,
          aboutMe,
        }),
      });

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen font-urbanist">
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.firstName}</td>
                    <td className="py-2 px-4 border-b">{user.lastName}</td>
                    <td className="py-2 px-4 border-b">{user.title}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b space-x-4">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedUser && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Edit User</h3>
              <form onSubmit={handleUpdateUser}>
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
                    onClick={() => setSelectedUser(null)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

