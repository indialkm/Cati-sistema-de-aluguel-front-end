import { useState, useCallback } from 'react';
import { estoqueService } from '../services/estoqueService';

export function useEstoque() {
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const buscarTodos = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await estoqueService.listarTodos();
            setItens(dados.content || (Array.isArray(dados) ? dados : []));
        } catch (e) {
            setErro("Erro ao carregar o estoque.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);


    const buscarEstoqueFiltrado = useCallback(async (filtros) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await estoqueService.buscarComFiltros(filtros);
            setItens(dados && Array.isArray(dados) ? dados : []);
        } catch (err) {
            setItens([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const cadastrar = async (formData) => {
        setLoading(true);
        setErro(null);
        try {
            await estoqueService.cadastrar(formData);
            await buscarTodos();
            return true;
        } catch (e) {
            console.error("Erro no cadastro:", e);
            setErro(e.response?.data?.message || "Erro ao cadastrar.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const atualizarParcial = async (id) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await estoqueService.atualizarParcial(id);
            setItemSelecionadodo(dados);
        } catch (e) {
            setErro("Não foi possível atualizar dados")
        } finally {
            setLoading(false)
        }

    };

    const obterDetalhes = async (id) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await estoqueService.obterDetalhes(id);
            setItemSelecionado(dados);
        } catch (e) {
            setErro("Detalhes não encontrados.");
        } finally {
            setLoading(false);
        }
    };

    const equipamentosPorEstoque = async (id, pagina = 0) => {
        setLoading(true);
        setErro(null);
        try {

            const response = await estoqueService.pesquisarPorEstoque(id, pagina);
            setItens(response.content);

        } catch (e) {
            setErro("Não foi possível carregar os equipamentos deste estoque.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const excluirEstoque = async (id) => {
        setLoading(true);
        setErro(null);
        try {

            const response = await estoqueService.excluir(id);
            setItens(response.content);

        } catch (e) {
            setErro("Não foi possível carregar os equipamentos deste estoque.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        itens,
        itemSelecionado,
        loading,
        erro,
        excluirEstoque,
        buscarEstoqueFiltrado,
        equipamentosPorEstoque,
        buscarTodos,
        cadastrar,
        obterDetalhes
    };
}

export default useEstoque;