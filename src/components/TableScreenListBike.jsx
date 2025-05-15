import { useState } from "react";
import "../css/TableScreenListBike.css";
import imagem4 from "../assets/logobike.png";

const TableScreenListBike = ({ dados }) => {
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

    const filtered = dados.filter(item => 
      item.id.toString().includes(lowercasedSearch) ||
      item.nome.toLowerCase().includes(lowercasedSearch) ||
      item.marca.toLowerCase().includes(lowercasedSearch) ||
      item.modelo.toLowerCase().includes(lowercasedSearch) ||
      item.tipo.toLowerCase().includes(lowercasedSearch) ||
      item.taxa.toLowerCase().includes(lowercasedSearch) ||
      item.deposito.toLowerCase().includes(lowercasedSearch) ||
      (item.disponibilidade ? "disponível" : "indisponível").includes(lowercasedSearch)
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
    <div className="tabela-container">
      <div className="header">
        <img className="logobike" src={imagem4} alt="logo" title="logo" />
        <h1>Lista de Bicicletas</h1>
        <button>Adicionar Bicicleta</button>
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
                  {isSearchActive ? "Nenhum resultado encontrado" : "Nenhum dado encontrado"}
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
        <button id="search-button" onClick={handleSearch}>Buscar</button>
        {isSearchActive && (
          <button id="clear-button" onClick={clearSearch}>Limpar</button>
        )}
      </div>
      {isSearchActive && filteredData.length > 0 && (
        <div className="search-results">
          <p>Mostrando {filteredData.length} resultado(s) para "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default TableScreenListBike;