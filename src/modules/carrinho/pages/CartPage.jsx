import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';
import Navbar from '../../../components/Navbar/Navbar';
import api from "../../../services/api";

export default function CartPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { carrinho, buscarCarrinhoAtivo, buscarCarrinho, loading, erro } = useCarrinho();
    const [showRedirectNotice, setShowRedirectNotice] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            const token = localStorage.getItem('token');
            const idAnonimo = localStorage.getItem('carrinho_id');

            if (token) {
                // Se está logado, busca o carrinho oficial "ABERTO" no banco
                await buscarCarrinhoAtivo();
            } else if (idAnonimo) {
                // Se é anônimo, busca pelo ID que está salvo no navegador
                await buscarCarrinho(idAnonimo);
            }
        };

        carregarDados();
    }, [buscarCarrinhoAtivo, buscarCarrinho]);

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setShowRedirectNotice(true);
            setTimeout(() => {
                // Passamos o ID atual para o login para o Backend fazer o MERGE
                navigate('/login', { state: { from: location, idCarrinho: carrinho?.id } });
            }, 3000);
            return;
        }

        try {
            // Cria a transação usando o carrinho atual
            const res = await api.post('/transacao', { idCarrinho: carrinho?.id });
            const pedidoCriado = res.data;

            // Limpeza pós-venda
            localStorage.removeItem('carrinho_id');

            navigate(`/pedido/${pedidoCriado.id}`, {
                state: { pedido: pedidoCriado }
            });
        } catch (error) {
            console.error("Erro ao iniciar transação", error);
            alert("Erro ao processar seu pedido.");
        }
    };

    if (loading) return <div style={styles.loading}>Sincronizando seu carrinho...</div>;

    if (erro || (!carrinho && !loading)) return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h2 style={styles.title}>Meu Carrinho</h2>
                <p style={{ marginTop: '20px' }}>Seu carrinho está vazio. Que tal escolher uma tenda agora?</p>
                <button
                    onClick={() => navigate('/')}
                    style={{ ...styles.checkoutBtn, width: '200px', marginTop: '20px' }}
                >
                    VER PRODUTOS
                </button>
            </div>
        </>
    );

    const itens = carrinho?.itens || [];
    const totalGeral = carrinho?.total || 0;

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                {showRedirectNotice && (
                    <div style={styles.noticeBanner}>
                        ⚠️ <strong>Quase lá!</strong> Você precisa entrar na sua conta para finalizar a reserva.
                        <br />Redirecionando...
                    </div>
                )}


                <h2 style={styles.title}>Meu Carrinho</h2>

                <p style={styles.subtitle}>ID: {carrinho.id}</p>



                <div style={styles.content}>

                    {/* LADO ESQUERDO: LISTA DE CARDS */}

                    <div style={styles.cartList}>

                        {itens.length > 0 ? itens.map((item, index) => (

                            <div key={index} style={styles.cartCard}>

                                <div style={styles.cardHeader}>

                                    📅 <strong>Período:</strong> {new Date(item.dataInicial).toLocaleDateString()} - {new Date(item.dataFinal).toLocaleDateString()}

                                </div>



                                <div style={styles.cardBody}>

                                    <img

                                        src={item.fotoUrl || 'https://via.placeholder.com/100'}

                                        alt={item.nomeModelo}

                                        style={styles.image}

                                    />



                                    <div style={styles.infoArea}>

                                        <h4 style={styles.modelName}>{item.nomeModelo}</h4>

                                        <p style={styles.address}>

                                            📍 <strong>Entrega:</strong> {item.endereco?.logradouro}, {item.endereco?.numero}

                                        </p>

                                        <div style={styles.priceTag}>

                                            <span>Valor do Aluguel:</span>

                                            <strong>R$ {(item.preco || 0).toFixed(2)}</strong>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )) : <p>Seu carrinho está vazio.</p>}

                    </div>

                    <div style={styles.summaryCard}>
                        <h3 style={{ marginBottom: '20px' }}>Resumo do Aluguel</h3>
                        <div style={styles.summaryLine}>
                            <span>Itens selecionados</span>
                            <span>{itens.length}</span>
                        </div>

                        <div style={styles.divider}></div>
                        <div style={styles.totalLine}>
                            <span>Total</span>
                            <span style={{ color: '#f27405' }}>R$ {totalGeral.toFixed(2)}</span>
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
    container: { padding: '40px', backgroundColor: '#fdfcfb', minHeight: '100vh', fontFamily: 'sans-serif' },
    loading: { padding: '50px', textAlign: 'center', fontSize: '18px', color: '#666' },
    title: { fontSize: '28px', color: '#1a1a1a', fontWeight: '800' },
    subtitle: { fontSize: '12px', color: '#999', marginBottom: '30px' },
    content: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
    cartList: { flex: '2', minWidth: '350px' },

    // ESTILO DOS CARDS
    cartCard: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #f1f1f1',
        overflow: 'hidden'
    },
    cardHeader: {
        backgroundColor: '#fff7f0',
        padding: '12px 20px',
        fontSize: '14px',
        color: '#f27405',
        borderBottom: '1px solid #ffe8d6'
    },
    cardBody: { display: 'flex', padding: '20px', gap: '20px', alignItems: 'center' },
    image: { width: '110px', height: '110px', objectFit: 'cover', borderRadius: '12px' },
    infoArea: { flex: 1 },
    modelName: { margin: '0 0 8px 0', fontSize: '18px', color: '#333' },
    address: { fontSize: '13px', color: '#666', margin: '0 0 15px 0' },
    priceTag: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px' },

    // RESUMO
    summaryCard: {
        flex: '1',
        minWidth: '300px',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '20px',
        height: 'fit-content',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        border: '1px solid #f1f1f1'
    },
    summaryLine: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555' },
    divider: { height: '1px', backgroundColor: '#eee', margin: '20px 0' },
    totalLine: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '22px', marginBottom: '25px' },
    checkoutBtn: {
        width: '100%',
        padding: '18px',
        backgroundColor: '#f27405',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    },
    footerNote: { textAlign: 'center', fontSize: '11px', color: '#bbb', marginTop: '15px' },
    noticeBanner: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fecaca' }
};