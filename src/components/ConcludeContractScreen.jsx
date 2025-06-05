import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import imagemLogo from "../assets/logobike.png";
import imagem11 from "../assets/seta.png";
import "../css/ConcludeContractScreen.css";

function ConcludeContractScreen() {
  const { contratoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contratoData = location.state?.contratoData;
  
  const [formData, setFormData] = useState({
    dataEntrega: '',
    bicicletaDanificada: '',
    entregaAtrasada: '',
    diasAtraso: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const voltarPagina = () => {
    navigate(-1);
  };

  if (!contratoData) {
    return <div>Contrato não encontrado</div>;
  }

  return (
    <div className="conclude-contract-container">
      <button onClick={voltarPagina} className="back-button">
        <img src={imagem11} alt="seta" title="seta" />
      </button>

      <div className="form-container">
        <div className="logo-container">
          <img src={imagemLogo} alt="Logo" className="logo" />
        </div>

        <div>
          <label className="input-group">Data de retorno:</label>
          <input
            type="date"
            name="dataEntrega"
            value={formData.dataEntrega}
            onChange={handleChange}
            className="date-input"
          />
        </div>

        <div>
          <label className="input-group">Bicicleta danificada?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="bicicletaDanificada"
                value="sim"
                checked={formData.bicicletaDanificada === 'sim'}
                onChange={handleChange}
              />
              Sim
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="bicicletaDanificada"
                value="nao"
                checked={formData.bicicletaDanificada === 'nao'}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>

        <div>
          <label className="input-group">Entrega atrasada?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="entregaAtrasada"
                value="sim"
                checked={formData.entregaAtrasada === 'sim'}
                onChange={handleChange}
              />
              Sim
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="entregaAtrasada"
                value="nao"
                checked={formData.entregaAtrasada === 'nao'}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>

        <div>
          <label className="input-group">Dias em atraso:</label>
          <input
            type="number"
            name="diasAtraso"
            value={formData.diasAtraso}
            onChange={handleChange}
            min="0"
            className="number-input"
          />
        </div>

        <div className="contract-info">
          <div>Cliente:<br/>{contratoData.cliente.nome}</div>
          <div>Bicicleta:<br/>{contratoData.bicicleta.nome}</div>
          <div>Dias:<br/>{contratoData.numeroDias}</div>
          <div>Valor depósito:<br/>R${parseFloat(contratoData.bicicleta.deposito).toFixed(2)}</div>
        </div>

        <div className="total-value">
          <div>Valor Total</div>
          <div>R${(contratoData.valorTotal || 0).toFixed(2)}</div>
        </div>

        <div className="button-container">
          <button className="orange-button">Pagar</button>
          <button className="orange-button">Pago em dinheiro</button>
          <button className="orange-button">Gerar PDF</button>
        </div>
      </div>
    </div>
  );
}

export default ConcludeContractScreen; 