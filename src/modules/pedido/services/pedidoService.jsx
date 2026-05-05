import api from '../../../services/api';

export const pedidoService = {

  buscarTodos: async (page = 0, size = 10) => {
    try {
      const response = await api.get('/pedido', {
        params: { page, size }
      });
      return response.data; // Retorna o objeto Page (content, totalElements, etc.)
    } catch (error) {
      console.error("Erro ao buscar todos os pedidos:", error);
      throw error;
    }
  },


  buscarPorId: async (idPedido) => {
    try {
      const response = await api.get(`/pedido/${idPedido}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar pedido ${idPedido}:`, error);
      throw error;
    }
  },


  buscarMeusPedidos: async (page = 0, size = 10) => {
    try {
      const response = await api.get('/pedido/buscarAluguel', {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pedidos do usuário:", error);
      throw error;
    }
  },


  // Busca pedidos filtrados por status com paginação
  buscarPorStatus: async (status, pagina = 0, tamanho = 10) => {
    try {
      const params = {
        page: pagina,
        size: tamanho
      };

      // Só adiciona o status se ele não for nulo/vazio
      if (status) {
        params.status = status;
      }

      const response = await api.get('/pedido/status', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};



export default pedidoService;