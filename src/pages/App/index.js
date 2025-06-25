import './index.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Login';

import Main from '../Main';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Menu from '../Menu';
import Sobre from '../Sobre';


import DnDSpells from '../DnDSpells';
import DnDEquipment from '../DnDEquipment';
import DnDCharacterViewer from '../DnDCharacterViewer'; 
import DnDMonsters from '../DnDMonsters'; 

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