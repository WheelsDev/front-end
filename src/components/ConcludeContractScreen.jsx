import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import imagemLogo from "../assets/logobike.png";
import imagem11 from "../assets/seta.png";
import "../css/ConcludeContractScreen.css";

function ConcludeContractScreen() {
  const { contratoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const contratoData = location.state?.contratoData;

  console.log(contratoData)

  const [formData, setFormData] = useState({
    dataEntrega: '',
    bicicletaDanificada: '',
    entregaAtrasada: '',
  });

  const [diasAtraso, setDiasAtraso] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    if (
      contratoData?.bicicleta && typeof contratoData.bicicleta.diariaTaxaAluguel === 'number' && typeof contratoData.numeroDias === 'number'
    ) {
      const valorInicial = parseFloat(contratoData.bicicleta.diariaTaxaAluguel) * contratoData.numeroDias;
      console.log("Valor Inicial (com condição ajustada):", valorInicial);
      setValorTotal(valorInicial);
    } else {
      console.log("Condição ajustada NÃO atendida. Verifique os tipos e existência dos dados.")
    }
  }, [contratoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const voltarPagina = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (formData.dataEntrega && contratoData?.dataRetorno) {
      const dataEntrega = new Date(formData.dataEntrega);
      const dataPrevista = new Date(contratoData.dataRetorno);

      dataEntrega.setHours(0, 0, 0, 0);
      dataPrevista.setHours(0, 0, 0, 0);

      const diffTime = dataEntrega.getTime() - dataPrevista.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setDiasAtraso(diffDays);
        setFormData(prev => ({ ...prev, entregaAtrasada: 'sim' }));
      } else {
        setDiasAtraso(0);
        setFormData(prev => ({ ...prev, entregaAtrasada: 'nao' }));
      }
    }
  }, [formData.dataEntrega, contratoData]);

  useEffect(() => {
    if (!contratoData?.bicicleta?.deposito) return;

    const deposito = parseFloat(contratoData.bicicleta.deposito);
    const diariaTaxaAluguel = parseFloat(contratoData.bicicleta.diariaTaxaAluguel);
    let multa = 0;

    if (formData.entregaAtrasada === 'sim') {
      const taxaPorDiaAtraso = diariaTaxaAluguel * 0.5;
      multa += taxaPorDiaAtraso * diasAtraso;
    }
    if (formData.bicicletaDanificada === 'sim') {
      multa += deposito;
    }

    const valorBase = parseFloat(contratoData.bicicleta.diariaTaxaAluguel) * contratoData.numeroDias;
    const totalFinal = valorBase + multa;
    setValorTotal(totalFinal);
  }, [formData.entregaAtrasada, formData.bicicletaDanificada, contratoData, diasAtraso]);

  const handlePagar = async () => {
    try {
      const identificadorContrato = contratoData?.identificador;
      if (!identificadorContrato) {
        throw new Error("Identificador do contrato não encontrado.");
      }

      const response = await fetch(`http://localhost:8080/checkout/gerar/${identificadorContrato}?valorTotal=${valorTotal}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha ao gerar link de pagamento: ${errorText}`);
      }

      const link = await response.text();
  
      window.open(link, '_blank');

    } catch (error) {
      console.error("Erro ao gerar pagamento:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  const handlePagoEmDinheiro = async () => {
    if (!contratoData?.identificador) {
      alert("Erro: Identificador do contrato não encontrado.");
      return;
    }

    if (!window.confirm("Você confirma que o pagamento foi recebido em dinheiro e deseja finalizar este contrato?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/contratos/${contratoData.identificador}/finalizar-dinheiro`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao finalizar o contrato.');
      }

      alert("Contrato finalizado com sucesso!");
      navigate('/contratos');

    } catch (error) {
      console.error("Erro ao finalizar contrato manualmente:", error);
      alert(`Erro: ${error.message}`);
    }
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
          <div className='dias-atraso'>{diasAtraso > 0 ? diasAtraso : '0'}</div>
        </div>

        <div className="contract-info">
          <div>Cliente:<br />{contratoData.cliente.nome}</div>
          <div>Bicicleta:<br />{contratoData.bicicleta.nome}</div>
          <div>Dias:<br />{contratoData.numeroDias}</div>
          <div>Valor depósito:<br />R${parseFloat(contratoData.bicicleta.deposito).toFixed(2)}</div>
        </div>

        <div className="total-value">
          <div>Valor Total</div>
          <div>R${valorTotal.toFixed(2)}</div>
        </div>
<div className="button-container">
    <button className="orange-button" onClick={handlePagar}>Pagar</button>
    <button className="orange-button" onClick={handlePagoEmDinheiro}>Pago em dinheiro</button>
</div>

      </div>
    </div>
  );
}

export default ConcludeContractScreen;