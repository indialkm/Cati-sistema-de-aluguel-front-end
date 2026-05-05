import api from '../../../services/api'

export const equipamentoService = {

    cadastrarEquipamento: async (idEstoque, dados) => {
        const response = await api.post(`/equipamentos/estoque/${idEstoque}`, dados);
        return response.data;
    },

    // PATCH /equipamentos/status-manutencao/{id}
    alternarManutencao: async (id) => {
        const response = await api.patch(`/equipamentos/status-manutencao/${id}`);
        return response.data;
    },

    // GET /equipamentos (com paginação)
    listarTodos: async (page = 0, size = 10) => {
        const response = await api.get(`/equipamentos?page=${page}&size=${size}`);
        return response.data; // Retorna o objeto Page do Spring
    },

    // GET /equipamentos/pesquisar?nome=...
    pesquisarPorNome: async (nome, page = 0, size = 10) => {
        const response = await api.get(`/equipamentos/pesquisar?nome=${nome}&page=${page}&size=${size}`);
        return response.data;
    },

    //GET /equipamentos/estoque/{idEstoque}/equipamentos
    pesquisarPorEstoque: async (idEstoque, page = 0, size = 10) => {
        const response = await api.get(`/equipamentos/estoque/${idEstoque}/equipamentos`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    },

    //Delete /equipamentos/{idEquipamento}
    deleteEquipamento: async (idEquipamento) => {
        const response = await api.delete(`/equipamentos/${idEquipamento}`);
        return response.data;
    }
};

export default equipamentoService;