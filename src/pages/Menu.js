import React, { useEffect, useRef } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logox from './logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
    FaScroll,
    FaShieldAlt,
    FaUserShield,
    FaDragon,
    FaSignOutAlt,
     FaInfoCircle
} from 'react-icons/fa';

const Menu = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isInitialMount = useRef(true);

    // Efeito para rastrear a navegação do usuário
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return;

        const storedLogs = sessionStorage.getItem('auditLog');
        const auditLog = storedLogs ? JSON.parse(storedLogs) : [];

        auditLog.push({
            event: 'VIEW_PAGE',
            user: currentUser,
            path: location.pathname,
            timestamp: new Date().toISOString()
        });

        sessionStorage.setItem('auditLog', JSON.stringify(auditLog));

    }, [location.pathname]);

    // Função para enviar e-mail e fazer logout
    const handleLogout = async () => {
        const storedLogs = sessionStorage.getItem('auditLog');
        const currentUser = localStorage.getItem('currentUser');
        
        if (storedLogs && currentUser) {
            const auditLog = JSON.parse(storedLogs);
            
            const auditMessage = auditLog.map(log => 
                `[${new Date(log.timestamp).toLocaleString('pt-BR')}] - ${log.event}: ${log.path || 'Login Action'}`
            ).join('\n');

            
            const templateParams = {
                name: `Auditoria - ${currentUser}`, 
                email: 'macedo613@gmail.com', // email de quem receberá o relatório
                message: auditMessage, // auditoria log
            };
            
            try {
                
                await emailjs.send(
                    "service_h82hgf8",
                    "template_7gkh8j3", 
                    templateParams,
                    "3RzX9QMnCDjcuV0y_"
                );
                alert("Relatório de auditoria enviado com sucesso. Fazendo logout.");
            } catch (error) {
                console.error('Erro ao enviar relatório de auditoria:', error);
                alert('Não foi possível enviar o relatório de auditoria. Verifique o console para mais detalhes.');
            }
        }
        
        localStorage.removeItem("auth");
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("auditLog");
        navigate('/login');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/dnd-character-viewer">
                        <img className='App-logo' src={logox} width={60} alt=" logo " /> App DnD
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/dnd-character-viewer"> <FaUserShield /> Personagem </Nav.Link>
                            <Nav.Link as={Link} to="/dnd-spells"> <FaScroll /> Feitiços </Nav.Link>
                            <Nav.Link as={Link} to="/dnd-equipment"> <FaShieldAlt /> Equipamentos </Nav.Link>
                            <Nav.Link as={Link} to="/dnd-monsters"> <FaDragon /> Monstros </Nav.Link>
                            <Nav.Link as={Link} to="/sobre"> <FaInfoCircle /> Sobre </Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="outline-danger" onClick={handleLogout}>
                                <FaSignOutAlt /> Sair
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main>
                {children}
            </main>
            
            <footer className="bg-light text-center text-lg-start mt-auto">
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2025 Rodrigo Bento de Macedo:
                    <a className="text-dark" href="https://uniacademia.edu.br" target='_blank' rel="noreferrer" > Desenvolvimento Front End </a>
                </div>
            </footer>
        </>
    );
};

export default Menu;