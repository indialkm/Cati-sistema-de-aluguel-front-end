import { useState, useCallback } from 'react';
import { carrinhoService } from '../service/carrinhoService';

export function useCarrinho() {
    const [carrinho, setCarrinho] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    
    const adicionarAoCarrinho = async (itemRequest) => {
        setLoading(true);
        setErro(null);
        try {
            const novoCarrinho = await carrinhoService.adicionarItem(itemRequest);
            setCarrinho(novoCarrinho);
            return novoCarrinho; 
        } catch (e) {
            const mensagemErro = e.response?.data?.message || "Erro ao adicionar item ao carrinho.";
            setErro(mensagemErro);
            console.error("Erro useCarrinho (adicionar):", e);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const buscarCarrinho = useCallback(async (id) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await carrinhoService.buscarPorId(id);
            setCarrinho(dados);
            return dados;
        } catch (e) {
            setErro("Não foi possível encontrar este carrinho.");
            console.error("Erro useCarrinho (buscar):", e);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarCarrinhoAtivo = useCallback(async() => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await carrinhoService.buscarCarrinhoAberto();
            setCarrinho(dados);
            return dados;
        } catch (e) {
            setErro("Não foi possível encontrar este carrinho.");
            console.error("Erro useCarrinho (buscar):", e);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        carrinho,
        loading,
        erro,
        buscarCarrinhoAtivo,
        adicionarAoCarrinho,
        buscarCarrinho
    };
}

export default useCarrinho;