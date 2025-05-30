import { useState } from "react";
import "../css/TableScreenListBike.css";
import imagem4 from "../assets/logobike.png";
import imagem10 from "../assets/lixeira.svg";
import { Link, useNavigate } from "react-router-dom";
import imagem9 from "../assets/menu.svg";
import imagem11 from "../assets/seta.svg";
import openArrowIcon from "../assets/openarrow.svg";

const TableScreenListBike = ({ dados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBikeType, setSelectedBikeType] = useState("");

  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
    setIsSearchActive(false);
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
        item.numero.toString().includes(lowercasedSearch) ||
        item.nome.toLowerCase().includes(lowercasedSearch) ||
        item.marca.toLowerCase().includes(lowercasedSearch) ||
        item.modelo.toLowerCase().includes(lowercasedSearch) ||
        item.tipo.toLowerCase().includes(lowercasedSearch) ||
        item.diariaTaxaAluguel.toLowerCase().includes(lowercasedSearch) ||
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
  
  const MIN_ROWS = 20;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBikeTypeChange = (e) => {
    setSelectedBikeType(e.target.value);
  };

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

       
              {!isSearchActive && Array.from({ 
                length: Math.max(0, MIN_ROWS - (dados ? dados.length : 0)) 
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

      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-button">
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            </div>
            <img src={imagem4} alt="logo" title="logo" />
            <input type="text" placeholder="Nome da Bicicleta" />
            <input type="text" placeholder="Marca da Bicicleta" />
            <input type="text" placeholder="Modelo da Bicicleta" />
            <select value={selectedBikeType} onChange={handleBikeTypeChange} className="modal-select">
              <option value="" disabled>Selecione o tipo da Bicicleta</option>
              <option value="Urbana">Urbana</option>
              <option value="Estrada">Estrada</option>  
              <option value="Mountain Bike">Mountain Bike</option>
              <option value="BMX">BMX</option>
              <option value="Elétrica">Elétrica</option>
              <option value="Esportiva">Esportiva</option>
            </select>
            <input type="text" placeholder="Valor da Taxa R$" />
            <input type="text" placeholder="Valor do Depósito R$" />
            <button className="register-button">Registrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableScreenListBike;