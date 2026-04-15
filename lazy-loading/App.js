import React, { Suspense, lazy, useState } from "react";
import "./App.css";

// Lazy loaded pages
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="container">
      <h1>✨ Lazy Loading Pages</h1>

      {/* Navigation buttons */}
      <div className="btn-group">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "about" ? "active" : ""}
          onClick={() => setPage("about")}
        >
          About
        </button>
      </div>

      {/* Suspense Loader */}
      <Suspense fallback={<div className="loader">Loading page...</div>}>
        {page === "home" ? <Home /> : <About />}
      </Suspense>
    </div>
  );
}

export default App;
