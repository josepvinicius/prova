import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Personagem } from "./home";

export default function Detalhes() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        setPersonagem(res.data);
        setError("");
      })
      .catch(() => setError("Erro ao carregar detalhes!"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center", 
        padding: 20, 
        border: "2px solid #fafafa", 
        }}>
      <h2>Detalhes do Personagem</h2>
      {personagem && (
        <>
          <img
            src={personagem.image}
            alt={personagem.name}
            style={{ borderRadius: 20, margin: 10 }}
          />
          <h3 style={{marginBottom: 10}}>{personagem.name}</h3>
          <p>Status: {personagem.status}</p>
          <p>Espécie: {personagem.species}</p>
          <p>Gênero: {personagem.gender}</p>
          <p>Origem: {personagem.origin.name}</p>
          <p>Local atual: {personagem.location.name}</p>
          <Link style={{
            border: "1px solid #fafafa", 
            background: "#fafafa",
            width: 50,
            height:20,
            borderRadius: 2,
            marginTop: 10,
            cursor: "pointer"
            }} to="/">Voltar</Link>
        </>
      )}
    </main>
  );
}
