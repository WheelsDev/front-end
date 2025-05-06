import '../css/HomeScreen.css'
import imagem1 from "../assets/homebike.png"
import imagem2 from "../assets/logobike.png"

function HomeScreen() {
 
  return (
    <>
<section id="homescreenpage">
    <div className='esfera1'><div className='esfera2'><div className='esfera3'></div></div></div>
    <div className='textos1'>
      <h2>Bem Vindo ao Sistema Wheels!</h2>
    </div>
    <div className='textos2'>
      <p>O Wheels é um sistema moderno e eficiente para gerenciamento de aluguel de bicicletas. Desenvolvido com foco na mobilidade urbana sustentável, ele oferece uma plataforma intuitiva tanto para clientes quanto para administradores. Os usuários podem visualizar bicicletas disponíveis, alugar com poucos cliques e acompanhar seus contratos em tempo real. Já os administradores têm controle completo sobre cadastros, devoluções e manutenção de bicicletas. O sistema também gera relatórios de uso e contratos, otimizando a gestão operacional. A interface é responsiva e acessível, garantindo uma boa experiência em qualquer dispositivo. Com segurança de dados e performance otimizada, o Wheels se destaca no mercado. Ideal para empresas que desejam oferecer um serviço de locação de bicicletas prático, confiável e escalável.</p>
    </div>
    <img className='homebike' src={imagem1} alt="foto de ciclista" title="foto de ciclista" />
    <div className='centralbuttons'>
  <div className="left-buttons">
    <a href="/novo-aluguel"><button className="big-orange">Novo Aluguel</button></a>
  </div>

  <img className='logobike' src={imagem2} alt="logo" title='logo' />

  <div className="right-buttons">
    <a href="/contratos"><button className="dark-button">Lista de Contratos</button></a>
    <a href="/bicicletas"><button className="dark-button">Lista de Bicicletas</button></a>
    <a href="/clientes"><button className="dark-button">Lista de Clientes</button></a>
  </div>
</div>

</section>
    </>
  )
}


export default HomeScreen
