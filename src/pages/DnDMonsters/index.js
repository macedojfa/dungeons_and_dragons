import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

import { Container, Form, Card, Row, Col, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function DnDMonsters() {
  const [listaMonstros, setListaMonstros] = useState([]);
  const [monstroSelecionado, setMonstroSelecionado] = useState(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoMonstro, setCarregandoMonstro] = useState(false);
  const [erro, setErro] = useState(null);
  const [termoBuscaLista, setTermoBuscaLista] = useState('');
  const [termoBuscaIndice, setTermoBuscaIndice] = useState('');

  // Busca a lista de monstros ao montar o componente
  useEffect(() => {
    const buscarMonstros = async () => {
      setCarregandoLista(true);
      setErro(null);
      try {
        const response = await axios.get('https://www.dnd5eapi.co/api/monsters');
        setListaMonstros(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar lista de monstros:", err);
        setErro("Falha ao carregar a lista de monstros. Tente novamente mais tarde.");
      } finally {
        //setCarregandoLista(false);
        await sleep(4000); 
    setCarregandoLista(false);
      }
    };

    buscarMonstros();
  }, []);

  // Busca os detalhes de um monstro (pela lista ou por índice)
  const buscarDetalhesMonstro = async (url) => {
    setCarregandoMonstro(true);
    setErro(null);
    setMonstroSelecionado(null);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setMonstroSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do monstro:", err);
      setErro("Monstro não encontrado ou erro ao buscar detalhes.");
    } finally {
      //setCarregandoMonstro(false);
      await sleep(4000); 
     setCarregandoMonstro(false);
    }
  };
  
  
  const handleBuscaPorIndice = () => {
    if (!termoBuscaIndice) return;
    const url = `/api/monsters/${termoBuscaIndice.toLowerCase().trim().replace(/\s+/g, '-')}`;
    buscarDetalhesMonstro(url);
  };

  const monstrosFiltrados = listaMonstros.filter(monstro =>
    monstro.name.toLowerCase().includes(termoBuscaLista.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2>👹 Monstros de D&D 5e</h2>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Row className="mb-4">
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Filtrar na Lista:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Dragon, Goblin"
              value={termoBuscaLista}
              onChange={(e) => setTermoBuscaLista(e.target.value)}
            />
          </Form.Group>

          {carregandoLista ? (
            <Spinner animation="border" size="sm" role="status"><span className="visually-hidden">Carregando...</span></Spinner>
          ) : (
            <div style={{ maxHeight: '500px', overflowY: 'auto', borderRight: '1px solid #eee', paddingRight: '15px' }}>
              <ListGroup>
                {monstrosFiltrados.map(monstro => (
                  <ListGroup.Item
                    key={monstro.index}
                    active={monstroSelecionado?.index === monstro.index}
                    onClick={() => buscarDetalhesMonstro(monstro.url)}
                    action
                    style={{ cursor: 'pointer' }}
                  >
                    {monstro.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>

        
        <Col md={8}>
            <Form.Group className="mb-3">
                <Form.Label>Buscar por Índice:</Form.Label>
                <div className="d-flex">
                    <Form.Control
                    type="text"
                    placeholder="Ex: 'goblin' ou 'adult-red-dragon'"
                    value={termoBuscaIndice}
                    onChange={(e) => setTermoBuscaIndice(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBuscaPorIndice()}
                    />
                    <Button onClick={handleBuscaPorIndice} className="ms-2">Buscar</Button>
                </div>
            </Form.Group>

          {carregandoMonstro ? (
            <div className="text-center">
                <Spinner animation="border" role="status"><span className="visually-hidden">Carregando detalhes...</span></Spinner>
            </div>
          ) : monstroSelecionado ? (
            <Card>
              <Card.Header>
                <h4>{monstroSelecionado.name}</h4>
                <p className="mb-0"><em>{monstroSelecionado.size} {monstroSelecionado.type}, {monstroSelecionado.alignment}</em></p>
              </Card.Header>
              <Card.Body>
                <p><strong>Classe de Armadura:</strong> {monstroSelecionado.armor_class?.[0]?.value || 'N/A'}</p>
                <p><strong>Pontos de Vida:</strong> {monstroSelecionado.hit_points} ({monstroSelecionado.hit_points_roll})</p>
                <p><strong>Deslocamento:</strong> {Object.entries(monstroSelecionado.speed).map(([tipo, valor]) => `${tipo}: ${valor}`).join(', ')}</p>
                <hr />
                <Row>
                  <Col><strong>FOR:</strong> {monstroSelecionado.strength}</Col>
                  <Col><strong>DES:</strong> {monstroSelecionado.dexterity}</Col>
                  <Col><strong>CON:</strong> {monstroSelecionado.constitution}</Col>
                </Row>
                <Row>
                  <Col><strong>INT:</strong> {monstroSelecionado.intelligence}</Col>
                  <Col><strong>SAB:</strong> {monstroSelecionado.wisdom}</Col>
                  <Col><strong>CAR:</strong> {monstroSelecionado.charisma}</Col>
                </Row>
                <hr />
                {monstroSelecionado.special_abilities?.length > 0 && (
                  <>
                    <h5>Habilidades Especiais</h5>
                    {monstroSelecionado.special_abilities.map((ability, index) => (
                      <div key={index}>
                        <strong>{ability.name}:</strong> <p>{ability.desc}</p>
                      </div>
                    ))}
                  </>
                )}
                 {monstroSelecionado.actions?.length > 0 && (
                  <>
                    <h5>Ações</h5>
                    {monstroSelecionado.actions.map((action, index) => (
                      <div key={index}>
                        <strong>{action.name}:</strong> <p>{action.desc}</p>
                      </div>
                    ))}
                  </>
                )}
                {monstroSelecionado.legendary_actions?.length > 0 && (
                  <>
                    <h5>Ações Lendárias</h5>
                    {monstroSelecionado.legendary_actions.map((action, index) => (
                      <div key={index}>
                        <strong>{action.name}:</strong> <p>{action.desc}</p>
                      </div>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">Selecione um monstro da lista ou busque por seu índice.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DnDMonsters;