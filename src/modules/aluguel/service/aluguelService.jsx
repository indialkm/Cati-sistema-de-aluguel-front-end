import api from '../../../services/api';

export const aluguelService = {

    // @GetMapping - Listar todos os aluguéis (OWNER/ADMIN)
    listarTodos: async (page = 0, size = 10) => {
        const response = await api.get(`/alugueis?page=${page}&size=${size}`);
        return response.data;
    },

    // @GetMapping("/{id}") - Buscar um aluguel específico por ID
    buscarPorId: async (idAluguel) => {
        const response = await api.get(`/alugueis/${idAluguel}`);
        return response.data;
    },

    // @GetMapping("/{id}/buscarPorPedido") - Lista aluguéis de um pedido (CLIENT)
    buscarPorPedido: async (idPedido) => {
        const response = await api.get(`/alugueis/${idPedido}/buscarPorPedido`);
        return response.data;
    },

    // --- MUDANÇAS DE STATUS (PATCH) ---

    mudarStatus: async (idAluguel, statusString) => {

        const response = await api.patch(`/alugueis/${idAluguel}/status`, statusString, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return response.data;
    },


    // --- STATUS COM CHECKLIST (PATCH + BODY) ---

    mudarStatusComChecklist: async (idAluguel, dadosChecklist, arquivos, endpoint) => {
        const formData = new FormData();

        formData.append('dados', new Blob([JSON.stringify(dadosChecklist)], {
            type: 'application/json'
        }));

        arquivos.forEach((arquivo) => {
            formData.append('fotos', arquivo);
        });

        const response = await api.patch(`/alugueis/${idAluguel}/${endpoint}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },

    // @PatchMapping("/{idAluguel}/montar")
    atualizarParaMontado: async (idAluguel, checklistRequest) => {
        const response = await api.patch(`/alugueis/${idAluguel}/montar`, checklistRequest);
        return response.data;
    },

    // @PatchMapping("/{idAluguel}/retirar")
    atualizarParaRetirada: async (idAluguel, checklistRequest) => {
        const response = await api.patch(`/alugueis/${idAluguel}/retirar`, checklistRequest);
        return response.data;
    },

    // --- FILTROS E ACOMPANHAMENTO ---

    // @GetMapping("/filtrar") - Filtrar por lista de status (OWNER)
    filtrarAlugueis: async (listaStatus, page = 0, size = 10) => {
        // O Spring espera que múltiplos status sejam passados como status=VALOR1&status=VALOR2
        const params = new URLSearchParams();
        if (listaStatus && listaStatus.length > 0) {
            listaStatus.forEach(s => params.append('status', s));
        }
        params.append('page', page);
        params.append('size', size);

        const response = await api.get(`/alugueis/filtrar?${params.toString()}`);
        return response.data;
    },

    // @GetMapping("/acompanhar/{idAluguel}") - Acompanhamento simplificado (CLIENT)
    acompanharStatus: async (idAluguel) => {
        const response = await api.get(`/alugueis/acompanhar/${idAluguel}`);
        return response.data;
    }


};

export default aluguelService;