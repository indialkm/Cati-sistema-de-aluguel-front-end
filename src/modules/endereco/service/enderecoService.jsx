import api from '../../../services/api';

export const enderecoService = {

    /**
     * POST /users/me/endereco
     * Vincula um novo endereço ao usuário logado (Requer Token)
     */
    salvarEnderecoSessao: async (dados) => {
        const response = await api.post('/users/me/endereco', dados);
        return response.data;
    },

    /**
     * POST /users/anonimo/endereco
     * Salva um endereço sem vínculo com usuário (Fluxo de reserva anônima)
     */
    adicionarEnderecoAnonimo: async (dados) => {
        const response = await api.post('/users/anonimo/endereco', dados);
        return response.data;
    },

    /**
     * GET /users/me/endereco/list
     * Retorna a lista de endereços do usuário autenticado
     */
    listarMeusEnderecos: async () => {
        const response = await api.get('/users/me/endereco/list');
        return response.data; // Retorna List<EnderecoResponse>
    },

    /**
     * PUT /users/meu-perfil
     * Atualiza os dados de perfil do usuário logado
     */
    atualizarPerfil: async (dados) => {
        const response = await api.put('/users/meu-perfil', dados);
        return response.data;
    },


};

export default enderecoService;