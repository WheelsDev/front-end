import { useEffect, useState } from 'react';
import imagemLogo from "../assets/logobike.png";
import "../css/NewRegister.css";

function FormularioContrato() {
  const [clientes, setClientes] = useState([]);
  const [bicicletas, setBicicletas] = useState([]);
  const [formData, setFormData] = useState({
    emailCliente: '',
    idBicicleta: '',
    dataRetorno: '',
    valorDeposito: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contrato = {
      cliente: {
        email: formData.emailCliente
      },
      bicicleta: {
        numero: parseInt(formData.idBicicleta)
      },
      dataRetorno: formData.dataRetorno,
      numeroDias: calcularDias(formData.dataRetorno),
      valorDeposito: parseFloat(formData.valorDeposito)
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
        dataRetorno: '',
        valorDeposito: ''
      });
    } catch (err) {
      alert('Erro ao registrar contrato.');
      console.error(err);
    }
  };

  const calcularDias = (dataRetornoStr) => {
    const hoje = new Date();
    const retorno = new Date(dataRetornoStr);
    const diff = Math.ceil((retorno - hoje) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  return (
    <div className="form-container">
    <img className="logo13" src={imagemLogo} alt="Logo" />
    <form onSubmit={handleSubmit}>
      <select name="idBicicleta" value={formData.idBicicleta} onChange={handleChange} required>
        <option value="">Selecione a bicicleta desejada</option>
        {bicicletas.map(b => (
          <option key={b.numero} value={b.numero}>{b.nome}</option>
        ))}
      </select>

      <select name="emailCliente" value={formData.emailCliente} onChange={handleChange} required>
        <option value="">Cliente</option>
        {clientes.map(c => (
          <option key={c.email} value={c.email}>{c.nome} ({c.email})</option>
        ))}
      </select>

      <input type="date" name="dataRetorno" value={formData.dataRetorno} onChange={handleChange} required />

      <input type="number" name="valorDeposito" value={formData.valorDeposito} onChange={handleChange} placeholder="Valor do depósito R$" required />

      <button type="submit">Registrar</button>
    </form>
    </div>
  );
}

export default FormularioContrato;
