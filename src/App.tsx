import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./routes";

const router = createBrowserRouter(routesConfig);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
