import { useState, useEffect } from "react";
import TableScreenListCustomers from "./TableScreenListCustomers.jsx";

export default function TableDBCustomers() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:8080/api/clientes');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDados(data);
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
    return <p>Carregando clientes...</p>;
  }

  if (error) {
    return <p>Erro ao carregar clientes: {error}</p>;
  }

  return (
    <div className="App">
      <TableScreenListCustomers dados={dados} />
    </div>
  );
}
