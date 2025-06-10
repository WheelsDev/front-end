import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import imagemLogo from "../assets/logobike.png";
import "../css/NewRegister.css";
import imagem12 from "../assets/seta.png";

function FormularioContrato() {
  const [clientes, setClientes] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [formData, setFormData] = useState({
    emailCliente: '',
    idBicicleta: '',
    dataRetorno: ''
  });

  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Erro ao buscar clientes', err));

    fetch('http://localhost:8080/api/bicicletas')
      .then(res => res.json())
      .then(data => setBicicletas(data))
      .catch(err => console.error('Erro ao buscar bicicletas', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calcularDias = (dataRetornoStr) => {
    const hoje = new Date();
    const retorno = new Date(dataRetornoStr);
    const diff = Math.ceil((retorno - hoje) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteSelecionado = clientes.find(c => c.email === formData.emailCliente);
    const bicicletaSelecionada = bicicletas.find(b => b.numero === parseInt(formData.idBicicleta));

    const contrato = {
      cliente: clienteSelecionado,
      bicicleta: bicicletaSelecionada,
      dataRetorno: formData.dataRetorno,
      numeroDias: calcularDias(formData.dataRetorno)
    };

    try {
      const response = await fetch('http://localhost:8080/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contrato)
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar contrato');
      }

      alert('Contrato registrado com sucesso!');
      setFormData({
        emailCliente: '',
        idBicicleta: '',
        dataRetorno: ''
      });
    } catch (err) {
      alert('Erro ao registrar contrato.');
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <button id="backbutton2" onClick={voltarPagina}>
        <img src={imagem12} alt="seta" title="seta" />
      </button>

      <div className="new-register-page">
        <div className="new-register-header">
          <img className="logo13" src={imagemLogo} alt="Logo" />
        </div>

        <div className="new-register-form-container">
          <form onSubmit={handleSubmit}>
            <select name="idBicicleta" value={formData.idBicicleta} onChange={handleChange} required className="new-register-input">
              <option value="">Selecione a bicicleta desejada</option>
              {bicicletas.map(b => (
                <option key={b.numero} value={b.numero}>{b.nome}</option>
              ))}
            </select>

            <select name="emailCliente" value={formData.emailCliente} onChange={handleChange} required className="new-register-input">
              <option value="">Cliente</option>
              {clientes.map(c => (
                <option key={c.email} value={c.email}>{c.nome} ({c.email})</option>
              ))}
            </select>

            <div className="new-register-input-container">
              <input type="date" name="dataRetorno" value={formData.dataRetorno} onChange={handleChange} required className="new-register-input" />
              <Link to="/clientes">
                <button type="button">Adicionar Cliente</button>
              </Link>
            </div>

            <button type="submit" className="new-register-button">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioContrato;