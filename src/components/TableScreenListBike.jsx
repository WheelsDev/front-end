import { useState } from "react";
import "../css/TableScreenListBike.css";
import imagem4 from "../assets/logobike.png";
import imagem10 from "../assets/lixeira.svg";
import { Link, useNavigate } from "react-router-dom";
import imagem11 from "../assets/seta.png";

const TableScreenListBike = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [taxa, setTaxa] = useState("");
  const [deposito, setDeposito] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
    setIsSearchActive(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setIsSearchActive(false);
      setFilteredData([]);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    const filtered = dados.filter((item) => {
      const diaria = item.diariaTaxaAluguel.toString().toLowerCase();
      const deposito = item.deposito.toString().toLowerCase();
      const disponibilidadeStr = item.disponibilidade ? "disponível" : "indisponível";

      return (
        item.numero.toString().includes(lowercasedSearch) ||
        item.nome.toLowerCase().includes(lowercasedSearch) ||
        item.marca.toLowerCase().includes(lowercasedSearch) ||
        item.modelo.toLowerCase().includes(lowercasedSearch) ||
        item.tipo.toLowerCase().includes(lowercasedSearch) ||
        diaria.includes(lowercasedSearch) ||
        deposito.includes(lowercasedSearch) ||
        disponibilidadeStr.includes(lowercasedSearch)
      );
    });

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
  const MIN_ROWS = 20;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
    clearModalFields();
  };

  const clearModalFields = () => {
    setNome("");
    setMarca("");
    setModelo("");
    setTipo("");
    setTaxa("");
    setDeposito("");
  };

  const validateFields = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "O nome é obrigatório";
    if (!marca.trim()) newErrors.marca = "A marca é obrigatória";
    if (!modelo.trim()) newErrors.modelo = "O modelo é obrigatório";
    if (!tipo.trim()) newErrors.tipo = "O tipo é obrigatório";
    if (!taxa.trim()) newErrors.taxa = "A taxa é obrigatória";
    else if (isNaN(taxa) || Number(taxa) <= 0) newErrors.taxa = "A taxa deve ser um número positivo";
    if (!deposito.trim()) newErrors.deposito = "O depósito é obrigatório";
    else if (isNaN(deposito) || Number(deposito) <= 0) newErrors.deposito = "O depósito deve ser um número positivo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    const bicicleta = {
      nome,
      marca,
      modelo,
      tipo,
      diariaTaxaAluguel: taxa,
      deposito,
      disponibilidade: true,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bicicletas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bicicleta),
      });

      if (!response.ok) throw new Error("Erro ao registrar bicicleta");

      const data = await response.json();
      alert("Bicicleta registrada com sucesso!");
      closeModal();
    } catch (error) {
      alert("Erro ao registrar bicicleta. Tente novamente.");
    }
  };

  const isFormValid = () => {
    return (
      nome.trim() && marca.trim() && modelo.trim() && tipo.trim() &&
      taxa.trim() && !isNaN(taxa) && Number(taxa) > 0 &&
      deposito.trim() && !isNaN(deposito) && Number(deposito) > 0
    );
  };


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
            <Link to="/contratos">Lista de Contratos</Link>
            <Link to="/clientes">Lista de Clientes</Link>
          </div>
        </div>
      </div>

      <div className="tabela-container">
        <div className="header">
          <button id="backbutton" onClick={voltarPagina}>
            <img src={imagem11} alt="seta" title="seta" />
          </button>
          <img className="logobike2" src={imagem4} alt="logo" title="logo" />
          <h1>Lista de Bicicletas</h1>
          <div className="botoes-header">
            <button onClick={openModal}>Adicionar Bicicleta</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Taxa</th>
                <th>Depósito</th>
                <th>Disponibilidade</th>
              </tr>
            </thead>
            <tbody>
              {displayData && displayData.length > 0 ? (
                displayData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.numero}</td>
                    <td>{item.nome}</td>
                    <td>{item.marca}</td>
                    <td>{item.modelo}</td>
                    <td>{item.tipo}</td>
                    <td>{item.diariaTaxaAluguel}</td>
                    <td>{item.deposito}</td>
                    <td>
                      {item.disponibilidade ? "Disponível" : "Indisponível"}
                    </td>
                  </tr>
                ))
              ) : (
                isSearchActive && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Nenhum resultado encontrado
                    </td>
                  </tr>
                )
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
            onKeyPress={handleKeyPress}
          />
          <button id="search-button" onClick={handleSearch}>
            Buscar
          </button>
          {isSearchActive && (
            <button id="clear-button" onClick={clearSearch}>
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
        <div className="overlay">
          <div className="modal">
            <div className="modal-button">
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <img src={imagem4} alt="logo" title="logo" />

            <input
              type="text"
              placeholder="Nome da Bicicleta"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={errors.nome ? "input-error" : ""}
            />
            {errors.nome && <p className="error-text">{errors.nome}</p>}

            <input
              type="text"
              placeholder="Marca da Bicicleta"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className={errors.marca ? "input-error" : ""}
            />
            {errors.marca && <p className="error-text">{errors.marca}</p>}

            <input
              type="text"
              placeholder="Modelo da Bicicleta"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className={errors.modelo ? "input-error" : ""}
            />
            {errors.modelo && <p className="error-text">{errors.modelo}</p>}

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={`modal-select ${errors.tipo ? "input-error" : ""}`}
            >
              <option value="" disabled>
                Selecione o tipo da Bicicleta
              </option>
              <option value="Urbana">Urbana</option>
              <option value="Estrada">Estrada</option>
              <option value="Mountain Bike">Mountain Bike</option>
              <option value="BMX">BMX</option>
              <option value="Elétrica">Elétrica</option>
              <option value="Esportiva">Esportiva</option>
            </select>
            {errors.tipo && <p className="error-text">{errors.tipo}</p>}

            <input
              type="text"
              placeholder="Valor da Taxa R$"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
              className={errors.taxa ? "input-error" : ""}
            />
            {errors.taxa && <p className="error-text">{errors.taxa}</p>}

            <input
              type="text"
              placeholder="Valor do Depósito R$"
              value={deposito}
              onChange={(e) => setDeposito(e.target.value)}
              className={errors.deposito ? "input-error" : ""}
            />
            {errors.deposito && <p className="error-text">{errors.deposito}</p>}

            <button
              className="register-button"
              onClick={handleRegister}
              disabled={!isFormValid()}
            >
              Registrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableScreenListBike;
