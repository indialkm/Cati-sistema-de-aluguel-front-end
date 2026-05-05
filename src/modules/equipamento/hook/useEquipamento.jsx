import { useState, useCallback } from 'react';
import { equipamentoService } from '../service/equipamentoService';

export function useEquipamento() {
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const listarTodos = useCallback(async (page = 0) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await equipamentoService.listarTodos({ page });
            setItens(dados.content || []);
        } catch (e) {
            setErro("Erro ao carregar equipamentos.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const listarPorEstoque = useCallback(async (idEstoque, page = 0) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await equipamentoService.pesquisarPorEstoque(idEstoque, { page });
            setItens(dados.content || []);
        } catch (e) {
            setErro("Erro ao carregar equipamentos do estoque.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const pesquisarPorNome = useCallback(async (nome, page = 0) => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await equipamentoService.pesquisarPorNome(nome, { page });
            setItens(dados.content || []);
        } catch (e) {
            setErro("Erro na busca por nome.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const cadastrar = async (idEstoque, dados) => {
        setLoading(true);
        setErro(null);
        try {
            await equipamentoService.cadastrarEquipamento(idEstoque, dados);
            return true;
        } catch (e) {
            setErro(e.response?.data?.message || "Erro ao cadastrar equipamento.");
            console.error(e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deletar = async (id) => {
        setLoading(true);
        setErro(null);
        try {
            await equipamentoService.deleteEquipamento(id);
            return true;
        } catch (e) {
            setErro("Erro ao deletar equipamento.");
            console.error(e);
            return false;
        } finally {
            setLoading(false);
        }
    };


    const alternarManutencao = async (id) => {
        setLoading(true);
        setErro(null);
        try {
            await equipamentoService.alternarManutencao(id);
            return true;
        } catch (e) {
            setErro("Erro ao alterar status de manutenção.");
            console.error(e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        itens,
        itemSelecionado,
        loading,
        erro,
        deletar,
        listarTodos,
        listarPorEstoque,
        pesquisarPorNome,
        cadastrar,
        alternarManutencao
    };
}

export default useEquipamento;