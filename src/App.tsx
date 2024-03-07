import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./page/Home";
import MoviePage from "./page/Movie";

const routers = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/movie/:name", element: <MoviePage /> },
]);

function App() {
  return (
    <>
      <div id="body">
        <RouterProvider router={routers} />
      </div>
    </>
  );
}

export default App;
