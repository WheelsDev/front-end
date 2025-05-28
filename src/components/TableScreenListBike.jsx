import { useState } from "react";
import "../css/TableScreenListBike.css";
import imagem4 from "../assets/logobike.png";
import imagem10 from "../assets/lixeira.svg";
import { Link, useNavigate } from "react-router-dom";
import imagem9 from "../assets/menu.svg";
import imagem11 from "../assets/seta.svg";

const TableScreenListBike = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
        item.marca.toLowerCase().includes(lowercasedSearch) ||
        item.modelo.toLowerCase().includes(lowercasedSearch) ||
        item.tipo.toLowerCase().includes(lowercasedSearch) ||
        item.taxa.toLowerCase().includes(lowercasedSearch) ||
        item.deposito.toLowerCase().includes(lowercasedSearch) ||
        (item.disponibilidade ? "disponível" : "indisponível").includes(
          lowercasedSearch
        )
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
          <button className="dropbtn">
            <img src={imagem9} alt="Menu do site" title="Menu do site" />
          </button>
          <div className="dropdown-content">
            <Link to="/home">Início</Link>
            <Link to="/contratos">Lista de Contratos</Link>
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
          <img className="logobike" src={imagem4} alt="logo" title="logo" />
          <h1>Lista de Bicicletas</h1>
          <div className="botoes-header">
            <button>Adicionar Bicicleta</button>
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
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.marca}</td>
                    <td>{item.modelo}</td>
                    <td>{item.tipo}</td>
                    <td>{item.taxa}</td>
                    <td>{item.deposito}</td>
                    <td>
                      {item.disponibilidade ? "Disponível" : "Indisponível"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {isSearchActive
                      ? "Nenhum resultado encontrado"
                      : "Nenhum dado encontrado"}
                  </td>
                </tr>
              )}
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
              <img
                className="trash"
                src={imagem10}
                alt="lixeira"
                title="lixeira"
              />
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

export default TableScreenListBike;
