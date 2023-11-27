import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToneObjectProvider } from "./contexts/ToneObjectContext";
import Gallery from "./pages/Gallery";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Share from "./pages/Share";

/**
 * Creates the app, with the tone object contexted into the entire app.
 * 
 * @returns {React.ReactNode} App.
 */
export default function App() {
  return (
    // The tone object is contexted here so it doesn't have to reload the samplers every time the page changes.
    <ToneObjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/share/:id" element={<Share />} />
        </Routes>
      </BrowserRouter>
    </ToneObjectProvider>
  );
}
