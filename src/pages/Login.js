import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ login: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.login === "macedo" && form.senha === "12345") {
      alert("Login realizado com sucesso!");
      onLoginSuccess(); // marca como autenticado

      // --- INÍCIO DA AUDITORIA ---
      const auditLog = [{
        event: 'LOGIN',
        user: form.login,
        timestamp: new Date().toISOString()
      }];
      // Armazena o log inicial e o usuário atual na sessão
      sessionStorage.setItem('auditLog', JSON.stringify(auditLog));
      localStorage.setItem('currentUser', form.login);
      // --- FIM DA AUDITORIA ---

      navigate("/dnd-character-viewer");  
    } else {
      alert("Login ou senha inválidos!");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group className="mb-3">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
            placeholder="Digite o usuário"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite a senha"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;