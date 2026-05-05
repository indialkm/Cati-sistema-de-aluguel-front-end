import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import AbasNavegacao from './components/AbasNavegacao';
import ListaPedidos from './components/ListaPedidos';
import usePedido from '../../pedido/hooks/usePedido';

export default function AluguelDashboard() {
  const [abaAtiva, setAbaAtiva] = useState('pedidos');
  const { pedidos, loading, erro, listarMeusPedidos } = usePedido();

  useEffect(() => {
    listarMeusPedidos();
  }, [listarMeusPedidos]);

  return (
    <div style={styles.page}>
      <Navbar />
      
      {/* O Componente de Abas no Topo */}
      <AbasNavegacao abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      <main style={styles.container}>
        {loading && <p style={styles.feedback}>Carregando seus dados...</p>}
        {erro && <p style={{...styles.feedback, color: 'red'}}>{erro}</p>}

        {!loading && !erro && (
          <div style={styles.content}>
            {abaAtiva === 'pedidos' && (
              <section>
                <h2 style={styles.titleSection}>Seus Pedidos Recentes</h2>
                <ListaPedidos pedidos={pedidos} />
              </section>
            )}

            {abaAtiva === 'ativos' && (
              <section>
                <h2 style={styles.titleSection}>Aluguéis em sua posse</h2>
                {/* Aqui você filtraria pedidos que têm status PENDENTE/ATIVO */}
                <p>Em breve: Lista de itens ativos.</p>
              </section>
            )}

            {abaAtiva === 'historico' && (
              <section>
                <h2 style={styles.titleSection}>Itens já devolvidos</h2>
                <p>Em breve: Lista de itens finalizados.</p>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 40px',
  },
  titleSection: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '22px',
    borderBottom: '2px solid #f27405', // Cor laranja do seu tema
    display: 'inline-block',
    paddingBottom: '5px'
  },
  content: {
    marginTop: '20px'
  },
  feedback: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    fontWeight: 'bold'
  }
};