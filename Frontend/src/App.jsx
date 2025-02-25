import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto] h-screen">
      <aside className="bg-black text-white row-span-2 h-full">
        <Sidebar />
      </aside>

      <div className="bg-gray-50 p-4 col-start-2 shadow-lg">
        <BreadcrumbNav />
      </div>

      <main className="bg-gray-100 h-screen shadow ">
        {children}
      </main>

      <footer className="col-span-2 text-white text-center ">
        <Footer />
      </footer>
    </div>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
