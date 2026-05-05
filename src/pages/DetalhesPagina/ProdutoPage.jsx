// src/pages/ProdutoPage/index.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar/Navbar'; 
import DetalhesProdutoCard from '../../pages/DetalhesPagina/DetalhesProdutoCard';
import api from '../../services/api';

export default function ProdutoPage() {
    const { id } = useParams(); // Pega o ID que veio na URL
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const carregarDetalhes = async () => {
            try {
                // Chama o endpoint público que criamos: GET /estoque/detalhes/{id}
                const response = await api.get(`/estoque/detalhes/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao carregar detalhes:", error);
            }
        };
        carregarDetalhes();
    }, [id]);

    if (!produto) return <div>Carregando...</div>;

    return (
        <div>
            <NavBar />
            {/* Aqui você passa o 'produto' para o seu DetalhesProdutoCard */}
            <DetalhesProdutoCard produto={produto} />
        </div>
    );
}