import { useState, useCallback } from 'react';
import { userService } from '../services/userService';

export function useUser() {
    const [usuarios, setUsuarios] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    /**
     * Lista todos os usuários (Para o Dashboard do Owner)
     */
    const listarTodosUsuarios = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const data = await userService.listarTodos();
            setUsuarios(data || []);
        } catch (e) {
            setErro("Não foi possível carregar a lista de usuários.");
            console.error("Erro useUser (listarTodos):", e);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Busca os endereços cadastrados do usuário logado
     */
    const listarMeusEnderecos = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const data = await userService.listarMeusEnderecos();
            setEnderecos(data || []);
        } catch (e) {
            setErro("Erro ao carregar seus endereços.");
            console.error("Erro useUser (listarMeusEnderecos):", e);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Adiciona um novo endereço (ex: Estrada Velha Guarulhos São Miguel)
     */
    const cadastrarEndereco = useCallback(async (dadosEndereco) => {
        setLoading(true);
        setErro(null);
        try {
            const novoEndereco = await userService.adicionarEndereco(dadosEndereco);
            // Atualiza a lista local adicionando o novo endereço
            setEnderecos((prev) => [...prev, novoEndereco]);
            return novoEndereco;
        } catch (e) {
            setErro("Falha ao salvar o endereço.");
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Atualiza os dados do perfil (Nome/Senha)
     */
    const atualizarMeuPerfil = useCallback(async (dados) => {
        setLoading(true);
        setErro(null);
        try {
            const atualizado = await userService.atualizarPerfil(dados);
            return atualizado;
        } catch (e) {
            setErro("Erro ao atualizar seus dados.");
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        usuarios,
        enderecos,
        loading,
        erro,
        listarTodosUsuarios,
        listarMeusEnderecos,
        cadastrarEndereco,
        atualizarMeuPerfil
    };
}

export default useUser;