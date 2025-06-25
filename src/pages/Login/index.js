import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './index.css';

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
    <div className="login align-center">
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <div className="center align-center content">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="form-center align-center">
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
        </form>
      </div>
    </div>
  );
}

export default Login;