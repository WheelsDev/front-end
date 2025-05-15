import { useState, useEffect } from "react";
import TableScreenListBike from "./TableScreenListBike";

export default function TableDB() {
  const [dados, setDados] = useState([]);

  // Aqui será a futura requisição para o SQL
  useEffect(() => {
    // Exemplo de dados simulados (substituir pela chamada SQL):
    setTimeout(() => {
     setDados([
  {
    id: 1,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 2,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
    {
    id: 3,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 4,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
    {
    id: 5,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 6,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
    {
    id: 7,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 8,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
    {
    id: 9,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 10,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
      {
    id: 11,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 12,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
      {
    id: 13,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 14,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
      {
    id: 15,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 16,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
      {
    id: 17,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 18,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },
      {
    id: 19,
    nome: "Bike A",
    marca: "Caloi",
    modelo: "Explorer",
    tipo: "Mountain",
    taxa: "R$ 30/dia",
    deposito: "R$ 200",
    disponibilidade: true
  },
  {
    id: 20,
    nome: "Bike B",
    marca: "Monark",
    modelo: "Classic",
    tipo: "Urbana",
    taxa: "R$ 25/dia",
    deposito: "R$ 150",
    disponibilidade: false
  },

]);

    }, 1000);
  }, []);

  return (
    <div className="App">
      <TableScreenListBike dados={dados} />
    </div>
  );
}