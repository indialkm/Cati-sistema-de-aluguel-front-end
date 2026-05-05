import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../services/api";

export default function MeusAlugueis() {
    const { id } = useParams(); // Pega o ID do pedido da URL
    const [alugueis, setAlugueis] = useState([]);

    useEffect(() => {
        // Chamando o seu segundo endpoint
        api.get(`alugueis/${id}/buscarPorPedido`)
            .then(res => setAlugueis(res.data))
            .catch(err => console.error("Erro ao buscar aluguéis", err));
    }, [id]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <button onClick={() => window.history.back()}>← Voltar</button>
            <h2>Itens do Aluguel (Pedido #{id.substring(0,8)})</h2>
            
            <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
                {alugueis.map(a => (
                    <div key={a.id} style={{ borderLeft: '5px solid #f27405', ...cardStyle, cursor: 'default' }}>
                        <h4>{a.nomeProduto}</h4>
                        <p>Preço no ato: R$ {a.precoNoAto.toFixed(2)}</p>
                        <p>Local: {a.localizacao.logradouro}, {a.localizacao.numero}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <strong>Status Logístico:</strong> 
                            <span style={{ color: '#f27405', fontWeight: 'bold' }}>{a.status}</span>
                        </div>
                    </div>
                ))}
                {alugueis.length === 0 && <p>Carregando aluguéis...</p>}
            </div>
        </div>
    );
}

const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    transition: '0.3s',
    backgroundColor: '#fff',
    position: 'relative'
};

const statusBadge = (status) => ({
    backgroundColor: '#fef9c3',
    color: '#854d0e',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
});