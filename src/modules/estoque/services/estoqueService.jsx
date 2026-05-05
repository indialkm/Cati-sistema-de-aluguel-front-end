import api from '../../../services/api';

export const estoqueService = {
    // @GetMapping (Vitrine aberta)
    listarTodos: async (page = 0, size = 10) => {
        const response = await api.get(`/estoque?page=${page}&size=${size}`);
        return response.data; // Retorna o objeto Page completo (com content, totalPages, etc)
    },

    // @PostMapping (Privado para OWNER)
    cadastrar: async (dados) => {
        const response = await api.post('/estoque', dados);
        return response.data;
    },

    // @GetMapping("/detalhes/{id}")
    obterDetalhes: async (id) => {
        const response = await api.get(`/estoque/detalhes/${id}`);
        return response.data;
    },

    // @GetMapping("/visualizar") (Privado para OWNER)
    visualizarPainelAdm: async (page = 0, size = 10) => {
        const response = await api.get(`/estoque/visualizar?page=${page}&size=${size}`);
        return response.data;
    },

    // @GetMapping("/categoria")
    filtrarPorCategoria: async (nome, page = 0, size = 10) => {
        const response = await api.get(`/estoque/categoria?nome=${nome}&page=${page}&size=${size}`);
        return response.data;
    },


    equipamentosPorEstoque: async (idEstoque, page = 0, size = 10) => {
        const response = await api.get(`/estoques/${idEstoque}/equipamentos`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    },

    // Delete /estoque/${idEstoque}
    excluir: async (idEstoque) => {
       const response = await api.delete(`/estoque/${idEstoque}`); 
       return response.data;
    }
}