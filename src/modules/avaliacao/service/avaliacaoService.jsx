import api from '../../../services/api';

export const avaliacaoService = {
  // @PostMapping("/estoque/{idEstoque}")
  criar: async (idEstoque, dadosAvaliacao) => {
    try {
      const response = await api.post(`/avaliacoes/estoque/${idEstoque}`, dadosAvaliacao);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
      throw error;
    }
  },

  // @GetMapping("/estoque/{idEstoque}")
  listarPorEstoque: async (idEstoque, page = 0, size = 5) => {
    try {
      const response = await api.get(`/avaliacoes/estoque/${idEstoque}`, {
        params: { page, size }
      });
      return response.data; // Retorna o Page do Spring
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      throw error;
    }
  },

  // @GetMapping("/estoque/{idEstoque}/media")
  buscarMedia: async (idEstoque) => {
    try {
      const response = await api.get(`/avaliacoes/estoque/${idEstoque}/media`);
      return response.data; // Retorna o Double (ex: 4.5)
    } catch (error) {
      console.error("Erro ao buscar média:", error);
      throw error;
    }
  },

  // @DeleteMapping("/{id}")
  excluir: async (idAvaliacao) => {
    try {
      await api.delete(`/avaliacoes/${idAvaliacao}`);
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
      throw error;
    }
  }
};