import "./App.css";
import { Helmet } from "react-helmet-async";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import MainBody from "./components/MainBody";

const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

function App() {
  const [darkTheme, setDarkTheme] = useState(
    () => (localStorage.getItem("App-theme") || "dark") === "dark"
  );

  useEffect(() => {
    document.body.setAttribute("App-theme", darkTheme ? "dark" : "light");
    localStorage.setItem("App-theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  const toggleTheme = () => setDarkTheme((d) => !d);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Iftekharul Abedeen</title>
        <link rel="canonical" href="https://abedeen25.github.io/home/" />
        <meta
          name="description"
          content="Portfolio and blog of Iftekharul Abedeen — lecturer and HCI/ML researcher."
        />
      </Helmet>
      <Suspense fallback={<div className="route-loading" />}>
        <Routes>
          <Route
            path="/"
            element={<MainBody darkTheme={darkTheme} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/blog"
            element={<BlogIndex darkTheme={darkTheme} toggleTheme={toggleTheme} />}
          />
          <Route
            path="/blog/:slug"
            element={<BlogPost darkTheme={darkTheme} toggleTheme={toggleTheme} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;