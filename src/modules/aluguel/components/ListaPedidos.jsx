import React from 'react';
import CardPedido from './CardPedido';

const ListaPedidos = ({ pedidos }) => {
  if (!pedidos || pedidos.length === 0) {
    return (
      <div style={styles.vazio}>
        <p>Você ainda não realizou nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {pedidos.map((pedido) => (
        <CardPedido key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '10px'
  },
  vazio: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px dashed #ccc'
  }
};

export default ListaPedidos;