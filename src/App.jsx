import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Show from "./pages/Show";
function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/show/:name" element={<Show />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
