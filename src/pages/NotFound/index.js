import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './index.css';

function NotFound() {
  return (
    <Container className="text-center mt-5">
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está tentando acessar não existe.</p>
      <Link to="/dnd-character-viewer">
        <Button variant="primary">Voltar para Início</Button>
      </Link>
    </Container>
  );
}

export default NotFound;
