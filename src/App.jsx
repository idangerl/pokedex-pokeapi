import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import UserInput from "./components/UserInput";
import Pokedex from "./components/Pokedex";
import CharacterDetail from "./components/CharacterDetail";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<CharacterDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
