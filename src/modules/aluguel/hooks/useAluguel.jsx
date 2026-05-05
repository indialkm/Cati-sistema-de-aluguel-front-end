import { useState, useCallback } from 'react';
import aluguelService from '../service/aluguelService';
import api from '../../../services/api'; // Certifique-se de importar sua instância do axios

export function useAluguel() {
    const [alugueis, setAlugueis] = useState([]);
    const [aluguelSelecionado, setAluguelSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [paginacao, setPaginacao] = useState({ totalPages: 0, totalElements: 0 });
    const [sucesso, setSucesso] = useState(false);

   
    const buscarTodos = useCallback(async (pagina = 0, tamanho = 10) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await aluguelService.listarTodos(pagina, tamanho);
            setAlugueis(dados.content || []);
            setPaginacao({
                totalPages: dados.totalPages,
                totalElements: dados.totalElements
            });
        } catch (e) {
            setErro("Erro ao carregar a lista de aluguéis.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

  
    const obterPorId = useCallback(async (id) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await aluguelService.buscarPorId(id);
            console.log("DADOS QUE CHEGARAM DO JAVA:", dados);
            if (dados == null) {
                console.log("sem dados")
            }
            setAluguelSelecionado(dados);
            return dados;
        } catch (e) {
            setErro("Aluguel não encontrado.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // 3. Busca aluguéis vinculados a um pedido (Visão Cliente)
    const buscarPorPedido = useCallback(async (idPedido) => {
        setLoading(true);
        try {
            const response = await api.get(`/alugueis/pedido/${idPedido}`);
            // Verifique se o seu Java retorna a lista direto ou dentro de um 'content'
            const lista = response.data.content || response.data;
            setAlugueis(Array.isArray(lista) ? lista : []);
        } catch (err) {
            setErro("Erro ao buscar aluguéis");
        } finally {
            setLoading(false);
        }
    }, []);

    const alterarStatus = async (id, novoStatus) => {
        setLoading(true);
        setErro(null);
        try {
            console.log(novoStatus);
            const dados = await aluguelService.mudarStatus(id, novoStatus);

            setAluguelSelecionado(dados);
            return true;
        } catch (e) {
            console.error("Erro na transição de status:", e);
            setErro("Erro ao atualizar status do aluguel.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 5. Atualização de status com Checklist
    const atualizarComChecklist = async (id, dadosChecklist, tipo) => {
        setLoading(true);
        setErro(null);
        try {
            if (tipo === 'montar') {
                await aluguelService.atualizarParaMontado(id, dadosChecklist);
            } else {
                await aluguelService.atualizarParaRetirada(id, dadosChecklist);
            }
            return true;
        } catch (e) {
            setErro(e.response?.data || "Erro ao processar checklist.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 6. Filtragem avançada para o Admin
    const filtrarPorStatus = async (listaStatus, pagina = 0) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await aluguelService.filtrarAlugueis(listaStatus, pagina);
            setAlugueis(dados.content || []);
            setPaginacao({
                totalPages: dados.totalPages,
                totalElements: dados.totalElements
            });
        } catch (e) {
            setErro("Erro ao filtrar aluguéis.");
        } finally {
            setLoading(false);
        }
    };

    /************************************ */

    const processarChecklist = async (idAluguel, dadosChecklist, arquivos, acao) => {
        setLoading(true);
        setErro(null);
        setSucesso(false);

        try {
            
            const resultado = await aluguelService.mudarStatusComChecklist(
                idAluguel, 
                dadosChecklist, 
                arquivos, 
                acao
            );
            
            setSucesso(true);
            return resultado;
        } catch (err) {
            
            const mensagem = err.response?.data?.message || "Erro ao processar checklist.";
            setErro(mensagem);
            throw err; 
        } finally {
            setLoading(false);
        }
    };


    // APENAS UM RETURN NO FINAL DA FUNÇÃO
    return {
        alugueis,
        aluguelSelecionado,
        loading,
        erro,
        paginacao,
        buscarTodos,
        processarChecklist,
        obterPorId,
        buscarPorPedido,
        alterarStatus,
        atualizarComChecklist,
        filtrarPorStatus
    };
} // FECHAMENTO DA FUNÇÃO useAluguel

export default useAluguel;