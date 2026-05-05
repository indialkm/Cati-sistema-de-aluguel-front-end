import React from 'react';

const FilterPedidoStatus = ({ statusAtual, aoAlterar }) => {
    const statusDisponiveis = [
        { label: 'Todos os Pedidos', value: '' },
        { label: 'Pendentes', value: 'AGUARDANDO_PAGAMENTO' },
        { label: 'Aprovados', value: 'PAGO' },
        { label: 'Finalizados', value: 'CONCLUIDO' },
        { label: 'Cancelados', value: 'CANCELADO' },
    ];

    return (
        <div style={styles.filterContainer}>
            <label style={styles.label}>Filtrar por Status:</label>
            <div style={styles.buttonGroup}>
                {statusDisponiveis.map((s) => (
                    <button
                        key={s.value}
                        onClick={() => aoAlterar(s.value)}
                        style={{
                            ...styles.button,
                            backgroundColor: statusAtual === s.value ? '#002b45' : '#fff',
                            color: statusAtual === s.value ? '#fff' : '#002b45',
                        }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    filterContainer: { marginBottom: '25px' },
    label: { display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#444' },
    buttonGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    button: {
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #002b45',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '500'
    }
};

export default FilterPedidoStatus;