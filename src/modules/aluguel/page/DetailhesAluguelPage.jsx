import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import { useAluguel } from '../hooks/useAluguel';

const DetalhesAluguelPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { obterPorId, loading, erro } = useAluguel();
    const [aluguel, setAluguel] = useState(null);
    
    // Estado para detectar largura da tela e garantir responsividade dinâmica
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        const carregarDados = async () => {
            const dados = await obterPorId(id);
            setAluguel(dados);
        };
        carregarDados();
        
        return () => window.removeEventListener('resize', handleResize);
    }, [id, obterPorId]);

    const formatarDataLocal = (dataStr) => {
        return new Date(dataStr).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) return <div style={styles.feedback}>Carregando detalhes...</div>;
    if (erro || !aluguel) return <div style={styles.feedback}>Aluguel não encontrado.</div>;

    console.log(`O status do aluguel é ${aluguel.status}`)

    return (
        <div style={styles.page}>
            <Navbar />
            <div style={{...styles.container, padding: isMobile ? '10px' : '20px'}}>
                <button onClick={() => navigate(-1)} style={styles.btnVoltar}>
                    ← Voltar para Meus Pedidos
                </button>

                <header style={{
                    ...styles.header, 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center'
                }}>
                    <h1 style={{...styles.title, fontSize: isMobile ? '22px' : '28px'}}>
                        {aluguel.nomeProduto}
                    </h1>
                    <span style={{
                        ...styles.badge, 
                        backgroundColor: getStatusColor(aluguel.status),
                        marginTop: isMobile ? '10px' : '0'
                    }}>
                       {(aluguel.status || "STATUS_DESCONHECIDO").replace('_', ' ')}
                      
                    </span> 
                    
                </header>

                {/* Grid Responsivo usando Flexbox */}
                <div style={{...styles.flexGrid, flexDirection: isMobile ? 'column' : 'row'}}>
                    
                    <div style={{...styles.sectionCard, flex: isMobile ? '1 1 100%' : '1 1 45%'}}>
                        <h3>Informações Financeiras</h3>
                        <p style={styles.preco}>Total Pago: <strong>R$ {aluguel.precoNoAto?.toFixed(2)}</strong></p>
                        <small style={styles.idText}>ID: {aluguel.id}</small>
                    </div>

                    <div style={{...styles.sectionCard, flex: isMobile ? '1 1 100%' : '1 1 45%'}}>
                        <h3>Período de Locação</h3>
                        <div style={styles.row}>
                            <div>
                                <label style={styles.label}>Início:</label>
                                <p style={styles.dataText}>{formatarDataLocal(aluguel.reserva.dataInicial)}</p>
                            </div>
                            <div>
                                <label style={styles.label}>Fim:</label>
                                <p style={styles.dataText}>{formatarDataLocal(aluguel.reserva.dataFinal)}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{...styles.sectionCard, flex: '1 1 100%'}}>
                        <h3>Localização</h3>
                        <p>{aluguel.localizacao.logradouro}, {aluguel.localizacao.numero}</p>
                        <p>{aluguel.localizacao.complemento && `${aluguel.localizacao.complemento} - `} 
                           {aluguel.localizacao.bairro}</p>
                        <p>{aluguel.localizacao.cidade} / {aluguel.localizacao.uf} - CEP: {aluguel.localizacao.cep}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (s) => s === 'FINALIZADO' ? '#28a745' : '#f27405';

const styles = {
    page: { backgroundColor: '#f4f7f6', minHeight: '100vh', width: '100%' },
    container: { maxWidth: '900px', margin: '0 auto', paddingTop: '40px' },
    btnVoltar: { border: 'none', background: 'none', color: '#002b45', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
    header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
    title: { color: '#1a1a1a', margin: 0 },
    badge: { color: '#fff', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' },
    
    // Mudança de Grid para Flexbox para facilitar quebra de linha
    flexGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
    
    sectionCard: { 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        boxSizing: 'border-box' // Importante para o padding não quebrar a largura
    },
    label: { fontSize: '12px', color: '#666', textTransform: 'uppercase' },
    preco: { fontSize: '20px', color: '#28a745', margin: '10px 0' },
    idText: { color: '#999', wordBreak: 'break-all' }, // Evita que o ID quebre o layout
    dataText: { fontSize: '14px', margin: '5px 0' },
    row: { display: 'flex', justifyContent: 'space-between', marginTop: '10px', gap: '10px' },
    feedback: { textAlign: 'center', marginTop: '100px' }
};

export default DetalhesAluguelPage;