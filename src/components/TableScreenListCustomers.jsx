import { useState } from "react";
import "../css/TableScreenListCustomers.css";
import imagem5 from "../assets/helmet.png";
import imagem10 from "../assets/lixeira.svg";
import { Link } from "react-router-dom";
import imagem9 from "../assets/menu.svg";

const TableScreenListCustomers = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
               <div className="dropdown-menu-container">
                <div className="dropdown">
                  <button className="dropbtn">
                    <img src={imagem9} alt="Menu do site" title="Menu do site" />
                  </button>
                  <div className="dropdown-content">
                    <Link to="/contratos">Lista de Contratos</Link>
                    <Link to="/bicicletas">Lista de Bicicletas</Link>
                    <Link to="/clientes">Lista de Clientes</Link>
                  </div>
                </div>
              </div>
    <div className="tabela-container">
      <div className="header">
        <img className="helmet" src={imagem5} alt="logo" title="logo" />
        <h1>Lista de Clientes</h1>
        <button>Adicionar Cliente</button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
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
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.telefone}</td>
                  <td>{item.email}</td>
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

export default TableScreenListCustomers;
