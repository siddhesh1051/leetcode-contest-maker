import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Contests from "./pages/Contests";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/v1" element={<Contests />} />
          <Route path="/" element={<Contests />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
