import React from 'react';

const CardItemPedidoOwner = ({ pedido }) => {
    
    const formatarData = (dataStr) => {
        return new Date(dataStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Cores dinâmicas para o status do pedido
    const getStatusColor = (status) => {
        const mapping = {
            'AGUARDANDO_PAGAMENTO': { back: '#fff7ed', text: '#c2410c', border: '#fdba74' },
            'PAGO': { back: '#f0fdf4', text: '#15803d', border: '#86efac' },
            'CONCLUIDO': { back: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
            'CANCELADO': { back: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
        };
        return mapping[status] || { back: '#f9fafb', text: '#374151', border: '#d1d5db' };
    };

    const cores = getStatusColor(pedido.status);

    return (
        <div style={styles.card}>
            <div style={styles.sideInfo}>
                <div style={{ ...styles.statusBadge, backgroundColor: cores.back, color: cores.text, borderColor: cores.border }}>
                    {pedido.status}
                </div>
                <span style={styles.data}>{formatarData(pedido.dataCriacao)}</span>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.header}>
                    <h3 style={styles.clienteNome}>{pedido.nomeUsuario || "Cliente não identificado"}</h3>
                    <span style={styles.pedidoId}>ID: #{pedido.id.substring(0, 8)}</span>
                </div>

                <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                        <label style={styles.label}>Total do Pedido</label>
                        <span style={styles.valorTotal}>R$ {pedido.valorTotal?.toFixed(2)}</span>
                    </div>
                    <div style={styles.detailItem}>
                        <label style={styles.label}>Qtd. Itens</label>
                        <span>{pedido.quantidadeItens || 0} itens</span>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button 
                        style={styles.button}
                        onClick={() => window.location.href = `/admin/pedidos/${pedido.id}/detalhes`}
                    >
                        Gerenciar Aluguéis do Pedido →
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        cursor: 'default'
    },
    sideInfo: {
        width: '140px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid #e5e7eb',
        textAlign: 'center'
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    statusBadge: {
        fontSize: '11px',
        fontWeight: 'bold',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid',
        marginBottom: '10px',
        textTransform: 'uppercase'
    },
    data: { fontSize: '12px', color: '#64748b' },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    clienteNome: { margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: '600' },
    pedidoId: { fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' },
    detailsGrid: {
        display: 'flex',
        gap: '40px',
        padding: '10px 0'
    },
    detailItem: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    valorTotal: { fontSize: '16px', fontWeight: '700', color: '#059669' },
    footer: {
        marginTop: 'auto',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '10px'
    },
    button: {
        backgroundColor: '#002b45',
        color: 'white',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.2s'
    }
};

export default CardItemPedidoOwner;