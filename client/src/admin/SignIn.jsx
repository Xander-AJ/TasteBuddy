import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { RiEyeCloseFill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { VscLockSmall } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase"; // Adjust this path as necessary

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Your email is not verified. Please verify your email before logging in.");
        return;
      }

      if (user.email === 'admin@example.com') {
        navigate('/admin/dashboard'); // Redirect to admin dashboard after login
      } else {
        setError("You do not have access to this page.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen font-urbanist items-center justify-center bg-gray-200">
      <div className="bg-gray-100 p-8 rounded-lg max-w-4xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="Sample Food"
            className="object-cover h-full w-full rounded-l-md"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-semibold text-green-800 text-center mb-6">Admin Sign In</h2>
          <form>
            <div className="mb-8">
              <label
                className="absolute -top-3 left-6 bg-gray-100 px-1 text-gray-700 text-sm font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center shadow appearance-none border rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <MdOutlineMailOutline className=" text-gray-500 mr-3" />
                <input
                  className="flex-1 bg-transparent focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-8">
              <label
                className="absolute -top-3 left-6 bg-gray-100 px-1 text-gray-700 text-sm font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center shadow appearance-none border rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <VscLockSmall className=" text-gray-500 mr-3" />
                <input
                  className="flex-1 bg-transparent focus:outline-none"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="focus:outline-none ml-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <TbEyeClosed className="text-gray-500" />
                  ) : (
                    <RiEyeCloseFill className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-700 font-semibold text-center mb-4">{error}</p>}
            <button
              className="w-full bg-green-800 text-gray-50 font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;

