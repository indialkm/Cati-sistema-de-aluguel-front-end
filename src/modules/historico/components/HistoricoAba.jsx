import React, { useEffect } from 'react';
import { useHistorico }  from '../hook/useHistorico';
import { useAuth } from '../../../context/AuthContext';
import HistoricoCard from './HistoricoCard';

const HistoricoAba = () => {
    const { user, hasRole } = useAuth();
    const { dados, loading, error, carregarHistorico } = useHistorico();

    useEffect(() => {
      
        carregarHistorico(0);
    }, [carregarHistorico]);

    if (loading) return <p>Carregando histórico...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <section>
            <div style={styles.header}>
                <h2 style={styles.title}>Histórico de Transações</h2>
                <span style={styles.count}>{dados.totalElements || 0} eventos</span>
            </div>
            
            <div style={styles.lista}>
                {dados.content?.length > 0 ? (
                    dados.content.map(item => (
                        <HistoricoCard 
                            key={item.id} 
                            historico={item} 
                            isAdmin={hasRole('ROLE_OWNER')} 
                        />
                    ))
                ) : (
                    <p>Nenhuma movimentação encontrada.</p>
                )}
            </div>
        </section>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: { fontWeight: '700', color: '#1a1a1a', margin: 0 },
    count: { fontSize: '14px', color: '#6c757d' },
    lista: { display: 'flex', flexDirection: 'column', gap: '15px' }
};

export default HistoricoAba;