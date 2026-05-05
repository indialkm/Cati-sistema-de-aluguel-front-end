import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from "../../../services/api";
import Navbar from '../../../components/Navbar/Navbar';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'; // Sugestão de ícones

export default function SucessoPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processando'); // processando, sucesso, erro
    const [mensagem, setMensagem] = useState("Estamos confirmando seu pagamento com o Stripe...");
    
    // useRef evita que a chamada ao backend seja feita duas vezes por causa do StrictMode do React
    const requisicaoFeita = useRef(false);

    const stripeId = searchParams.get('payment_intent');
    const statusStripe = searchParams.get('redirect_status');

    useEffect(() => {
        // Só dispara se tiver os dados do Stripe e se ainda não disparou nesta sessão
        if (stripeId && statusStripe === 'succeeded' && !requisicaoFeita.current) {
            requisicaoFeita.current = true;

            api.post(`/transacao/confirmar/${stripeId}`)
                .then(res => {
                    setStatus('sucesso');
                    setMensagem("Tudo certo! Seu pagamento foi validado e seus aluguéis já estão ativos.");
                    console.log("Resposta do servidor:", res.data);
                })
                .catch(err => {
                    setStatus('erro');
                    // Tenta pegar a mensagem de erro que você configurou no seu ResponseEntity.body()
                    const erroMsg = err.response?.data || "Erro ao processar aluguel no servidor.";
                    setMensagem(erroMsg);
                    console.error("Erro na confirmação:", err);
                });
        } else if (statusStripe !== 'succeeded') {
            setStatus('erro');
            setMensagem("O Stripe não confirmou o sucesso do pagamento.");
        }
    }, [stripeId, statusStripe]);

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    {status === 'processando' && (
                        <>
                            <Loader2 style={styles.iconSpin} size={64} color="#f27405" />
                            <h1 style={styles.title}>Processando...</h1>
                        </>
                    )}

                    {status === 'sucesso' && (
                        <>
                            <CheckCircle size={64} color="#22c55e" />
                            <h1 style={{...styles.title, color: '#166534'}}>Pagamento Aprovado!</h1>
                        </>
                    )}

                    {status === 'erro' && (
                        <>
                            <XCircle size={64} color="#ef4444" />
                            <h1 style={{...styles.title, color: '#991b1b'}}>Ops! Algo deu errado</h1>
                        </>
                    )}

                    <p style={styles.text}>{mensagem}</p>
                    
                    {stripeId && (
                        <p style={styles.subtext}>
                            <strong>ID da Transação:</strong> {stripeId}
                        </p>
                    )}

                    <button 
                        onClick={() => navigate('/perfil')} // Ou para onde ficam os aluguéis dele
                        style={styles.button}
                    >
                        {status === 'sucesso' ? "Ver Meus Aluguéis" : "Voltar ao Início"}
                    </button>
                </div>
            </div>
        </>
    );
}

const styles = {
    container: { 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        minHeight: '80vh', backgroundColor: '#fdfcfb', padding: '20px' 
    },
    card: { 
        maxWidth: '500px', width: '100%', backgroundColor: '#fff', 
        padding: '40px', borderRadius: '24px', textAlign: 'center',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f1f1'
    },
    title: { fontSize: '24px', fontWeight: '800', margin: '20px 0 10px', color: '#1a1a1a' },
    text: { color: '#666', lineHeight: '1.6', marginBottom: '20px' },
    subtext: { fontSize: '12px', color: '#999', marginBottom: '30px', wordBreak: 'break-all' },
    button: { 
        backgroundColor: '#1a1a1a', color: '#fff', border: 'none', 
        padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', 
        cursor: 'pointer', transition: '0.2s' 
    },
    iconSpin: { animation: 'spin 2s linear infinite' },
};

// Adicione isso no seu CSS global para o ícone de carregamento girar
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }