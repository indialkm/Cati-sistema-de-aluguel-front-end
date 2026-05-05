import api from '../../../services/api'; 

const historicoService = {

  listarTodos: async (pagina = 0, tamanho = 10) => {
    try {
      const response = await api.get('/historicos/admin/todos', {
        params: {
          page: pagina,
          size: tamanho,
          sort: 'dataEvento,desc' 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar histórico administrativo:", error);
      throw error;
    }
  },


  listarMeuHistorico: async (usuarioId, pagina = 0, tamanho = 10) => {
    try {
      const response = await api.get(`/historicos/meu-historico/${usuarioId}`, {
        params: {
          page: pagina,
          size: tamanho,
          sort: 'dataEvento,desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar histórico do cliente:", error);
      throw error;
    }
  }
};

export default historicoService;