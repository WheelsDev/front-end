import "../css/HomeScreen.css";
import { Link } from "react-router-dom";
import imagem2 from "../assets/logobike.png";
import imagem1 from "../assets/chatbot.png";
import imagem9 from "../assets/menu.svg";

function HomeScreen() {
  return (
    <>
      <section id="homescreenpage">
        <div className="esfera1">
          <div className="esfera2">
            <div className="esfera3"></div>
          </div>
        </div>
        <div className="textos1">
          <h2>Bem Vindo ao Sistema Wheels!</h2>
        </div>
        <div className="textos2">
          <p>
            Mobilidade sobre Duas Rodas com <br />Qualidade e Eficiência
          </p>
        </div>
        <div className="centralbuttons">
          <Link to="/novo-aluguel">
            <button className="big-orange">Novo Aluguel</button>
          </Link>
          <img
            className="logobike"
            src={imagem2}
            alt="logo do site de bike"
            title="logo do site de bike"
          />
          <Link to="/novo-aluguel">
            <button className="big-bot">
              <img src={imagem1} alt="logo do chatbot" title="logo do chatbot" />
            </button>
          </Link>
        </div>

        <div className="dropdown-menu-container">
          <div className="dropdown">
            <button className="dropbtn">
              <img src={imagem9} alt="Menu do site" title="Menu do site" />
            </button>
            <div className="dropdown-content">
              <Link to="/contratos">Lista de Contratos</Link>
              <Link to="/bicicletas">Lista de Bicicletas</Link>
              <Link to="/clientes">Lista de Clientes</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
