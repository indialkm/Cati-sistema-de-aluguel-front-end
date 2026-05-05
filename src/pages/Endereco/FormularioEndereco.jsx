import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../services/api";

export default function FormularioEndereco() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // idReserva veio da tela anterior (Carrinho/Reserva)
    const { idReserva } = location.state || {};
    const [idEnderecoSalvo, setIdEnderecoSalvo] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        cep: '', logradouro: '', numero: '', complemento: '',
        bairro: '', cidade: '', uf: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // FUNÇÃO PARA SALVAR O ENDEREÇO (LOGADO OU ANÔNIMO)
    const handleSalvarEndereco = async () => {
        setLoading(true);
        try {
            // 1. Verificamos se existe um token (usuário logado)
            const token = localStorage.getItem('token'); 
            
            // 2. Definimos a rota baseada na autenticação
            // Se tiver token, usa a rota 'me'. Se não, usa a rota 'anonimo'
            const endpoint = token ? '/users/me/endereco' : '/users/anonimo/endereco';

            const res = await api.post(endpoint, formData);
            
            // 3. Guardamos o ID do endereço que o banco gerou
            const idGerado = res.data.id;
            setIdEnderecoSalvo(idGerado);

            // 4. Se for anônimo, salvamos no localStorage para o "vínculo" posterior
            if (!token) {
                localStorage.setItem('id_endereco_temporario', idGerado);
            }

            alert("Endereço salvo! Agora você pode finalizar o pedido.");
        } catch (err) {
            console.error("Erro ao processar endereço:", err);
            alert("Erro ao salvar endereço. Verifique o console.");
        } finally {
            setLoading(false);
        }
    };

   // FUNÇÃO PARA ENVIAR PARA O CARRINHO
    const handleIrParaCarrinho = async () => {
        try {
            const payload = {
                idReserva: idReserva,
                idEndereco: idEnderecoSalvo
            };

            // 1. Chamada para o seu endpoint /carrinho que criamos
            const res = await api.post('/carrinho', payload);
            
            // 2. Extraímos o ID do carrinho/pedido que o Back-end acabou de gerar
            const idCarrinhoGerado = res.data.id; 

            // 3. Navegamos para a página de visualização do carrinho
            // Passamos o id no state para que a CartPage possa fazer um GET /carrinho/{id}
            navigate('/carrinho', { 
                state: { 
                    idCarrinho: idCarrinhoGerado,
                    dadosPedido: res.data 
                } 
            });

        } catch (err) {
            console.error("Erro ao finalizar carrinho:", err);
            alert("Erro ao processar o carrinho. Verifique se a reserva ainda é válida.");
        }
    };

    return (
        <div style={styles.container}>
            <h3>Onde entregaremos sua tenda?</h3>
            <div style={styles.form}>
                <input style={styles.input} name="cep" placeholder="CEP" onChange={handleChange} />
                <input style={styles.input} name="logradouro" placeholder="Logradouro" onChange={handleChange} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={styles.input} name="numero" placeholder="Número" onChange={handleChange} />
                    <input style={styles.input} name="complemento" placeholder="Complemento" onChange={handleChange} />
                </div>
                <input style={styles.input} name="bairro" placeholder="Bairro" onChange={handleChange} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={styles.input} name="cidade" placeholder="Cidade" onChange={handleChange} />
                    <input style={{ ...styles.input, width: '70px' }} name="uf" placeholder="UF" onChange={handleChange} maxLength="2" />
                </div>
            </div>

            <button 
                onClick={handleSalvarEndereco} 
                style={{ ...styles.button, backgroundColor: '#4CAF50' }}
                disabled={loading}
            >
                {loading ? "Salvando..." : "1. Confirmar Endereço"}
            </button>

            <button 
                onClick={handleIrParaCarrinho} 
                style={{ ...styles.button, backgroundColor: idEnderecoSalvo ? '#f27405' : '#ccc' }}
                disabled={!idEnderecoSalvo}
            >
                2. Ir para Pagamento
            </button>
        </div>
    );
}

const styles = {
    container: { maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '12px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
    button: { width: '100%', padding: '14px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }
};