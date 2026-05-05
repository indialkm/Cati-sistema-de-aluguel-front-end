import { useState, useCallback } from 'react';
import { pedidoService } from '../services/pedidoService';

export function usePedido() {
    const [pedidos, setPedidos] = useState([]); // Armazena a lista (content)
    const [paginacao, setPaginacao] = useState(null); // Armazena metadados (totalElements, totalPages)
    const [pedidoAtual, setPedidoAtual] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    /**
     * Busca os pedidos do usuário logado (Perfil: CLIENT)
     * @param {number} page - Número da página
     * @param {number} size - Quantidade de itens
     */
    const listarMeusPedidos = useCallback(async (page = 0, size = 10) => {
        setLoading(true);
        setErro(null);
        try {
            const data = await pedidoService.buscarMeusPedidos(page, size);
            // No Spring Data, os dados reais ficam dentro de 'content'
            setPedidos(data.content || []);
            // Guardamos o resto para lógica de paginação na tela
            setPaginacao({
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                number: data.number,
                last: data.last
            });
        } catch (e) {
            setErro("Não foi possível carregar seu histórico de aluguéis.");
            console.error("Erro usePedido (listarMeus):", e);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Busca um pedido detalhado por ID
     */
    const buscarPedidoPorId = useCallback(async (id) => {
        setLoading(true);
        setErro(null);
        try {
            const data = await pedidoService.buscarPorId(id);
            setPedidoAtual(data);
            return data;
        } catch (e) {
            const msg = e.response?.status === 403 
                ? "Você não tem permissão para visualizar este pedido." 
                : "Erro ao buscar detalhes do pedido.";
            setErro(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const carregarPedidos = useCallback(async (status, pagina = 0) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await pedidoService.buscarPorStatus(status, pagina);
            setPedidos(dados.content || []);
            setPaginacao({
                totalPages: dados.totalPages,
                totalElements: dados.totalElements,
                number: dados.number
            });
        } catch (err) {
            setErro("Erro ao carregar pedidos.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        pedidos,
        pedidoAtual,
        paginacao,
        loading,
        erro,
        carregarPedidos,
        listarMeusPedidos,
        buscarPedidoPorId
    };
}

export default usePedido;