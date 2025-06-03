import { useState } from "react";
import "../css/TableScreenListContracts.css";
import imagem6 from "../assets/contract.png";
import imagem10 from "../assets/lixeira.svg";
import { Link, useNavigate } from "react-router-dom";
import imagem11 from "../assets/seta.png";

const TableScreenListContracts = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const MIN_ROWS = 20;

    const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
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
        item.id.toString().includes(lowercasedSearch) ||
        item.nome.toLowerCase().includes(lowercasedSearch) ||
        item.endereço.toLowerCase().includes(lowercasedSearch) ||
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
      <div class="dropdown-menu-container">
        <div class="dropdown">
          <div class="dropbtn">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
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
        <img className="contract" src={imagem6} alt="logo" title="logo" />
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
              <th>Consultar / Finalizar</th>
            </tr>
          </thead>
          <tbody>
            {displayData && displayData.length > 0 ? (
              displayData.map((item) => (
                <tr key={item.identificador}>
                  <td>{item.identificador}</td>
                  <td>{item.cliente ? item.cliente.nome : 'N/A'}</td>
                  <td>{item.bicicleta ? item.bicicleta.nome : 'N/A'}</td>
                  <td>{new Date(item.dataInicioAluguel).toLocaleDateString()}</td>
                  <td>{item.numeroDias}</td>
                  <td>{item.bicicleta ? `R$ ${item.bicicleta.diariaTaxaAluguel.toFixed(2)}` : 'N/A'}</td>
                  <td>{`R$ ${parseFloat(item.valorDeposito).toFixed(2)}`}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => console.log('Consultar/Finalizar contrato:', item.identificador)}>
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
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
    </div>
  );
};

export default TableScreenListContracts;
