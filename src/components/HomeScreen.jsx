import "../css/HomeScreen.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imagemLogo from "../assets/logobikegrow.png";
import imagemCiclista from "../assets/ciclista.png";
import chatbot from "../assets/chatbotfundo.png";
import close from "../assets/seta.png";

function OverlayPagamentos({ onClose }) {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/pagamentos/grafico")
      .then((res) => res.json())
      .then((data) => {
        setPagamentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar pagamentos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <img className="close" src={close} alt="seta" title="seta" />
        </button>
        {loading ? (
          <p>Carregando...</p>
        ) : pagamentos.length === 0 ? (
          <p>Nenhum pagamento encontrado.</p>
        ) : (
          <table className="pagamentos-table">
            <thead>
              <tr>
                <th>Contrato</th>
                <th>Cliente</th>
                <th>Valor Total</th>
                <th>Valor em Aberto</th>
                <th>Data Pagamento</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pag) => (
                <tr key={pag.contratoId || pag.id}>
                  <td>{pag.contratoId}</td>
                  <td>{pag.clienteNome}</td>
                  <td>R$ {pag.valorTotal.toFixed(2)}</td>
                  <td>R$ {pag.pagamentoEmFalta?.toFixed(2) || '0.00'}</td>
                  <td>{new Date(pag.dataPagamento).toLocaleDateString()}</td>
                  <td>{pag.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function HomeScreen() {
  const [estatisticas, setEstatisticas] = useState({
    bicicletas: 0,
    clientes: 0,
    contratos: 0,
  });

  const [showPagamentos, setShowPagamentos] = useState(false);

  useEffect(() => {
    const fetchEstatisticas = () => {
      fetch("http://localhost:8080/api/bicicletas/estatisticas")
        .then((res) => res.json())
        .then((data) => {
          setEstatisticas(data);
        })
        .catch((error) => console.error("Erro ao buscar estatísticas:", error));
    };

    fetchEstatisticas();
    const intervalId = setInterval(fetchEstatisticas, 5000);

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
          <button className="btnPagamentos" onClick={() => setShowPagamentos(true)}>PAGAMENTOS</button>
        </div>

        <div className="body">
          <img
            className="ciclista"
            src={imagemCiclista}
            alt="imagem-ciclista"
            title="imagem-ciclista"
          />
          <div className="esfera-central"></div>
          <h2 className="wheels">
            WHEELS<strong className="ponto">.</strong>
          </h2>
          <div className="version">
            <h2>
              VERSION<p>2.0</p>
            </h2>
          </div>
          <h2 className="bicicletas">BICICLETAS.</h2>
          <p className="quadrado">■</p>
          <h2 className="welcome">
            welcome to the
            <br /> wheels system
          </h2>
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
          <Link to="/novo-aluguel" className="logoChat">
            <img src={chatbot} alt="logo-chatbot" title="logo-chatbot" />
          </Link>
          <p className="setas">↶↷</p>

          <div className="rodape">
            <div className="informacoes">
              <p>
                <span className="mais">+ </span>
                <span className="numero">{estatisticas.bicicletas}</span>
                <span className="light"> BICICLETAS</span>
                <br></br>
                <span className="destaque"> CADASTRADAS</span>
              </p>
              <p>
                <span className="mais">+ </span>
                <span className="numero">{estatisticas.clientes}</span>
                <span className="light"> CLIENTES</span>
                <br></br>
                <span className="destaque"> NOVOS</span>
              </p>
              <p>
                <span className="mais">+ </span>
                <span className="numero">{estatisticas.contratos}</span>
                <span className="light"> CONTRATOS</span>
                <br></br>
                <span className="destaque1"> REALIZADOS</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {showPagamentos && <OverlayPagamentos onClose={() => setShowPagamentos(false)} />}
    </section>
  );
}

export default HomeScreen;
