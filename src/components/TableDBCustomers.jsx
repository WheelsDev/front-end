import { useState, useEffect } from "react";
import TableScreenListCustomers from "./TableScreenListCustomers.jsx";

export default function TableDBCustomers() {
  const [dados, setDados] = useState([]);

  // Aqui será a futura requisição para o SQL
  useEffect(() => {
    // Exemplo de dados simulados (substituir pela chamada SQL):
    setTimeout(() => {
     setDados([
  {
    id: 1,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 2,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 3,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 4,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 5,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 6,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 7,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 8,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 9,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 10,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 11,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 12,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 13,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 14,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 15,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 16,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 17,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 18,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 19,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
    {
    id: 20,
    nome: "Pessoa 1",
    endereco: "Endereço Exemplo",
    telefone: "123456789",
    email: "example@gmail.com"
  },
]);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <TableScreenListCustomers dados={dados} />
    </div>
  );
}