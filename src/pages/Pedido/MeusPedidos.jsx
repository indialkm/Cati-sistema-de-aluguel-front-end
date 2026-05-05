import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('pedido/buscarAluguel') // Seu endpoint de pedidos
            .then(res => setPedidos(res.data.content)) // Pageable retorna 'content'
            .catch(err => console.error("Erro ao buscar pedidos", err));
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Meus Pedidos</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
                {pedidos.map(p => (
                    <div key={p.id} onClick={() => navigate(`/meus-alugueis/${p.id}`)} 
                         style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span><strong>ID:</strong> {p.id.substring(0, 8)}...</span>
                            <span style={statusBadge(p.status)}>{p.status}</span>
                        </div>
                        <p>Data: {new Date(p.dataPedido).toLocaleDateString()}</p>
                        <p>Total: <strong>R$ {p.valorTotal.toFixed(2)}</strong></p>
                        <small>Clique para ver detalhes do aluguel</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Estilos Simples
const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
    backgroundColor: '#fff'
};

const statusBadge = (status) => ({
    backgroundColor: status === 'PAGO' ? '#dcfce7' : '#fef9c3',
    color: status === 'PAGO' ? '#166534' : '#854d0e',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
});