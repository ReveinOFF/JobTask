import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beers from "./modules/beers";
import SinglePage from "./modules/single-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beers />} />
        <Route path="/:id" element={<SinglePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
