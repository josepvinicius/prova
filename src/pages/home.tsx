import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Home() {

    const [boneco, setBoneco] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        buscarTodos();
    }, []);

    function buscarTodos() {
        setLoading(true)
        axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res => {
                const data = res.data.results;
                setBoneco(data);
                setError("")
            })
            .catch(err => {
                setError('Erro ao carregar clubes!');
            })
            .finally(() => setLoading(false));
    }

    function buscarPersonagem() {

        if (!input.trim()) {
            buscarTodos();
            return;
        }

    }


    return (
        <main>
            <input
                type="text"
                placeholder="Buscar Personagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)} />
            <button onClick={buscarPersonagem}>
                Buscar
            </button>
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        </main>
    )
}