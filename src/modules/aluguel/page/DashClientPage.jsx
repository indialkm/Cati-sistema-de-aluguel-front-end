import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import AbasNavegacao from '../components/AbasNavegacao';
import ListaPedidos from '../components/ListaPedidos';
import usePedido from '../../pedido/hooks/usePedido';
import HistoricoAba from '../../historico/components/HistoricoAba';

export function DashClientPage() {
    const [abaAtiva, setAbaAtiva] = useState('pedidos');
    const {pedidos, loading, erro, listarMeusPedidos, paginacao } = usePedido();
    const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setLarguraJanela(window.innerWidth);
        window.addEventListener('resize', handleResize);
        listarMeusPedidos(0, 10);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [listarMeusPedidos]);

    const isMobile = larguraJanela < 768;

    return (
        <div style={styles.page}>
            <Navbar />
            
            <AbasNavegacao abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

            <main style={{
                ...styles.container,
                padding: isMobile ? '10px' : '20px',
                width: isMobile ? '95%' : '90%'
            }}>
                {loading && (
                    <div style={styles.statusContainer}>
                        <p>Carregando seu histórico...</p>
                    </div>
                )}

                {erro && (
                    <div style={styles.statusContainer}>
                        <p style={{ color: '#ef4444' }}>{erro}</p>
                    </div>
                )}

                {!loading && !erro && (
                    <div style={styles.content}>
                        {abaAtiva === 'pedidos' && (
                            <section>
                                <div style={{
                                    ...styles.headerSection,
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: isMobile ? '10px' : '0'
                                }}>
                                    <h2 style={{
                                        ...styles.title,
                                        fontSize: isMobile ? '18px' : '22px'
                                    }}>Meus Pedidos</h2>
                                    <span style={styles.count}>{paginacao?.totalElements || 0} total</span>
                                </div>
                                <ListaPedidos pedidos={pedidos} />
                            </section>
                        )}

                        {abaAtiva === 'ativos' && (
                            <section>
                                <h2 style={styles.title}>Aluguéis Ativos</h2>
                                <p style={styles.info}>Itens que estão com você no momento.</p>
                            </section>
                        )}

                        {abaAtiva === 'historico' && (
                            <section>
                                <h2 style={styles.title}>Histórico de Devoluções</h2>
                                <HistoricoAba />
                            </section>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default DashClientPage;

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        width: '100%',
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        boxSizing: 'border-box',
    },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: '2px solid #e9ecef',
        paddingBottom: '10px'
    },
    title: {
        fontWeight: '700',
        color: '#1a1a1a',
        margin: 0
    },
    count: {
        fontSize: '14px',
        color: '#6c757d',
        backgroundColor: '#e9ecef',
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: '600'
    },
    content: {
        marginTop: '10px'
    },
    statusContainer: {
        textAlign: 'center',
        marginTop: '100px',
        fontSize: '18px'
    },
    info: {
        color: '#6c757d',
        marginTop: '10px'
    }
};