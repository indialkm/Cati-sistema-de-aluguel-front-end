import React, { useEffect } from 'react';
import { useHistorico } from '../hook/useHistorico';
import { useAuth } from '../../../context/AuthContext';

const PaginaDiagnostico = () => {
    // 1. Extraímos o usuário e o estado de carregamento do contexto global
    const { user, loading: authLoading } = useAuth(); 
    const { dados, loading: apiLoading, error, carregarHistorico } = useHistorico();

    useEffect(() => {
        // 2. Só executamos a busca quando o carregamento do Auth terminar
        // e confirmarmos que o objeto user e o seu ID existem.
        if (!authLoading && user?.id) {
            console.log("ID detectado no AuthContext:", user.id);
            carregarHistorico(user.id); 
        }
    }, [user, authLoading, carregarHistorico]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ borderBottom: '2px solid #333' }}>Status do ID do Usuário</h1>
            
            <div style={paineis.statusBox}>
                {authLoading ? (
                    <p>⏳ Lendo dados do localStorage...</p>
                ) : user?.id ? (
                    <p style={{ color: 'green' }}>✅ <strong>ID do Usuário Logado:</strong> {user.id}</p>
                ) : (
                    <p style={{ color: 'red' }}>❌ Nenhum usuário identificado no Contexto.</p>
                )}
            </div>

            <div style={paineis.grid}>
                <div style={paineis.colunaTecnica}>
                    <h3>Resposta da API (Filtrada por ID)</h3>
                    {apiLoading ? (
                        <p>Buscando dados no banco...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Erro: {error}</p>
                    ) : (
                        <pre style={paineis.json}>
                            {JSON.stringify(dados, null, 2)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
};

const paineis = {
    statusBox: { 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #ddd'
    },
    grid: { display: 'flex', gap: '20px' },
    colunaTecnica: { 
        flex: 1, 
        backgroundColor: '#2d2d2d', 
        color: '#76ff03', // Cor neon para destacar os dados
        padding: '15px', 
        borderRadius: '8px', 
        overflow: 'auto', 
        maxHeight: '70vh' 
    },
    json: { fontSize: '13px', lineHeight: '1.5' }
};

export default PaginaDiagnostico;