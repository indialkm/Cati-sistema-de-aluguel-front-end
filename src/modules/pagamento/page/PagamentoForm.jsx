import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

// Use sua chave pública do Dashboard do Stripe
const stripePromise = loadStripe('pk_test_51TMxxH9E0qFEn7nqfqy6tGddGYmcV4qHTpzqca1vkmrAhB1nfXqo7PHZJ6WKZZm9VxTUZo8IYOlMxokoXLTTQM9P00AwosUFny');

function CheckoutForm({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Para onde o usuário vai após o Stripe processar
                return_url: `${window.location.origin}/sucesso`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("Ocorreu um erro inesperado.");
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} style={styles.form}>
            {/* O PaymentElement renderiza Cartão, Pix, etc. baseado no seu clientSecret */}
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit" style={styles.payButton}>
                <span id="button-text">
                    {isProcessing ? "Processando..." : "Pagar Agora"}
                </span>
            </button>
            {message && <div id="payment-message" style={styles.errorMsg}>{message}</div>}
        </form>
    );
}

export default function PagamentoPage() {
    const location = useLocation();
    // Pegamos o clientSecret que veio do seu controller de transação
    const { clientSecret, valorTotal } = location.state || {};

    if (!clientSecret) return <div>Erro: Sessão de pagamento não encontrada.</div>;

    return (
        <div style={styles.container}>
            <div style={styles.summary}>
                <h3>Resumo do Pagamento</h3>
                <p>Total a pagar: <strong>R$ {valorTotal?.toFixed(2)}</strong></p>
            </div>
            
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} />
            </Elements>
        </div>
    );
}

const styles = {
    container: { maxWidth: '500px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    summary: { marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    payButton: { backgroundColor: '#f27405', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' },
    errorMsg: { color: 'red', marginTop: '10px', fontSize: '14px' }
};