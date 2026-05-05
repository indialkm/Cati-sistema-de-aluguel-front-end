import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardItemAluguel = ({ aluguel, isAdmin = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (isAdmin) {
            navigate(`/detalhes-aluguel-owner/${aluguel.id}`);
        } else {
         
            navigate(`/detalhes-alugueis/${aluguel.id}`);
        }
    };

    const formatarDataSimples = (dataStr) => {
        if (!dataStr) return "...";
        return new Date(dataStr).toLocaleDateString('pt-BR');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'FINALIZADO': return '#28a745';
            case 'EM_MONTAGEM': return '#f27405';
            case 'AVARIADO': return '#dc3545';
            default: return '#002b45';
        }
    };

    return (
        <div 
            style={styles.cardItem} 
            onClick={handleClick}
        >
            <div style={styles.header}>
                <h4 style={styles.nomeProduto}>{aluguel.nomeProduto || "Equipamento"}</h4>
                <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(aluguel.status)
                }}>
                    {(aluguel.status || "PENDENTE").replace('_', ' ')}
                </span>
            </div>

            <div style={styles.corpo}>
                <div style={styles.infoGrupo}>
                    <label style={styles.label}>Período:</label>
                    <p style={styles.texto}>
                        {formatarDataSimples(aluguel.reserva?.dataInicial)} até {formatarDataSimples(aluguel.reserva?.dataFinal)}
                    </p>
                </div>

                <div style={styles.infoGrupo}>
                    <label style={styles.label}>Montagem em:</label>
                    <p style={styles.texto}>
                        {aluguel.localizacao?.logradouro}, {aluguel.localizacao?.numero} - {aluguel.localizacao?.cidade}
                    </p>
                </div>
            </div>

            <div style={styles.footer}>
                <span>Ver todos os detalhes</span>
                <span>→</span>
            </div>
        </div>
    );
};

const styles = {
    cardItem: {
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
    nomeProduto: { margin: 0, fontSize: '16px', color: '#1a1a1a', fontWeight: '700' },
    statusBadge: { padding: '4px 10px', borderRadius: '4px', color: '#fff', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' },
    corpo: { display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f5f5f5', paddingTop: '12px' },
    infoGrupo: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '11px', color: '#888', textTransform: 'uppercase', fontWeight: '600' },
    texto: { fontSize: '13px', color: '#444', margin: '2px 0 0 0' },
    footer: { marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#002b45', fontWeight: 'bold' }
};

export default CardItemAluguel;