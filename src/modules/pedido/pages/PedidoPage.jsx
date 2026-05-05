import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Package, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import usePedido from '../hooks/usePedido';
import api from "../../../services/api";

export default function PedidoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { buscarPedidoPorId, loading } = usePedido();
    
    
    const [pedido, setPedido] = useState(location.state?.pedido);

    useEffect(() => {
      
        if (!pedido && location.pathname.split('/').pop()) {
            const id = location.pathname.split('/').pop();
            buscarPedidoPorId(id).then(res => setPedido(res));
        }
    }, [pedido, location.pathname, buscarPedidoPorId]);

  
    const irParaPagamento = async () => {
    try {
        const dadosPagamento = {
            idPedido: pedido.id,
            valorPago: pedido.valorTotal,
            formaPagamento: "CARTAO",
            parcelas: 1
        };

        console.log("Enviando solicitação de pagamento...");
        const res = await api.post('/transacao/pagar', dadosPagamento);
        console.log("Resposta do servidor:", res.data);
        
        if (res.data && res.data.clientSecret) {
            navigate(`/pagamento/${pedido.id}`, { 
                state: { 
                    clientSecret: res.data.clientSecret, 
                    valorTotal: pedido.valorTotal 
                } 
            });
        } else {
            alert("O servidor não enviou a chave do Stripe (clientSecret). Verifique o log do Java.");
        }
    } catch (error) {
        console.error("Erro completo:", error.response?.data || error.message);
        alert("Erro ao iniciar o checkout. O backend pode estar recusando a transação.");
    }
};

    if (loading || !pedido) {
        return <div style={styles.loading}>Carregando detalhes do pedido...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={() => navigate(-1)} style={styles.backBtn}>
                    <ArrowLeft size={18} /> Voltar
                </button>

                <header style={styles.header}>
                    <h1 style={styles.title}>Resumo da Reserva</h1>
                    <span style={styles.statusBadge}>{pedido.status}</span>
                </header>

                <div style={styles.content}>
                    {/* Detalhes do Pedido */}
                    <div style={styles.mainInfo}>
                        <section style={styles.section}>
                            <h3 style={styles.sectionTitle}><Package size={20} /> Itens Contratados</h3>
                            {pedido.itens?.map((item) => (
                                <div key={item.id} style={styles.itemRow}>
                                    <div>
                                        <p style={styles.itemName}>{item.nomeProduto}</p>
                                        <p style={styles.itemSub}><Calendar size={14} /> Período de locação ativo</p>
                                    </div>
                                    <span style={styles.itemPrice}>R$ {item.valorCobrado.toFixed(2)}</span>
                                </div>
                            ))}
                        </section>

                        <section style={styles.section}>
                            <h3 style={styles.sectionTitle}><MapPin size={20} /> Dados da Entrega</h3>
                            <div style={styles.infoCard}>
                                <p><strong>Pedido ID:</strong> {pedido.id}</p>
                                <p><strong>Data do Registro:</strong> {new Date(pedido.dataPedido).toLocaleDateString()}</p>
                            </div>
                        </section>
                    </div>

                    {/* Card de Checkout */}
                    <aside style={styles.checkoutSide}>
                        <div style={styles.totalCard}>
                            <h3 style={styles.totalTitle}>Total a Pagar</h3>
                            <div style={styles.totalValue}>R$ {pedido.valorTotal.toFixed(2)}</div>
                            
                            <p style={styles.paymentInfo}>
                                <CreditCard size={16} /> Pagamento via Cartão de Crédito
                            </p>

                            <button onClick={irParaPagamento} style={styles.payBtn}>
                                CONFIRMAR E PAGAR AGORA
                            </button>

                            <div style={styles.securityNote}>
                                <img src="https://stripe.com/img/v3/home/social.png" alt="Stripe" style={styles.stripeLogo} />
                                <p>Ambiente seguro e criptografado</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { backgroundColor: '#fdfcfb', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' },
    wrapper: { maxWidth: '1000px', margin: '0 auto' },
    loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#666' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px', fontWeight: '600' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' },
    title: { fontSize: '28px', color: '#1a1a1a', fontWeight: '800', margin: 0 },
    statusBadge: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' },
    content: { display: 'flex', gap: '30px', flexWrap: 'wrap' },
    mainInfo: { flex: '2 1 500px' },
    section: { backgroundColor: '#fff', borderRadius: '20px', padding: '25px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f1f1' },
    sectionTitle: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', color: '#333', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
    itemRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #fafafa' },
    itemName: { margin: 0, fontWeight: '700', color: '#1a1a1a' },
    itemSub: { margin: '4px 0 0', fontSize: '13px', color: '#999', display: 'flex', alignItems: 'center', gap: '5px' },
    itemPrice: { fontWeight: '700', color: '#f27405', fontSize: '17px' },
    infoCard: { fontSize: '15px', color: '#555', lineHeight: '1.8' },
    checkoutSide: { flex: '1 1 300px' },
    totalCard: { backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '24px', padding: '35px', textAlign: 'center', position: 'sticky', top: '20px' },
    totalTitle: { fontSize: '16px', color: '#999', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' },
    totalValue: { fontSize: '36px', fontWeight: '800', marginBottom: '25px', color: '#fff' },
    paymentInfo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', color: '#ccc', marginBottom: '25px' },
    payBtn: { width: '100%', padding: '20px', backgroundColor: '#f27405', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(242, 116, 5, 0.4)', transition: 'transform 0.2s' },
    securityNote: { marginTop: '25px', opacity: 0.6, fontSize: '11px' },
    stripeLogo: { width: '40px', marginBottom: '5px', filter: 'brightness(0) invert(1)' }
};