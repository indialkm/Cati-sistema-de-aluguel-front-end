import api from '../../../services/api';

export const carrinhoService = {
    adicionarItem: async (itemRequest) => {
        const idCarrinhoExistente = localStorage.getItem('carrinho_id');
        const url = idCarrinhoExistente 
            ? `/carrinho/adicionar?idCarrinho=${idCarrinhoExistente}`
            : '/carrinho/adicionar';

        try {
            const response = await api.post(url, itemRequest);
            const carrinhoSalvo = response.data;
            if (carrinhoSalvo.id) {
                localStorage.setItem('carrinho_id', carrinhoSalvo.id);
            }
            return carrinhoSalvo;
        } catch (error) {
            console.error("Erro no carrinho:", error);
            throw error;
        }
    },

    buscarPorId: async (carrinhoId) => {
      
        const response = await api.get(`/carrinho/${carrinhoId}`);
        return response.data;
    },

    buscarCarrinhoAberto: async () => {
        
        const response = await api.get(`/carrinho/status`);
        return response.data;
    }
};

export default carrinhoService;