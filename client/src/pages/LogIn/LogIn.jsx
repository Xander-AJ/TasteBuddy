import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { RiEyeCloseFill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { VscLockSmall } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../firebase'; // Import the Firebase auth instance

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setError('');
    setSuccess('');
  };

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Your email is not verified. Please check your inbox and verify your email before logging in.");
        return;
      }

      // User is signed in and email is verified
      resetForm(); // Clear form fields and reset states
      navigate('/recipes'); // Redirect to a dashboard or homepage after login
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid credentials. Please try again. If you have forgotten your password, you can reset it.");
      } else if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Please check your email or sign up for an account.");
      } else if (error.code === 'auth/too-many-requests') {
        setError("You have made too many failed login attempts. Please try again later or reset your password.");
      } else if (error.code === 'auth/missing-password') {
        setError("Please input password.");
      } else {
        setError(error.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
    <div className="flex min-h-screen font-urbanist items-center justify-center bg-gray-200">
      <div className="bg-gray-100 p-8 rounded-lg max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="Sample Food"
            className="object-cover h-full w-full rounded-l-md"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-semibold text-green-800 text-center mb-6">Welcome</h2>
          <form className="relative">
            <div className="mb-8 relative">
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
            <div className="mb-8 relative">
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
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-sm text-green-900 font-semibold hover:underline"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            {error && <p className="text-red-700 font-semibold text-center mb-4">{error}</p>}
            {success && <p className="text-green-700 font-semibold text-center mb-4">{success}</p>}
            <button
              className="w-full bg-green-800 text-gray-50 font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 font-semibold text-center">-or-</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Sign-Up Link */}
          <p className="text-center font-semibold">
            Don’t have an account? <Link to='/signUp' className="text-green-800">Sign up</Link>
          </p>

        </div>
      </div>
    </div>
    </>

  );
};

export default LogIn;