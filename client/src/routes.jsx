import App from "./App";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Recipes from "./pages/Recipes/Recipes";
import RecipeInfo from "./pages/RecipeInfo/RecipeInfo";
import UserRecipes from "./pages/UserRecipes/UserRecipes";
import UserProfile from "./pages/UserProfile/UserProfile";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipes/:recipeId",
        element: <RecipeInfo />,
      },
      {
        path: "/myrecipes",
        element: <UserRecipes />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
