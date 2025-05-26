import { useState, useEffect } from "react";
import TableScreenListContracts from "./TableScreenListContracts.jsx";

export default function TableDBContracts() {
  const [dados, setDados] = useState([]);

  // Aqui será a futura requisição para o SQL
  useEffect(() => {
    // Exemplo de dados simulados (substituir pela chamada SQL):
    setTimeout(() => {
      setDados([]);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <TableScreenListContracts dados={dados} />
    </div>
  );
}
