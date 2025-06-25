import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { Container, Form, Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function DnDCharacterViewer() {
  const [racasDisponiveis, setRacasDisponiveis] = useState([]);
  const [classesDisponiveis, setClassesDisponiveis] = useState([]);
  const [planosDeFundoDisponiveis, setPlanosDeFundoDisponiveis] = useState([]);
  const [alinhamentosDisponiveis, setAlinhamentosDisponiveis] = useState([]);
  const [habilidadesDisponiveis, setHabilidadesDisponiveis] = useState([]);

  const [racaSelecionada, setRacaSelecionada] = useState(null);
  const [classeSelecionada, setClasseSelecionada] = useState(null);
  const [planoDeFundoSelecionado, setPlanoDeFundoSelecionado] = useState(null);
  const [alinhamentoSelecionado, setAlinhamentoSelecionado] = useState(null);

  const [nomeUsuario, setNomeUsuario] = useState(''); // nome do usuário
  const [emailUsuario, setEmailUsuario] = useState(''); // email do usuário

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca inicial das listas (Raças, Classes, Planos de Fundo, Alinhamentos, Habilidades)
  useEffect(() => {
    const buscarDadosIniciais = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const [
          racasRes,
          classesRes,
          planosDeFundoRes,
          alinhamentosRes,
          habilidadesRes
        ] = await Promise.all([
          axios.get('https://www.dnd5eapi.co/api/races'),
          axios.get('https://www.dnd5eapi.co/api/classes'),
          axios.get('https://www.dnd5eapi.co/api/backgrounds'),
          axios.get('https://www.dnd5eapi.co/api/alignments'),
          axios.get('https://www.dnd5eapi.co/api/ability-scores'),
        ]);

        setRacasDisponiveis(racasRes.data.results);
        setClassesDisponiveis(classesRes.data.results);
        setPlanosDeFundoDisponiveis(planosDeFundoRes.data.results);
        setAlinhamentosDisponiveis(alinhamentosRes.data.results);
        setHabilidadesDisponiveis(habilidadesRes.data.results);

      } catch (err) {
        console.error("Erro ao buscar dados iniciais:", err);
        setErro("Falha ao carregar dados iniciais. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosIniciais();
  }, []);


  const buscarDetalhesRaca = async (url) => {
    if (!url) {
      setRacaSelecionada(null);
      return;
    }
    setCarregando(true);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setRacaSelecionada(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes da raça:", err);
      setErro("Falha ao carregar detalhes da raça.");
    } finally {
      //setCarregando(false);
      await sleep(4000);
      setCarregando(false);
    }
  };

  const buscarDetalhesClasse = async (url) => {
    if (!url) {
      setClasseSelecionada(null);
      return;
    }
    setCarregando(true);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setClasseSelecionada(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes da classe:", err);
      setErro("Falha ao carregar detalhes da classe.");
    } finally {
      //setCarregando(false);
      await sleep(4000);
      setCarregando(false);
    }
  };

  const buscarDetalhesPlanoDeFundo = async (url) => {
    if (!url) {
      setPlanoDeFundoSelecionado(null);
      return;
    }
    setCarregando(true);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setPlanoDeFundoSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do plano de fundo:", err);
      setErro("Falha ao carregar detalhes do plano de fundo.");
    } finally {
      //setCarregando(false);
      await sleep(4000);
      setCarregando(false);
    }
  };

  const buscarDetalhesAlinhamento = async (url) => {
    if (!url) {
      setAlinhamentoSelecionado(null);
      return;
    }
    setCarregando(true);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setAlinhamentoSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do alinhamento:", err);
      setErro("Falha ao carregar detalhes do alinhamento.");
    } finally {
      //setCarregando(false);
      await sleep(4000);
      setCarregando(false);
    }
  };

  // Funções para lidar com a seleção nos dropdowns
  const handleRacaChange = (e) => {
    buscarDetalhesRaca(e.target.value);
  };

  const handleClasseChange = (e) => {
    buscarDetalhesClasse(e.target.value);
  };

  const handlePlanoDeFundoChange = (e) => {
    buscarDetalhesPlanoDeFundo(e.target.value);
  };

  const handleAlinhamentoChange = (e) => {
    buscarDetalhesAlinhamento(e.target.value);
  };

  // Agrega proficiências da raça e da classe
  const proficienciasCombinadas = Array.from(new Set([
    ...(racaSelecionada?.starting_proficiencies || []).map(p => p.name.replace('Skill: ', '')),
    ...(classeSelecionada?.proficiencies || []).map(p => p.name.replace('Skill: ', ''))
  ])).sort();

  // Agrega idiomas da raça
  const idiomasCombinados = Array.from(new Set([
    ...(racaSelecionada?.languages || []).map(l => l.name)
  ])).sort();


  const enviarEmail = async () => {
    if (!nomeUsuario || !emailUsuario) {
      alert('Por favor, preencha seu nome e e-mail para enviar.');
      return;
    }

    if (!racaSelecionada && !classeSelecionada && !planoDeFundoSelecionado && !alinhamentoSelecionado) {
      alert('Por favor, selecione pelo menos uma Raça, Classe, Plano de Fundo ou Alinhamento para enviar o e-mail.');
      return;
    }

    let emailMessage = `Detalhes do seu Personagem D&D 5e:\n\n`;

    if (racaSelecionada) {
      emailMessage += `--- Raça: ${racaSelecionada.name} ---\n`;
      emailMessage += `  Velocidade: ${racaSelecionada.speed}\n`;
      emailMessage += `  Tamanho: ${racaSelecionada.size}\n`;
      if (racaSelecionada.ability_bonuses && racaSelecionada.ability_bonuses.length > 0) {
        emailMessage += `  Bônus de Atributos: ${racaSelecionada.ability_bonuses.map(b => `${b.ability_score.name}: +${b.bonus}`).join(', ')}\n`;
      }
      emailMessage += `  Idiomas: ${idiomasCombinados.join(', ') || 'N/A'}\n`;
      if (racaSelecionada.traits && racaSelecionada.traits.length > 0) {
        emailMessage += `  Traços Raciais: ${racaSelecionada.traits.map(t => t.name).join(', ')}\n`;
      }
      emailMessage += `\n`;
    }

    if (classeSelecionada) {
      emailMessage += `--- Classe: ${classeSelecionada.name} ---\n`;
      emailMessage += `  Dado de Vida: d${classeSelecionada.hit_die}\n`;
      if (classeSelecionada.proficiencies && classeSelecionada.proficiencies.length > 0) {
        emailMessage += `  Proficiências: ${classeSelecionada.proficiencies.map(p => p.name.replace('Skill: ', '')).join(', ')}\n`;
      }
      if (classeSelecionada.saving_throws && classeSelecionada.saving_throws.length > 0) {
        emailMessage += `  Testes de Resistência: ${classeSelecionada.saving_throws.map(st => st.name).join(', ')}\n`;
      }
      if (classeSelecionada.subclasses && classeSelecionada.subclasses.length > 0) {
        emailMessage += `  Subclasses: ${classeSelecionada.subclasses.map(sc => sc.name).join(', ')}\n`;
      }
      emailMessage += `\n`;
    }

    if (planoDeFundoSelecionado) {
      emailMessage += `--- Plano de Fundo: ${planoDeFundoSelecionado.name} ---\n`;
      if (planoDeFundoSelecionado.starting_proficiencies && planoDeFundoSelecionado.starting_proficiencies.length > 0) {
        emailMessage += `  Proficiências Iniciais: ${planoDeFundoSelecionado.starting_proficiencies.map(p => p.name.replace('Skill: ', '')).join(', ')}\n`;
      }
      if (planoDeFundoSelecionado.feature) {
        emailMessage += `  Característica: ${planoDeFundoSelecionado.feature.name}\n`;
        emailMessage += `    ${planoDeFundoSelecionado.feature.desc.join('\n    ')}\n`;
      }
      emailMessage += `\n`;
    }

    if (alinhamentoSelecionado) {
      emailMessage += `--- Alinhamento: ${alinhamentoSelecionado.name} ---\n`;
      emailMessage += `  Descrição: ${alinhamentoSelecionado.desc}\n`;
      emailMessage += `\n`;
    }

    if (habilidadesDisponiveis.length > 0) {
      emailMessage += `--- Valores de Habilidade (Descrição Geral) ---\n`;
      habilidadesDisponiveis.forEach(hab => {
        emailMessage += `  ${hab.full_name}: ${hab.desc ? hab.desc[0] : 'N/A'}\n`;
      });
      emailMessage += `\n`;
    }

    if (proficienciasCombinadas.length > 0) {
      emailMessage += `--- Proficiências Combinadas (Raça + Classe) ---\n`;
      emailMessage += `  ${proficienciasCombinadas.join(', ')}\n`;
      emailMessage += `\n`;
    }

    emailMessage += `--- Informações do Usuário ---\n`;
    emailMessage += `  Nome: ${nomeUsuario}\n`;
    emailMessage += `  Email: ${emailUsuario}\n`;


    try {
      await emailjs.send(
        "service_h82hgf8",
        "template_7gkh8j3",
        {
          name: nomeUsuario,
          email: emailUsuario,
          message: emailMessage,
        },
        "3RzX9QMnCDjcuV0y_"
      );
      alert('E-mail com os detalhes do personagem enviado com sucesso!');

      setNomeUsuario('');
      setEmailUsuario('');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      alert('Erro ao enviar e-mail. Por favor, tente novamente.');
    }
  };



  return (
    <Container className="mt-4">
      {carregando && (<Container className="mt-4 text-center spinner-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando dados de personagem...</span>
        </Spinner>
        <p>Carregando ...</p>
      </Container>)}

      <h2>🧙 Detalhes do Personagem D&D 5e</h2>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Selecione a Raça:</Form.Label>
            <Form.Select onChange={handleRacaChange}>
              <option value="">-- Selecionar Raça --</option>
              {racasDisponiveis.map(raca => (
                <option key={raca.index} value={raca.url}>
                  {raca.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Selecione a Classe:</Form.Label>
            <Form.Select onChange={handleClasseChange}>
              <option value="">-- Selecionar Classe --</option>
              {classesDisponiveis.map(classe => (
                <option key={classe.index} value={classe.url}>
                  {classe.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Selecione o Plano de Fundo:</Form.Label>
            <Form.Select onChange={handlePlanoDeFundoChange}>
              <option value="">-- Selecionar Plano de Fundo --</option>
              {planosDeFundoDisponiveis.map(pf => (
                <option key={pf.index} value={pf.url}>
                  {pf.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Selecione o Alinhamento:</Form.Label>
            <Form.Select onChange={handleAlinhamentoChange}>
              <option value="">-- Selecionar Alinhamento --</option>
              {alinhamentosDisponiveis.map(al => (
                <option key={al.index} value={al.url}>
                  {al.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>


      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="formNomeUsuario">
            <Form.Label>Seu Nome:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formEmailUsuario">
            <Form.Label>Seu E-mail:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu e-mail"
              value={emailUsuario}
              onChange={(e) => setEmailUsuario(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Button
        variant="primary"
        onClick={enviarEmail}
        className="mb-4 primary-bt"
        disabled={!nomeUsuario || !emailUsuario || (!racaSelecionada && !classeSelecionada && !planoDeFundoSelecionado && !alinhamentoSelecionado)}
      >
        Enviar Informações por Email
      </Button>

      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><h4>Valores de Habilidade (Descrição Geral)</h4></Card.Header>
            <Card.Body>
              <Row>
                {habilidadesDisponiveis.map(hab => (
                  <Col xs={12} key={hab.index}>
                    <strong>{hab.full_name}:</strong> {hab.desc ? hab.desc[0] : 'N/A'}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {alinhamentoSelecionado && (
            <Card className="mb-3">
              <Card.Header><h4>Alinhamento: {alinhamentoSelecionado.name}</h4></Card.Header>
              <Card.Body>
                <p>{alinhamentoSelecionado.desc}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {racaSelecionada && (
            <Card className="mb-3">
              <Card.Header><h4>Detalhes da Raça: {racaSelecionada.name}</h4></Card.Header>
              <Card.Body>
                <p><strong>Velocidade:</strong> {racaSelecionada.speed}</p>
                <p><strong>Tamanho:</strong> {racaSelecionada.size}</p>
                {racaSelecionada.ability_bonuses && racaSelecionada.ability_bonuses.length > 0 && (
                  <p>
                    <strong>Bônus de Atributos:</strong>{' '}
                    {racaSelecionada.ability_bonuses.map(b => `${b.ability_score.name}: +${b.bonus}`).join(', ')}
                  </p>
                )}
                <p><strong>Idiomas (da Raça):</strong> {idiomasCombinados.join(', ') || 'N/A'}</p>
                {racaSelecionada.traits && racaSelecionada.traits.length > 0 && (
                  <>
                    <h6>Traços Raciais:</h6>
                    <ul>
                      {racaSelecionada.traits.map((trait, idx) => (
                        <li key={idx}>{trait.name}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          {classeSelecionada && (
            <Card className="mb-3">
              <Card.Header><h4>Detalhes da Classe: {classeSelecionada.name}</h4></Card.Header>
              <Card.Body>
                <p><strong>Dado de Vida:</strong> d{classeSelecionada.hit_die}</p>
                {classeSelecionada.proficiencies && classeSelecionada.proficiencies.length > 0 && (
                  <p>
                    <strong>Proficiências (da Classe):</strong>{' '}
                    {classeSelecionada.proficiencies.map(p => p.name.replace('Skill: ', '')).join(', ')}
                  </p>
                )}
                {classeSelecionada.saving_throws && classeSelecionada.saving_throws.length > 0 && (
                  <p>
                    <strong>Testes de Resistência:</strong>{' '}
                    {classeSelecionada.saving_throws.map(st => st.name).join(', ')}
                  </p>
                )}
                {classeSelecionada.subclasses && classeSelecionada.subclasses.length > 0 && (
                  <>
                    <h6>Subclasses:</h6>
                    <ul>
                      {classeSelecionada.subclasses.map((sc, index) => (
                        <li key={index}>{sc.name}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {planoDeFundoSelecionado && (
            <Card className="mb-3">
              <Card.Header><h4>Detalhes do Plano de Fundo: {planoDeFundoSelecionado.name}</h4></Card.Header>
              <Card.Body>
                {planoDeFundoSelecionado.starting_proficiencies && planoDeFundoSelecionado.starting_proficiencies.length > 0 && (
                  <p>
                    <strong>Proficiências Iniciais:</strong>{' '}
                    {planoDeFundoSelecionado.starting_proficiencies.map(p => p.name.replace('Skill: ', '')).join(', ')}
                  </p>
                )}
                {planoDeFundoSelecionado.feature && (
                  <>
                    <h6>Característica: {planoDeFundoSelecionado.feature.name}</h6>
                    {planoDeFundoSelecionado.feature.desc.map((desc, idx) => (
                      <p key={idx}>{desc}</p>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><h4>Proficiências Combinadas</h4></Card.Header>
            <Card.Body>
              {proficienciasCombinadas.length > 0 ? (
                <ul>
                  {proficienciasCombinadas.map((prof, index) => (
                    <li key={index}>{prof}</li>
                  ))}
                </ul>
              ) : (
                <p>Selecione uma raça e classe para ver as proficiências combinadas.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DnDCharacterViewer;