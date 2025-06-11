import { useState } from "react";
import "../css/TableScreenListCustomers.css";
import logo from "../assets/logobike.png";
import imagem10 from "../assets/lixeira.svg";
import imagem11 from "../assets/seta.png";
import imagem4 from "../assets/logobike.png";
import { Link, useNavigate } from "react-router-dom";

const TableScreenListCustomers = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const MIN_ROWS = 20;

  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
  };

  const openModal = () => {

    setNomeCliente("");
    setTelefoneCliente("");
    setEmailCliente("");
    setCep("");
    setRua("");
    setNumeroCasa("");
    setBairro("");
    setCidade("");
    setEstado("");
    setErrors({});
    setIsModalOpen(true);
  }
  const closeModal = () => setIsModalOpen(false);

  const handleCepBlur = async (e) => {
    const currentCep = e.target.value.replace(/\D/g, '');
    if (currentCep.length !== 8) {

      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${currentCep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado.');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
      } else {
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);

        document.querySelector('.input-numero-casa-customers').focus();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert('Erro ao buscar CEP. Tente novamente.');
      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!nomeCliente.trim()) newErrors.nome = "O nome é obrigatório";
    if (!telefoneCliente.trim()) newErrors.telefone = "O telefone é obrigatório";
    if (!emailCliente.trim() || !/\S+@\S+\.\S+/.test(emailCliente)) newErrors.email = "Email inválido";
    if (!cep.trim() || cep.replace(/\D/g, '').length !== 8) newErrors.cep = "CEP inválido (deve ter 8 dígitos)";
    if (!rua.trim()) newErrors.rua = "A rua é obrigatória";
    if (!numeroCasa.trim()) newErrors.numeroCasa = "O número é obrigatório";
    if (!bairro.trim()) newErrors.bairro = "O bairro é obrigatório";
    if (!cidade.trim()) newErrors.cidade = "A cidade é obrigatória";
    if (!estado.trim()) newErrors.estado = "O estado é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterCliente = async () => {
    if (!validateFields()) return;

    const novoCliente = {
      nome: nomeCliente,
      telefone: telefoneCliente,
      email: emailCliente,
      endereco: `${rua}, ${numeroCasa} - ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`
    };

    try {
      const response = await fetch("http://localhost:8080/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao registrar cliente");
      }

      alert("Cliente registrado com sucesso!");
      closeModal();
    } catch (error) {
      alert(`Erro ao registrar cliente: ${error.message}`);
      console.error("Erro ao registrar cliente:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    const filtered = dados.filter(
      (item) =>
        item.nome.toLowerCase().includes(lowercasedSearch) ||
        item.endereco.toLowerCase().includes(lowercasedSearch) ||
        item.telefone.toLowerCase().includes(lowercasedSearch) ||
        item.email.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredData(filtered);
    setIsSearchActive(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const displayData = isSearchActive ? filteredData : dados;

  return (
    <div className="pai">
      <div className="dropdown-menu-container">
        <div className="dropdown">
          <div className="dropbtn">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <div className="dropdown-content">
            <Link to="/home">Início</Link>
            <Link to="/bicicletas">Lista de Bicicletas</Link>
            <Link to="/contratos">Lista de Contratos</Link>
          </div>
        </div>
      </div>

      <div className="tabela-container">
        <div className="header">
          <button id="backbutton" onClick={voltarPagina}>
            <img src={imagem11} alt="seta" title="seta" />
          </button>
          <img className="helmet" src={logo} alt="logo" title="logo" />
          <h1>Lista de Clientes</h1>
          <button onClick={openModal}>Adicionar Cliente</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {displayData && displayData.length > 0 ? (
                displayData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.endereco}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    {isSearchActive
                      ? "Nenhum resultado encontrado"
                      : "Nenhum dado encontrado"}
                  </td>
                </tr>
              )}
              {!isSearchActive &&
                Array.from({
                  length: Math.max(0, MIN_ROWS - (dados ? dados.length : 0)),
                }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button id="search-button" onClick={handleSearch}>
            Buscar
          </button>
          {isSearchActive && (
            <button id="clear-button5" onClick={clearSearch}>
              <img className="trash" src={imagem10} alt="lixeira" title="lixeira" />
            </button>
          )}
        </div>

        {isSearchActive && filteredData.length > 0 && (
          <div className="search-results">
            <p>
              Mostrando {filteredData.length} resultado(s) para "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="overlay-customers">
          <div className="modal-customers">
            <div className="modal-header-customers">
              <img src={imagem4} alt="Wheels Bike Logo" className="modal-logo-customers" />
              <button className="close-button-customers" onClick={closeModal}>
                <img src={imagem11} alt="seta" title="seta" />
              </button>
            </div>
            <div className="modal-content-customers">
              <div className="form-row-customers">
                <input type="text" placeholder="Nome" className={`input-nome-customers ${errors.nome ? 'input-error' : ''}`} value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
                <input type="text" placeholder="Telefone" className={`input-telefone-customers ${errors.telefone ? 'input-error' : ''}`} value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} />
              </div>
              {errors.nome && <p className="error-text-customers">{errors.nome}</p>}
              {errors.telefone && <p className="error-text-customers">{errors.telefone}</p>}

              <div className="form-row-customers">
                <input type="text" placeholder="CEP" className={`input-cep-customers ${errors.cep ? 'input-error' : ''}`} value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} maxLength="9" />
                <input type="text" placeholder="Rua" className={`input-rua-customers ${errors.rua ? 'input-error' : ''}`} value={rua} onChange={(e) => setRua(e.target.value)} />
                <input type="text" placeholder="N°" className={`input-numero-casa-customers ${errors.numeroCasa ? 'input-error' : ''}`} value={numeroCasa} onChange={(e) => setNumeroCasa(e.target.value)} />
              </div>
              {errors.cep && <p className="error-text-customers">{errors.cep}</p>}
              {errors.rua && <p className="error-text-customers">{errors.rua}</p>}
              {errors.numeroCasa && <p className="error-text-customers">{errors.numeroCasa}</p>}

              <div className="form-row-customers">
                <input type="text" placeholder="Bairro" className={`input-bairro-customers ${errors.bairro ? 'input-error' : ''}`} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                <input type="text" placeholder="Cidade" className={`input-cidade-customers ${errors.cidade ? 'input-error' : ''}`} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                <input type="text" placeholder="Estado" className={`input-estado-customers ${errors.estado ? 'input-error' : ''}`} value={estado} onChange={(e) => setEstado(e.target.value)} />
              </div>
              {errors.bairro && <p className="error-text-customers">{errors.bairro}</p>}
              {errors.cidade && <p className="error-text-customers">{errors.cidade}</p>}
              {errors.estado && <p className="error-text-customers">{errors.estado}</p>}

              <input type="email" placeholder="Email" className={`input-email-full-customers ${errors.email ? 'input-error' : ''}`} value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} />
              {errors.email && <p className="error-text-customers">{errors.email}</p>}
            </div>
            <button className="register-button-customers" onClick={handleRegisterCliente}>Registrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableScreenListCustomers;