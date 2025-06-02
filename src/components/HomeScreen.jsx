import "../css/HomeScreen.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imagemLogo from "../assets/logobikegrow.png";
import imagemCiclista from "../assets/ciclista.png";
import chatbot from "../assets/chatbotfundo.png"

function HomeScreen() {
  const [estatisticas, setEstatisticas] = useState({
    bicicletas: 0,
    clientes: 0,
    contratos: 0,
  });

  useEffect(() => {
  const fetchEstatisticas = () => {
    fetch("http://localhost:8080/api/bicicletas/estatisticas")
      .then((res) => res.json())
      .then((data) => setEstatisticas(data))
      .catch((error) => console.error("Erro ao buscar estatísticas:", error));
  };

  fetchEstatisticas();
  const intervalId = setInterval(fetchEstatisticas, 5000)

  return () => clearInterval(intervalId);
}, []);


  return (
    <section className="homescreen">
      <header>
        <div className="nav-bar">
          <img className="logo" src={imagemLogo} alt="logo" title="logo" />
          <Link to="/bicicletas">BICICLETAS</Link>
          <Link to="/clientes">CLIENTES</Link>
          <Link to="/contratos">CONTRATOS</Link>
          <Link to="/contratos">PAGAMENTOS</Link>
        </div>

        <div className="body">
          <img className="ciclista" src={imagemCiclista} alt="imagem-ciclista" title="imagem-ciclista" />
          <div className="esfera-central"></div>
          <h2 className="wheels">WHEELS<strong className="ponto">.</strong></h2>
          <div className="version">
            <h2>VERSION<p>2.0</p></h2>
          </div>
          <h2 className="bicicletas">BICICLETAS.</h2>
          <p className="quadrado">■</p>
          <h2 className="welcome">welcome to the<br /> wheels system</h2>
          <h2 className="gerenciamento">GERENCIAMENTO</h2>
          <p className="texto">
            Acesso rápido ao cadastro e controle de <br />
            bicicletas, clientes, contratos e pagamentos. <br />
            Tudo em um só lugar, com navegação simples <br />
            e visual moderno.
          </p>
          <Link to="/novo-aluguel">
            <button className="botaoRegistrar">REGISTRAR</button>
          </Link>
          <Link to="/novo-aluguel" className="logoChat"><img src={chatbot} alt="logo-chatbot" title="logo-chatbot"></img></Link>
          <p className="setas">↶↷</p>

          <div className="rodape">
            <div className="informacoes">
              <p><span className="mais">+ </span><span className="numero">{estatisticas.bicicletas}</span><span className="light"> BICICLETAS</span><br></br><span className="destaque"> CADASTRADAS</span></p>
              <p><span className="mais">+ </span><span className="numero">{estatisticas.clientes}</span><span className="light"> CLIENTES</span><br></br><span className="destaque"> NOVOS</span></p>
              <p><span className="mais">+ </span><span className="numero">{estatisticas.contratos}</span><span className="light"> CONTRATOS</span><br></br><span className="destaque1"> REALIZADOS</span></p>
            </div>
          </div>
        </div>
        
      </header>
    </section>
  );
}

export default HomeScreen;
