import { useState, useEffect } from "react";
import TableScreenListContracts from "./TableScreenListContracts.jsx";

export default function TableDBContracts() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Iniciando busca de contratos...");
        const response = await fetch('http://localhost:8080/api/contratos');
        console.log("Resposta da API:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        
        if (!Array.isArray(data)) {
          console.error("Dados recebidos não são um array:", data);
          throw new Error("Formato de dados inválido");
        }

        // Buscar dados das bicicletas
        const responseBicicletas = await fetch('http://localhost:8080/api/bicicletas');
        if (!responseBicicletas.ok) {
          throw new Error(`HTTP error! status: ${responseBicicletas.status}`);
        }
        const bicicletas = await responseBicicletas.json();
        console.log("Bicicletas carregadas:", bicicletas);

        // Atualizar os dados dos contratos com as informações das bicicletas
        const contratosAtualizados = data.map(contrato => {
          const bicicletaAtualizada = bicicletas.find(b => b.nome === contrato.bicicleta.nome);
          return {
            ...contrato,
            bicicleta: bicicletaAtualizada || contrato.bicicleta
          };
        });
        
        setDados(contratosAtualizados);
      } catch (e) {
        console.error("Erro ao buscar dados da API:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando contratos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar contratos: {error}</p>;
  }

  console.log("Renderizando TableScreenListContracts com dados:", dados);
  return (
    <div className="App">
      <TableScreenListContracts dados={dados} />
    </div>
  );
}
