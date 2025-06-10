import { useState, useEffect } from "react";
import "../css/TableScreenListContracts.css";
import logo from "../assets/logobike.png";
import imagem10 from "../assets/lixeira.svg";
import { Link, useNavigate } from "react-router-dom";
import imagem11 from "../assets/seta.png";

const TableScreenListContracts = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [contratosAtualizados, setContratosAtualizados] = useState(dados || []);
  const MIN_ROWS = 20;

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dados recebidos na tabela:", dados);
    setContratosAtualizados(dados || []);
  }, [dados]);

  const voltarPagina = () => {
    navigate(-1);
  };

  const handleButtonClick = (contrato) => {
    if (contrato.status === "FINALIZADO") {
      console.log("Botão Consultar clicado para o contrato:", contrato.identificador);
    } else {
      navigate(`/concluir-contrato/${contrato.identificador}`, { state: { contratoData: contrato } });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearchActive(false);
      setFilteredData([]);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    const filtered = (contratosAtualizados || []).filter(
      (item) =>
        item.identificador?.toLowerCase().includes(lowercasedSearch) ||
        (item.cliente?.nome || '').toLowerCase().includes(lowercasedSearch) ||
        (item.bicicleta?.nome || '').toLowerCase().includes(lowercasedSearch)
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
    setFilteredData([]);
    setIsSearchActive(false);
  };

  const displayData = isSearchActive ? filteredData : (contratosAtualizados || []);

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
            <Link to="/clientes">Lista de Clientes</Link>
          </div>
        </div>
      </div>
      <div className="tabela-container">
        <div className="header">
          <button id="backbutton" onClick={voltarPagina}>
            <img src={imagem11} alt="seta" title="seta" />
          </button>
          <img className="contract" src={logo} alt="logo" title="logo" />
          <h1>Lista de Contratos</h1>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Bicicleta</th>
                <th>Data</th>
                <th>Dias</th>
                <th>Taxa</th>
                <th>Depósito</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {displayData && displayData.length > 0 ? (
                displayData.map((item) => (
                  <tr key={item.identificador}>
                    <td className="id-col">{item.identificador}</td>
                    <td>{item.cliente?.nome || 'N/A'}</td>
                    <td>{item.bicicleta?.nome || 'N/A'}</td>
                    <td className="data-col">
                      {item.dataInicial ? new Date(item.dataInicial + 'T12:00:00').toLocaleDateString('pt-BR') : 'N/A'} até{" "}
                      {item.dataRetorno ? new Date(item.dataRetorno + 'T12:00:00').toLocaleDateString('pt-BR') : 'N/A'}

                    </td>
                    <td>{item.numeroDias || 'N/A'}</td>
                    <td>
                      {item.bicicleta?.diariaTaxaAluguel
                        ? `R$ ${parseFloat(item.bicicleta.diariaTaxaAluguel).toFixed(2)}`
                        : 'N/A'}
                    </td>
                    <td>
                      {item.bicicleta?.deposito
                        ? `R$ ${parseFloat(item.bicicleta.deposito).toFixed(2)}`
                        : "R$ 0.00"}
                    </td>
                    <td className="status-col">{item.status || 'N/A'}</td>
                    <td>
                      <button
                        className="detalhes"
                        onClick={() => handleButtonClick(item)}
                      >
                        {item.status === "FINALIZADO" ? "Consultar" : "Finalizar"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    {isSearchActive
                      ? "Nenhum resultado encontrado para sua busca."
                      : "Nenhum contrato encontrado."}
                  </td>
                </tr>
              )}
              {!isSearchActive &&
                Array.from({
                  length: Math.max(0, MIN_ROWS - (displayData ? displayData.length : 0)),
                }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td colSpan="9">&nbsp;</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Buscar por ID, Cliente ou Bicicleta..."
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
    </div>
  );
};

export default TableScreenListContracts;
