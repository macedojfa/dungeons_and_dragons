import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './index.css';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function DnDSpells() {
  const [listaFeiticos, setListaFeiticos] = useState([]);
  const [feiticoSelecionado, setFeiticoSelecionado] = useState(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoFeitico, setCarregandoFeitico] = useState(false);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  // Busca a lista de feitiços ao montar o componente
  useEffect(() => {
    const buscarFeiticos = async () => {
      setCarregandoLista(true);
      setErro(null);
      try {
        const response = await axios.get('https://www.dnd5eapi.co/api/spells');
        setListaFeiticos(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar lista de feitiços:", err);
        setErro("Falha ao carregar a lista de feitiços. Tente novamente mais tarde.");
      } finally {
        //setCarregandoLista(false);
        await sleep(4000); 
    setCarregandoLista(false);
      }
    };

    buscarFeiticos();
  }, []);

  // Busca os detalhes de um feitiço selecionado
  const buscarDetalhesFeitico = async (urlFeitico) => {
    setCarregandoFeitico(true);
    setErro(null);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${urlFeitico}`);
      setFeiticoSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do feitiço:", err);
      setErro("Falha ao carregar os detalhes do feitiço. Tente novamente mais tarde.");
    } finally {
      //setCarregandoFeitico(false);
     await sleep(4000); 
    setCarregandoFeitico(false);
    }
  };

  const handleSelecaoFeitico = (urlFeitico) => {
    setFeiticoSelecionado(null); 
    buscarDetalhesFeitico(urlFeitico);
  };

  const handleMudancaBusca = (e) => {
    setTermoBusca(e.target.value);
  };

  const feiticosFiltrados = listaFeiticos.filter(feitico =>
    feitico.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2>✨ Feitiços de D&D 5e</h2>

      <Form className="mb-3">
        <Form.Group>
          <Form.Label>Buscar Feitiços:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Fireball, Healing Word"
            value={termoBusca}
            onChange={handleMudancaBusca}
          />
        </Form.Group>
      </Form>

      {erro && <Alert variant="danger">{erro}</Alert>}

      {carregandoLista ? (
        <Spinner animation="border" role="status"><span className="visually-hidden">Carregando feitiços...</span></Spinner>
      ) : (
        <Row>
          <Col md={4}>
            <h4>Todos os Feitiços ({feiticosFiltrados.length})</h4>
            <div style={{ maxHeight: '500px', overflowY: 'auto', borderRight: '1px solid #eee', paddingRight: '15px' }}>
              <ul className="list-group">
                {feiticosFiltrados.map(feitico => (
                  <li
                    key={feitico.index}
                    className={`list-group-item list-group-item-action ${feiticoSelecionado?.index === feitico.index ? 'active' : ''}`}
                    onClick={() => handleSelecaoFeitico(feitico.url)}
                    style={{ cursor: 'pointer' }}
                  >
                    {feitico.name}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={8}>
            {carregandoFeitico ? (
              <Spinner animation="border" role="status"><span className="visually-hidden">Carregando detalhes do feitiço...</span></Spinner>
            ) : feiticoSelecionado ? (
              <Card>
                <Card.Header>
                  <h4>{feiticoSelecionado.name}</h4>
                  <p className="mb-0"><em>{feiticoSelecionado.school.name}</em></p>
                </Card.Header>
                <Card.Body>
                  <p><strong>Tempo de Conjuração:</strong> {feiticoSelecionado.casting_time}</p>
                  <p><strong>Alcance:</strong> {feiticoSelecionado.range}</p>
                  <p><strong>Componentes:</strong> {feiticoSelecionado.components ? feiticoSelecionado.components.join(', ') : 'N/A'}</p>
                  {feiticoSelecionado.material && <p><strong>Material:</strong> {feiticoSelecionado.material}</p>}
                  <p><strong>Duração:</strong> {feiticoSelecionado.duration}</p>
                  <p><strong>Nível:</strong> {feiticoSelecionado.level}</p>
                  {feiticoSelecionado.attack_type && <p><strong>Tipo de Ataque:</strong> {feiticoSelecionado.attack_type}</p>}
                  {feiticoSelecionado.damage && feiticoSelecionado.damage.damage_type && (
                    <p><strong>Tipo de Dano:</strong> {feiticoSelecionado.damage.damage_type.name}</p>
                  )}
                  {feiticoSelecionado.desc && (
                    <>
                      <h5>Descrição:</h5>
                      {feiticoSelecionado.desc.map((paragrafo, index) => (
                        <p key={index}>{paragrafo}</p>
                      ))}
                    </>
                  )}
                  {feiticoSelecionado.higher_level && (
                    <>
                      <h5>Em Níveis Superiores:</h5>
                      {feiticoSelecionado.higher_level.map((paragrafo, index) => (
                        <p key={index}>{paragrafo}</p>
                      ))}
                    </>
                  )}
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="info">Selecione um feitiço da lista para ver seus detalhes.</Alert>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DnDSpells;