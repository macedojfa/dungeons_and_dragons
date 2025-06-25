import React from 'react';
import { Container, Card, ListGroup, Badge } from 'react-bootstrap';
import './index.css';

function Sobre() {
  return (
    <Container className="sobre-container mt-4">
      <Card>
        <Card.Header as="h2">📜 Sobre o Projeto</Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Grupo:</strong> G1 <br />
            <strong>Aluno:</strong> Rodrigo Bento de Macedo
          </Card.Text>
          <hr />
          <Card.Text>
            Este projeto é uma aplicação web desenvolvida com React e Bootstrap, projetada para interagir com a D&D 5e API. A aplicação permite aos usuários explorar diversas informações do universo de Dungeons & Dragons, como magias, equipamentos, monstros e detalhes de personagens.
          </Card.Text>
          <Card.Text>
            O sistema conta com autenticação de usuário, rotas privadas, e funcionalidades de auditoria que registram a atividade do usuário e a enviam por e-mail para o administrador ao final da sessão.
          </Card.Text>
          <Card.Title as="h5" className="mt-3">Credenciais de Acesso:</Card.Title>
          <ListGroup horizontal className="mb-3">
            <ListGroup.Item><strong>Login:</strong> macedo</ListGroup.Item>
            <ListGroup.Item><strong>Senha:</strong> 12345</ListGroup.Item>
          </ListGroup>
          <Card.Text>
            <Badge bg="warning" text="dark">Atenção!</Badge> Para testar a funcionalidade de auditoria, será necessário ir até <strong>maim\src\pages\Menu\index.js</strong> e colocar em 'const templateParams' o e-mail para o recebimento do log.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h2">✨ Funcionalidades Principais</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Sistema de Login:</strong> Acesso seguro à plataforma com rotas privadas protegidas.</ListGroup.Item>
          <ListGroup.Item><strong>Visualizador de Personagem:</strong> Permite aos usuários selecionar raça, classe, antecedentes e alinhamento para ver detalhes combinados.</ListGroup.Item>
          <ListGroup.Item><strong>Envio de Ficha por E-mail:</strong> Formulário integrado com EmailJS para enviar os detalhes do personagem.</ListGroup.Item>
          <ListGroup.Item><strong>Explorador de Feitiços, Equipamentos e Monstros:</strong> Listas com busca e exibição de detalhes.</ListGroup.Item>
          <ListGroup.Item><strong>Auditoria de Acesso e Navegação:</strong> Registra a atividade do usuário e envia por e-mail no logout.</ListGroup.Item>
          <ListGroup.Item><strong>Feedback Visual:</strong> Utiliza spinners de carregamento durante as requisições às APIs. Foi adicionada uma 'const sleep' para simular lentidão e demonstrar o spinner.</ListGroup.Item>
        </ListGroup>
      </Card>

      <Card className="mt-4">
        <Card.Header as="h2">Entendendo a "Proficiência"</Card.Header>
        <Card.Body>
          <Card.Text>
            A proficiência é um dos conceitos fundamentais do jogo Dungeons & Dragons (D&D) 5ª Edição. Representa o treinamento de um personagem, concedendo um **Bônus de Proficiência** a diversas rolagens de dados para aumentar a chance de sucesso em:
          </Card.Text>
          <ul>
            <li>Testes de Perícia (Furtividade, Persuasão, etc.).</li>
            <li>Testes de Resistência (contra feitiços, venenos).</li>
            <li>Jogadas de Ataque com armas em que o personagem é treinado.</li>
          </ul>
          <Card.Text>
            A aplicação busca e combina as proficiências da Raça, Classe e Plano de Fundo do personagem para fornecer uma visão completa.
          </Card.Text>
        </Card.Body>
      </Card>

       <Card className="mt-4">
        <Card.Header as="h2">🚀 Instalações e Execução</Card.Header>
        <Card.Body>
            <Card.Title as="h5">Pré-requisitos</Card.Title>
            <ul>
                <li><strong>Node.js</strong>`&gt;= 18.x.x`</li>
                <li><strong>npm</strong> `&gt;= 9.x.x`</li>
                <li><strong>React</strong> `18.x`</li>
            </ul>
            <hr/>
            <Card.Title as="h5">Instalação de Dependências</Card.Title>
            <Card.Text>Para instalar todas as dependências do projeto, execute no terminal:</Card.Text>
            <pre><code>npm install</code></pre>
            <hr/>
            <Card.Title as="h5">Como Executar o Projeto</Card.Title>
             <Card.Text>Após instalar as dependências, execute o seguinte comando para iniciar a aplicação:</Card.Text>
            <pre><code>npm start</code></pre>
            <Card.Text>A aplicação será aberta em <a href="http://localhost:3000">http://localhost:3000</a>.</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Sobre;