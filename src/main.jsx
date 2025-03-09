import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import "./index.css";
import { Authlayout } from "./Components/index.js";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signups from "./Pages/Signups.jsx"; 
import Post from "./Pages/Post.jsx";
import AddPost from "./Pages/AddPost.jsx";
import EditPost from "./Pages/EditPost.jsx";
import AllPosts from "./Pages/AllPost.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      // Auth Routes (Only for Unauthenticated Users)
      {
        path: "/login",
        element: (
          <Authlayout Status={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout Status={false}>
            <Signups />
          </Authlayout>
        ),
      },

      // Public Post Route
      { path: "/post/:slug", element: <Post /> }, 

      // Authenticated User Routes
      {
        path: "/all-posts",
        element: (
          <Authlayout Status={true}>
            <AllPosts />
          </Authlayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Authlayout Status={true}>
            <AddPost />
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Authlayout Status={true}>
            <EditPost />
          </Authlayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
