import React, { useEffect, useState } from "react";
import './index.css';

function Footer(props) {

    //Troca de estado 
    const [contagem, setContagem] = useState(1)

    //Escuta o estado 
    useEffect(() => {
        if (contagem === 10) {
            apresentarAlerta()
        }
    }, [contagem]);

    //Função disparada no onClick do buttom 
    const apresentaMenu = () => {
        setContagem(contagem + 1)
      //  alert("Cheguei aqui....")
    }

    //Função disparada do useEffect 
    const apresentarAlerta = () => {
        alert("Cheguei aqui e sou igual a 10....")
    }


     return (
        contagem < 10 ? (
<>
            <h1> Pagina com o Footer </h1>
            <div className="geral">
                <div className="alert alert-primary" role="alert">
                    Rodapé Alerta!

                    <p>Instagram: {props.insta} </p>
                    <p>Whats: {props.whats} </p>
                </div>

                <button onClick={apresentaMenu}>Contar</button>
                <p> Total de visitas ao App: {contagem} </p>

            </div>

</>  

        ) : <p> maior que 10</p>
    );

    
}

export default Footer;