import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';
import Navbar from '../../../components/Navbar/Navbar';
import api from "../../../services/api";

export default function CartPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { carrinho, buscarCarrinhoAtivo, buscarCarrinho, loading, erro } = useCarrinho();
    const [showRedirectNotice, setShowRedirectNotice] = useState(false);

    // Memoiza a função de carregar para usar no useEffect sem avisos de dependência
    const carregarDadosIniciais = useCallback(async () => {
        const token = localStorage.getItem('token');
        const idAnonimo = localStorage.getItem('carrinho_id');
        const idVindoDeOutraTela = location.state?.idCarrinho;

        try {
            // 1. Se temos um ID específico vindo da tela de endereço, priorizamos ele
            if (idVindoDeOutraTela) {
                await buscarCarrinho(idVindoDeOutraTela);
            } 
            // 2. Se não, seguimos o fluxo normal (Logado ou Anônimo)
            else if (token) {
                await buscarCarrinhoAtivo();
            } else if (idAnonimo) {
                await buscarCarrinho(idAnonimo);
            }
        } catch (err) {
            console.error("Falha ao sincronizar dados do carrinho", err);
        }
    }, [location.state, buscarCarrinho, buscarCarrinhoAtivo]);

    useEffect(() => {
        carregarDadosIniciais();
    }, [carregarDadosIniciais]);

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setShowRedirectNotice(true);
            setTimeout(() => {
                navigate('/login', { state: { from: location, idCarrinho: carrinho?.id } });
            }, 3000);
            return;
        }

        if (!carrinho?.id) return alert("Carrinho não identificado.");

        try {
            const res = await api.post('/transacao', { idCarrinho: carrinho.id });
            localStorage.removeItem('carrinho_id');
            navigate(`/pedido/${res.data.id}`, { state: { pedido: res.data } });
        } catch (error) {
            console.error("Erro ao iniciar transação", error);
            alert(error.response?.data?.message || "Erro ao processar seu pedido.");
        }
    };

    // Helper para formatar moeda brasileira
    const formatarMoeda = (valor) => 
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);

    if (loading) return <div style={styles.loading}>Sincronizando seu carrinho...</div>;

    // Tela de Carrinho Vazio
    if (erro || (!carrinho?.itens?.length && !loading)) {
        return (
            <>
                <Navbar />
                <div style={styles.container}>
                    <h2 style={styles.title}>Meu Carrinho</h2>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <p style={{ color: '#666', fontSize: '18px' }}>Seu carrinho está vazio.</p>
                        <button onClick={() => navigate('/')} style={styles.btnVoltar}>
                            VER PRODUTOS
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                {showRedirectNotice && (
                    <div style={styles.noticeBanner}>
                        ⚠️ <strong>Quase lá!</strong> Você precisa entrar na sua conta para finalizar. Redirecionando...
                    </div>
                )}

                <h2 style={styles.title}>Meu Carrinho</h2>
                <p style={styles.subtitle}>Sessão: {carrinho.id}</p>

                <div style={styles.content}>
                    {/* LISTA DE ITENS */}
                    <div style={styles.cartList}>
                        {carrinho.itens.map((item, index) => (
                            <div key={item.id || index} style={styles.cartCard}>
                                <div style={styles.cardHeader}>
                                    📅 <strong>Período:</strong> {new Date(item.dataInicial).toLocaleDateString()} - {new Date(item.dataFinal).toLocaleDateString()}
                                </div>

                                <div style={styles.cardBody}>
                                    <img 
                                        src={item.fotoUrl || 'https://via.placeholder.com/150'} 
                                        alt={item.nomeModelo} 
                                        style={styles.image} 
                                    />

                                    <div style={styles.infoArea}>
                                        <h4 style={styles.modelName}>{item.nomeModelo}</h4>
                                        <p style={styles.address}>
                                            📍 <strong>Entrega:</strong> {item.endereco?.logradouro}, {item.endereco?.numero}
                                        </p>
                                        <div style={styles.priceTag}>
                                            <span>Subtotal:</span>
                                            <strong>{formatarMoeda(item.preco)}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RESUMO DO PEDIDO */}
                    <div style={styles.summaryCard}>
                        <h3 style={{ marginBottom: '20px' }}>Resumo do Aluguel</h3>
                        <div style={styles.summaryLine}>
                            <span>Itens selecionados</span>
                            <span>{carrinho.itens.length}</span>
                        </div>
                        <div style={styles.divider}></div>
                        <div style={styles.totalLine}>
                            <span>Total</span>
                            <span style={{ color: '#f27405' }}>{formatarMoeda(carrinho.total)}</span>
                        </div>
                        <button style={styles.checkoutBtn} onClick={handleCheckout}>
                            CONFIRMAR E PAGAR
                        </button>
                        <p style={styles.footerNote}>Ambiente seguro e criptografado</p>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    // Mantive seus estilos base, apenas adicionei/ajustei alguns:
    container: { padding: '40px', backgroundColor: '#fdfcfb', minHeight: '100vh', fontFamily: 'sans-serif' },
    loading: { padding: '100px', textAlign: 'center', fontSize: '20px', color: '#f27405', fontWeight: 'bold' },
    title: { fontSize: '28px', color: '#1a1a1a', fontWeight: '800' },
    subtitle: { fontSize: '11px', color: '#ccc', marginBottom: '30px' },
    content: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
    cartList: { flex: '2', minWidth: '350px' },
    cartCard: { backgroundColor: '#fff', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1', overflow: 'hidden' },
    cardHeader: { backgroundColor: '#fff7f0', padding: '12px 20px', fontSize: '14px', color: '#f27405', borderBottom: '1px solid #ffe8d6' },
    cardBody: { display: 'flex', padding: '20px', gap: '20px', alignItems: 'center' },
    image: { width: '110px', height: '110px', objectFit: 'cover', borderRadius: '12px' },
    infoArea: { flex: 1 },
    modelName: { margin: '0 0 8px 0', fontSize: '18px', color: '#333' },
    address: { fontSize: '13px', color: '#666', margin: '0 0 15px 0' },
    priceTag: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' },
    summaryCard: { flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', height: 'fit-content', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', border: '1px solid #f1f1f1' },
    summaryLine: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' },
    divider: { height: '1px', backgroundColor: '#eee', margin: '20px 0' },
    totalLine: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '22px', marginBottom: '25px' },
    checkoutBtn: { width: '100%', padding: '18px', backgroundColor: '#f27405', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' },
    btnVoltar: { width: '200px', marginTop: '20px', padding: '15px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '12px', cursor: 'pointer', border: 'none' },
    footerNote: { textAlign: 'center', fontSize: '11px', color: '#bbb', marginTop: '15px' },
    noticeBanner: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fecaca', textAlign: 'center' }
};