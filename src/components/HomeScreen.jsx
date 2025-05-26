import "../css/HomeScreen.css";
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
            Mobilidade sobre Duas Rodas com <br></br>Qualidade e Eficiência
          </p>
        </div>
        <div className="centralbuttons">
          <a href="/novo-aluguel">
            <button className="big-orange">Novo Aluguel</button>
          </a>
          <img
            className="logobike"
            src={imagem2}
            alt="logo do site de bike"
            title="logo do site de bike"
          />
          <a href="/novo-aluguel">
            <button className="big-bot">
              <img
                src={imagem1}
                alt="logo do chatbot"
                title="logo do chatbot"
              />
            </button>
          </a>
        </div>

        <div className="dropdown-menu-container">
          <div className="dropdown">
            <button className="dropbtn">
              <img
                className=""
                src={imagem9}
                alt="Menu do site"
                title="Menu do site"
              />
            </button>
            <div className="dropdown-content">
              <a href="/contratos">Lista de Contratos</a>
              <a href="/bicicletas">Lista de Bicicletas</a>
              <a href="/clientes">Lista de Clientes</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
