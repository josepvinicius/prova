import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export interface Personagem {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
  }

export default function Home() {
  const [bonecos, setBonecos] = useState<Personagem[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    buscarTodos();
  }, []);

  function buscarTodos() {
    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setBonecos(res.data.results);
        setError("");
      })
      .catch(() => setError("Erro ao carregar personagens!"))
      .finally(() => setLoading(false));
  }

  function buscarPersonagem() {
    if (!input.trim()) {
      buscarTodos();
      return;
    }

    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${input}`)
      .then((res) => {
        setBonecos(res.data.results);
        setError("");
      })
      .catch(() => setError("Personagem não encontrado!"))
      .finally(() => setLoading(false));
  }

  function filtrarPorStatus(e) {
    const valor = e.target.value;
    setStatus(valor);
    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?status=${valor}`)
      .then((res) => {
        setBonecos(res.data.results);
        setError("");
      })
      .catch(() => setError("Nenhum personagem com esse status!"))
      .finally(() => setLoading(false));
  }

  return (
    <main style={{ textAlign: "center", padding: 20 }}>
      <h1 style={{fontFamily: "sans-serif", marginBottom: 8}}>Rick and Morty - Personagens</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ 
            padding: 8, 
            marginRight: 10,
            borderRadius: 5,
            border: "none",
            outline: "none"
         }}
        />
        <button 
            onClick={buscarPersonagem}
            style={{
                height: 33,
                width: 50,
                border: 0,
                borderRadius: 5,
                cursor: "pointer"
                }}>
            Buscar
        </button>

        <select
          value={status}
          onChange={filtrarPorStatus}
          style={{ 
            marginLeft: 10, 
            padding: 8,
            border: 0,
            borderRadius: 5
        }}
        >
          <option value="">Filtrar por status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {bonecos.map((b) => (
          <Link
            to={`/personagem/${b.id}`}
            key={b.id}
            style={{
              textDecoration: "none",
              color: "#fafafa",
              border: "2px solid #fafafa",
              borderRadius: 10,
              padding: 10,
              background: "#b3a40a"
            }}
          >
            <img
              src={b.image}
              alt={b.name}
              style={{ width: "100%", borderRadius: 10 }}
            />
            <h3>{b.name}</h3>
            <p>Status: {b.status}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
