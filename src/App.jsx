import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Participants from "./pages/Participants";
import Eliminated from "./pages/Eliminated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participantes" element={<Participants />} />
        <Route path="/eliminados" element={<Eliminated />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
