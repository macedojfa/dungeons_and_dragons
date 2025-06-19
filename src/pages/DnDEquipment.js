import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function DnDEquipment() {
  const [listaEquipamentos, setListaEquipamentos] = useState([]);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoEquipamento, setCarregandoEquipamento] = useState(false);
  const [erro, setErro] = useState(null);
  const [termoBuscaEquipamento, setTermoBuscaEquipamento] = useState('');

  // Novos estados para busca por índice
  const [termoBuscaCategoria, setTermoBuscaCategoria] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [carregandoCategoria, setCarregandoCategoria] = useState(false);
  const [erroCategoria, setErroCategoria] = useState(null);

  const [termoBuscaItemMagico, setTermoBuscaItemMagico] = useState('');
  const [itemMagicoSelecionado, setItemMagicoSelecionado] = useState(null);
  const [carregandoItemMagico, setCarregandoItemMagico] = useState(false);
  const [erroItemMagico, setErroItemMagico] = useState(null);

  const [termoBuscaPropriedadeArma, setTermoBuscaPropriedadeArma] = useState('');
  const [propriedadeArmaSelecionada, setPropriedadeArmaSelecionada] = useState(null);
  const [carregandoPropriedadeArma, setCarregandoPropriedadeArma] = useState(false);
  const [erroPropriedadeArma, setErroPropriedadeArma] = useState(null);


  // Busca a lista de equipamentos ao montar o componente
  useEffect(() => {
    const buscarEquipamentos = async () => {
      setCarregandoLista(true);
      setErro(null);
      try {
        const response = await axios.get('https://www.dnd5eapi.co/api/equipment');
        setListaEquipamentos(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar lista de equipamentos:", err);
        setErro("Falha ao carregar a lista de equipamentos. Tente novamente mais tarde.");
      } finally {
        //setCarregandoLista(false);
        await sleep(4000); 
     setCarregandoLista(false);
      }
    };

    buscarEquipamentos();
  }, []);

  // Busca os detalhes de um equipamento selecionado (pela lista)
  const buscarDetalhesEquipamento = async (urlEquipamento) => {
    setCarregandoEquipamento(true);
    setErro(null);
    setEquipamentoSelecionado(null); 
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${urlEquipamento}`);
      setEquipamentoSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar detalhes do equipamento:", err);
      setErro("Equipamento não encontrado ou erro ao buscar detalhes.");
    } finally {
    //setCarregandoEquipamento(false);
      await sleep(4000); 
    setCarregandoEquipamento(false);
    }
  };

  // Busca detalhes de Categoria de Equipamento por índice
  const buscarCategoriaPorIndice = async () => {
    if (!termoBuscaCategoria) {
      setCategoriaSelecionada(null);
      setErroCategoria(null);
      return;
    }
    setCarregandoCategoria(true);
    setErroCategoria(null);
    setCategoriaSelecionada(null);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co/api/equipment-categories/${termoBuscaCategoria.toLowerCase().replace(/\s/g, '-')}`);
      setCategoriaSelecionada(response.data);
    } catch (err) {
      console.error("Erro ao buscar categoria:", err);
      setErroCategoria("Categoria não encontrada.");
    } finally {
      //setCarregandoCategoria(false);
      await sleep(4000); 
      setCarregandoCategoria(false);
    }
  };

  // Busca detalhes de Item Mágico por índice
  const buscarItemMagicoPorIndice = async () => {
    if (!termoBuscaItemMagico) {
      setItemMagicoSelecionado(null);
      setErroItemMagico(null);
      return;
    }
    setCarregandoItemMagico(true);
    setErroItemMagico(null);
    setItemMagicoSelecionado(null);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co/api/magic-items/${termoBuscaItemMagico.toLowerCase().replace(/\s/g, '-')}`);
      setItemMagicoSelecionado(response.data);
    } catch (err) {
      console.error("Erro ao buscar item mágico:", err);
      setErroItemMagico("Item mágico não encontrado.");
    } finally {
      //setCarregandoItemMagico(false);
      await sleep(4000); 
     setCarregandoItemMagico(false);
    }
  };

  // Busca detalhes de Propriedade de Arma por índice
  const buscarPropriedadeArmaPorIndice = async () => {
    if (!termoBuscaPropriedadeArma) {
      setPropriedadeArmaSelecionada(null);
      setErroPropriedadeArma(null);
      return;
    }
    setCarregandoPropriedadeArma(true);
    setErroPropriedadeArma(null);
    setPropriedadeArmaSelecionada(null);
    try {
      const response = await axios.get(`https://www.dnd5eapi.co/api/weapon-properties/${termoBuscaPropriedadeArma.toLowerCase().replace(/\s/g, '-')}`);
      setPropriedadeArmaSelecionada(response.data);
    } catch (err) {
      console.error("Erro ao buscar propriedade de arma:", err);
      setErroPropriedadeArma("Propriedade de arma não encontrada.");
    } finally {
    //setCarregandoPropriedadeArma(false);
      await sleep(4000); 
    setCarregandoPropriedadeArma(false);
    }
  };


  const handleMudancaBuscaEquipamento = (e) => {
    setTermoBuscaEquipamento(e.target.value);
  };

  const equipamentosFiltrados = listaEquipamentos.filter(equipamento =>
    equipamento.name.toLowerCase().includes(termoBuscaEquipamento.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2>🛡️ Equipamentos de D&D 5e</h2>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Row className="mb-4">
       
        <Col md={4}>
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Buscar Equipamento (na lista):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Shortsword, Plate Armor"
                value={termoBuscaEquipamento}
                onChange={handleMudancaBuscaEquipamento}
              />
            </Form.Group>
          </Form>

          {carregandoLista ? (
            <Spinner animation="border" size="sm" role="status"><span className="visually-hidden">Carregando equipamentos...</span></Spinner>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto', borderRight: '1px solid #eee', paddingRight: '15px' }}>
              <ul className="list-group">
                {equipamentosFiltrados.map(equipamento => (
                  <li
                    key={equipamento.index}
                    className={`list-group-item list-group-item-action ${equipamentoSelecionado?.index === equipamento.index ? 'active' : ''}`}
                    onClick={() => buscarDetalhesEquipamento(equipamento.url)}
                    style={{ cursor: 'pointer' }}
                  >
                    {equipamento.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>

       
        <Col md={8}>
          {carregandoEquipamento ? (
            <Spinner animation="border" role="status"><span className="visually-hidden">Carregando detalhes do equipamento...</span></Spinner>
          ) : equipamentoSelecionado ? (
            <Card>
              <Card.Header>
                <h4>{equipamentoSelecionado.name}</h4>
                <p className="mb-0"><em>{equipamentoSelecionado.equipment_category.name}</em></p>
              </Card.Header>
              <Card.Body>
                {equipamentoSelecionado.cost && (
                  <p><strong>Custo:</strong> {equipamentoSelecionado.cost.quantity} {equipamentoSelecionado.cost.unit}</p>
                )}
                {equipamentoSelecionado.weight && <p><strong>Peso:</strong> {equipamentoSelecionado.weight} lbs</p>}
                
                {/* Detalhes específicos para armas */}
                {equipamentoSelecionado.weapon_range && <p><strong>Alcance (Arma):</strong> {equipamentoSelecionado.weapon_range}</p>}
                {equipamentoSelecionado.damage && equipamentoSelecionado.damage.damage_type && (
                  <p><strong>Dano:</strong> {equipamentoSelecionado.damage.damage_dice} ({equipamentoSelecionado.damage.damage_type.name})</p>
                )}
                {equipamentoSelecionado.properties && equipamentoSelecionado.properties.length > 0 && (
                  <p>
                    <strong>Propriedades:</strong>{' '}
                    {equipamentoSelecionado.properties.map(prop => prop.name).join(', ')}
                  </p>
                )}

                {/* Detalhes específicos para armaduras */}
                {equipamentoSelecionado.armor_category && <p><strong>Categoria de Armadura:</strong> {equipamentoSelecionado.armor_category}</p>}
                {equipamentoSelecionado.armor_class && (
                  <p>
                    <strong>CA:</strong> {equipamentoSelecionado.armor_class.base}
                    {equipamentoSelecionado.armor_class.dex_bonus ? ' + Modificador de DEX' : ''}
                    {equipamentoSelecionado.str_minimum && ` (Mínimo de Força: ${equipamentoSelecionado.str_minimum})`}
                  </p>
                )}
                 {equipamentoSelecionado.stealth_disadvantage && <p><strong>Desvantagem em Furtividade:</strong> Sim</p>}

                {/* Descrição geral se existir */}
                {equipamentoSelecionado.desc && equipamentoSelecionado.desc.length > 0 && (
                  <>
                    <h5>Descrição:</h5>
                    {equipamentoSelecionado.desc.map((paragrafo, index) => (
                      <p key={index}>{paragrafo}</p>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">Selecione um equipamento da lista para ver seus detalhes.</Alert>
          )}
        </Col>
      </Row>

      
      <hr className="my-5" />
      <h3>Busca por Índice (Nome Exato/Slug)</h3>

      <Row className="mb-4">
        
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><h4>Buscar Categoria de Equipamento</h4></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Índice da Categoria (Ex: "armor", "melee-weapons"):</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o índice da categoria"
                  value={termoBuscaCategoria}
                  onChange={(e) => setTermoBuscaCategoria(e.target.value)}
                />
              </Form.Group>
              <Button onClick={buscarCategoriaPorIndice} disabled={carregandoCategoria}>
                {carregandoCategoria ? <Spinner animation="border" size="sm" /> : 'Buscar Categoria'}
              </Button>
              {erroCategoria && <Alert variant="danger" className="mt-3">{erroCategoria}</Alert>}
              {categoriaSelecionada && (
                <div className="mt-3">
                  <h5>Detalhes da Categoria: {categoriaSelecionada.name}</h5>
                  <p><strong>URL:</strong> {categoriaSelecionada.url}</p>
                  {categoriaSelecionada.equipment && categoriaSelecionada.equipment.length > 0 && (
                    <>
                      <h6>Alguns Equipamentos nesta Categoria:</h6>
                      <ul>
                        {categoriaSelecionada.equipment.slice(0, 5).map((item, index) => ( // Mostra os primeiros 5
                          <li key={index}>{item.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><h4>Buscar Item Mágico</h4></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Índice do Item Mágico (Ex: "belt-of-giant-strength", "cloak-of-protection"):</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o índice do item mágico"
                  value={termoBuscaItemMagico}
                  onChange={(e) => setTermoBuscaItemMagico(e.target.value)}
                />
              </Form.Group>
              <Button onClick={buscarItemMagicoPorIndice} disabled={carregandoItemMagico}>
                {carregandoItemMagico ? <Spinner animation="border" size="sm" /> : 'Buscar Item Mágico'}
              </Button>
              {erroItemMagico && <Alert variant="danger" className="mt-3">{erroItemMagico}</Alert>}
              {itemMagicoSelecionado && (
                <div className="mt-3">
                  <h5>Detalhes do Item Mágico: {itemMagicoSelecionado.name}</h5>
                  {itemMagicoSelecionado.desc && itemMagicoSelecionado.desc.length > 0 && (
                    <>
                      <h6>Descrição:</h6>
                      {itemMagicoSelecionado.desc.map((desc, index) => (
                        <p key={index}>{desc}</p>
                      ))}
                    </>
                  )}
                  <p><strong>Raridade:</strong> {itemMagicoSelecionado.rarity?.name || 'N/A'}</p>
                  <p><strong>Variante:</strong> {itemMagicoSelecionado.variant ? 'Sim' : 'Não'}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
       
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header><h4>Buscar Propriedade de Arma</h4></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Índice da Propriedade (Ex: "loading", "light"):</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o índice da propriedade"
                  value={termoBuscaPropriedadeArma}
                  onChange={(e) => setTermoBuscaPropriedadeArma(e.target.value)}
                />
              </Form.Group>
              <Button onClick={buscarPropriedadeArmaPorIndice} disabled={carregandoPropriedadeArma}>
                {carregandoPropriedadeArma ? <Spinner animation="border" size="sm" /> : 'Buscar Propriedade'}
              </Button>
              {erroPropriedadeArma && <Alert variant="danger" className="mt-3">{erroPropriedadeArma}</Alert>}
              {propriedadeArmaSelecionada && (
                <div className="mt-3">
                  <h5>Detalhes da Propriedade: {propriedadeArmaSelecionada.name}</h5>
                  {propriedadeArmaSelecionada.desc && propriedadeArmaSelecionada.desc.length > 0 && (
                    <>
                      <h6>Descrição:</h6>
                      {propriedadeArmaSelecionada.desc.map((desc, index) => (
                        <p key={index}>{desc}</p>
                      ))}
                    </>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DnDEquipment;