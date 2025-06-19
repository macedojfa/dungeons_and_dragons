import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';


import Login from './pages/Login';

import Main from './pages/Main';
import Footer from './pages/Footer';
import NotFound from './pages/NotFound';
import Menu from './pages/Menu';
import Sobre from './pages/Sobre';


import DnDSpells from './pages/DnDSpells';
import DnDEquipment from './pages/DnDEquipment';
import DnDCharacterViewer from './pages/DnDCharacterViewer'; 
import DnDMonsters from './pages/DnDMonsters'; 

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(savedAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />

        {/* Rotas protegidas com layout */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Menu>
                <Routes>
                  <Route path="/main" element={<Main />} />
                  <Route path="/footer" element={<Footer insta="@rodrigomacedojf" whats="32 99117-3601" />} />
                  <Route path="/sobre" element={<Sobre />} />
                  {/* Rotas dos componentes D&D */}
                  <Route path="/dnd-spells" element={<DnDSpells />} />
                  <Route path="/dnd-equipment" element={<DnDEquipment />} />
                  <Route path="/dnd-character-viewer" element={<DnDCharacterViewer />} />
                  <Route path="/dnd-monsters" element={<DnDMonsters />} /> 
                  
                  {/* Rota para páginas não encontradas */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Menu>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;