import React, { useState } from 'react';
import ListaAlugueisPedido from './ListaAlugueisPedido';

const CardPedido = ({ pedido }) => {
    const [aberto, setAberto] = useState(false);

    //Método para tratar data que vem do back
    const formatarData = (dataString) => {
        if (!dataString) return "Data indisponível";

        try {

            const dataFormatada = dataString.replace(" ", "T");
            const data = new Date(dataFormatada);

            if (isNaN(data.getTime())) {
                return "Data inválida";
            }

            return data.toLocaleDateString('pt-BR');
        } catch (e) {
            return "Erro na data";
        }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header} onClick={() => setAberto(!aberto)}>
                <div style={styles.mainInfo}>
                    <span style={styles.label}>PEDIDO</span>
                    <span style={styles.id}>#{pedido.id.substring(0, 8)}</span>
                    <span style={styles.data}>{formatarData(pedido.dataPedido)}</span>
                </div>

                <div style={styles.valorInfo}>
                    <span style={styles.valor}>R$ {pedido.valorTotal?.toFixed(2)}</span>
                    <span style={styles.seta}>{aberto ? '▲' : '▼'}</span>
                </div>
            </div>

            {/* Quando clicado, ele renderiza a lista de aluguéis deste pedido */}
            {aberto && (
                <div style={styles.detalhes}>
                    <ListaAlugueisPedido idPedido={pedido.id} />
                </div>
            )}
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: '1px solid #dee2e6',
        overflow: 'hidden',
        marginBottom: '15px'
    },
    header: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': { backgroundColor: '#fdfcfb' }
    },
    mainInfo: { display: 'flex', alignItems: 'baseline', gap: '15px' },
    label: { fontSize: '10px', fontWeight: '800', color: '#adb5bd' },
    id: { fontWeight: '700', color: '#1a1a1a', fontSize: '16px' },
    data: { color: '#6c757d', fontSize: '14px' },
    valorInfo: { display: 'flex', alignItems: 'center', gap: '20px' },
    valor: { fontWeight: '700', color: '#f27405', fontSize: '16px' },
    seta: { color: '#adb5bd', fontSize: '12px' },
    detalhes: { borderTop: '1px solid #f1f3f5' }
};

export default CardPedido;