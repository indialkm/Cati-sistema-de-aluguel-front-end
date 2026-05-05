import React from 'react';

const AbasNavegacao = ({ abaAtiva, setAbaAtiva }) => {
  const abas = [
    { id: 'pedidos', label: 'Todos os Pedidos' },
    { id: 'ativos', label: 'Em Aberto (Ativos)' },
    { id: 'historico', label: 'Histórico' }
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.containerAbas}>
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            style={{
              ...styles.tabButton,
              ...(abaAtiva === aba.id ? styles.activeTab : {})
            }}
          >
            {aba.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    width: '100%',
    backgroundColor: '#002b45', // Cor azul escura baseada na imagem enviada
    padding: '10px 0',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  containerAbas: {
    display: 'flex',
    flexWrap: 'wrap', // Garante responsividade em telas menores
    justifyContent: 'center',
    gap: '10px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px'
  },
  tabButton: {
    padding: '10px 20px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    minWidth: '150px'
  },
  activeTab: {
    backgroundColor: '#fff',
    color: '#002b45',
    borderColor: '#fff'
  }
};

export default AbasNavegacao;