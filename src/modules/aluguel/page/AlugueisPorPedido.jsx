import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import ListaAlugueisPedido from '../components/ListaAlugueisPedido';

const AlugueisPorPedidoPage = () => {
    const { idPedido } = useParams();
    const navigate = useNavigate();

    return (
        <div style={styles.page}>
            <Navbar />
            
            <div style={styles.container}>
                {/* Cabeçalho de Navegação */}
                <div style={styles.headerNav}>
                    <button onClick={() => navigate('/dash-client')} style={styles.btnVoltar}>
                        ← Voltar para Meus Pedidos
                    </button>
                    <div style={styles.tituloBloco}>
                        <h1 style={styles.title}>Itens do Pedido</h1>
                        <span style={styles.subtitle}>ID: {idPedido}</span>
                    </div>
                </div>

                {/* Área da Lista */}
                <section style={styles.listaSection}>
                    <ListaAlugueisPedido idPedido={idPedido} />
                </section>

                <div style={styles.footerInfo}>
                    <p>Dúvidas sobre seus itens? Entre em contato com o suporte.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#f4f7f6',
        minHeight: '100vh',
    },
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
    },
    headerNav: {
        marginBottom: '30px',
    },
    btnVoltar: {
        background: 'none',
        border: 'none',
        color: '#002b45',
        fontWeight: '700',
        cursor: 'pointer',
        padding: '0',
        marginBottom: '20px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    tituloBloco: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px 12px 0 0',
        borderBottom: '2px solid #f27405', // Cor destaque do seu TCC
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    title: {
        margin: 0,
        fontSize: '24px',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: '12px',
        color: '#888',
        fontFamily: 'monospace'
    },
    listaSection: {
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '0 0 12px 12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    footerInfo: {
        textAlign: 'center',
        marginTop: '30px',
        color: '#999',
        fontSize: '13px'
    }
};

export default AlugueisPorPedidoPage;