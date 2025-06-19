⚔️ D&amp;D 5e - API Explorer ⚔️
Aluno: Rodrigo Bento de Macedo
Curso: Desenvolvimento Web Front End

📜 Sobre o Projeto
Este projeto é uma aplicação web desenvolvida com React e Bootstrap, projetada para interagir com a D&amp;D 5e API. A aplicação permite aos usuários explorar diversas informações do universo de Dungeons & Dragons, como magias, equipamentos, monstros e detalhes de personagens.

O sistema conta com autenticação de usuário, rotas privadas, e funcionalidades de auditoria que registram a atividade do usuário e a enviam por e-mail para o administrador ao final da sessão.

Credenciais de Acesso:

login: macedo
senha: 12345

Atenção!
para testar a funcionalidade auditoria será necessário ir ate Menu.js e colocar em 'const templateParams' o email para o recebimento do log

---

✨ Funcionalidades Principais
Sistema de Login: Acesso seguro à plataforma com rotas privadas protegidas.
Visualizador de Personagem: Permite aos usuários selecionar raça, classe, antecedentes e alinhamento para ver detalhes combinados de um personagem de D&amp;D.
Envio de Ficha por E-mail: O visualizador de personagem possui um formulário integrado com EmailJS para enviar os detalhes do personagem para o e-mail do usuário.
Explorador de Feitiços: Lista todos os feitiços de D&amp;D 5e, com uma função de busca e exibição detalhada de cada magia.
Catálogo de Equipamentos: Apresenta uma lista de equipamentos, armaduras e armas, permitindo a busca e visualização de detalhes como custo, peso, dano e propriedades.
Bestiário de Monstros: Permite explorar uma lista de monstros, com a opção de buscar por nome e ver estatísticas detalhadas como pontos de vida, classe de armadura, habilidades e ações.
Auditoria de Acesso e Navegação:
Registra o momento do login e todas as páginas que o usuário visita durante a sessão.
Ao fazer logout, um relatório completo da atividade do usuário é enviado para um e-mail de administrador.
Página 404: Rota para páginas não encontradas, garantindo uma boa experiência de usuário.
Feedback Visual: Utiliza spinners de carregamento durante as requisições às APIs.
foi adcionado uma 'const sleep' para simular lentidão e demonstrar spinner
---

Entendendo a "Proficiência"
A proficiência é um dos conceitos fundamentais do jogo Dungeons & Dragons (D&D) 5ª Edição, e esta aplicação a utiliza para construir os detalhes de um personagem.

No D&D, ser "proficiente" em algo significa que o personagem é treinado ou especialmente talentoso naquela área. Isso se traduz em um bônus numérico, chamado Bônus de Proficiência, que é somado a diversas rolagens de dados, aumentando a chance de sucesso.

Este bônus pode ser aplicado em:

Testes de Perícia: Como Furtividade (Stealth), Persuasão (Persuasion) ou Atletismo (Athletics).
Testes de Resistência: Para resistir a feitiços, venenos e outros efeitos adversos.
Jogadas de Ataque: Ao usar armas com as quais o personagem é treinado.
Uso de Ferramentas e Armaduras: Permite o uso eficaz de equipamentos específicos.
A aplicação, em especial na tela de Visualizador de Personagem, busca e combina as proficiências concedidas por diferentes aspectos de um personagem, exatamente como no livro de regras:

Proficiências da Raça (ex: Anões são proficientes com machados).
Proficiências da Classe (ex: Magos são proficientes com cajados).
Proficiências do Plano de Fundo (ex: um Criminoso é proficiente com ferramentas de ladrão).
Ao final, a lista de "Proficiências Combinadas" representa o conjunto total de talentos e treinamentos que o personagem teria.
--

🚀 Instalações Necessárias
Para configurar o ambiente de desenvolvimento, instale as seguintes dependências:
```bash
npm install react-router-dom
npm install react-spinners
npm install react-icons
npm install --save @emailjs/browser
npm install react-scripts@latest
```
## ⬇️ Pré-requisitos

Certifique-se de que você tenha instalado:

- **Node.js** `>= 18.x.x`  
- **npm** `>= 9.x.x`  
- **React** `18.x`

---

## 🏁execute o comando abaixo para instalar todas as dependências listadas no package.json:

```bash
npm install

```
---
🏁 Como Executar o Projeto
Após clonar o repositório e instalar as dependências, execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:

```Bash

npm start
```

A aplicação será aberta em http://localhost:3000 no seu navegador.


---



🎨 Tecnologias Utilizadas
React
React Router DOM
React Bootstrap
React Icons
React Spinners
EmailJS
Axios (para consumo de API)
JavaScript (ES6+)
CSS3

---

## 📃 Licença

Este é um projeto acadêmico, desenvolvido com fins educacionais.

---

> Desenvolvido por Rodrigo Bento de Macedo — 2025