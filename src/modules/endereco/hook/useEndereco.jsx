import { useState, useCallback } from 'react';
import  enderecoService  from '../service/enderecoService';

export function useEndereco() {
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    // GET /users/me/endereco/list
    const listarMeusEnderecos = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const dados = await enderecoService.listarMeusEnderecos();
            setEnderecos(dados || []);
        } catch (e) {
            setErro("Erro ao carregar seus endereços.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // POST /users/me/endereco
    const adicionarLogado = async (dados) => {
        setLoading(true);
        setErro(null);
        try {
            const novoEndereco = await enderecoService.salvarEnderecoSessao(dados);
            setEnderecos(prev => [...prev, novoEndereco]);
            return novoEndereco;
        } catch (e) {
            setErro(e.response?.data?.message || "Erro ao salvar endereço.");
            console.error(e);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // POST /users/anonimo/endereco
    const adicionarAnonimo = async (dados) => {
        setLoading(true);
        setErro(null);
        try {
            const endereco = await enderecoService.adicionarEnderecoAnonimo(dados);
            return endereco;
        } catch (e) {
            setErro("Erro ao salvar endereço temporário.");
            console.error(e);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // PUT /users/meu-perfil
    const atualizarPerfil = async (dados) => {
        setLoading(true);
        setErro(null);
        try {
            const perfilAtualizado = await enderecoService.atualizarPerfil(dados);
            return perfilAtualizado;
        } catch (e) {
            setErro("Erro ao atualizar dados do perfil.");
            console.error(e);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        enderecos,
        loading,
        erro,
        listarMeusEnderecos,
        adicionarLogado,
        adicionarAnonimo,
        atualizarPerfil
    };
}

export default useEndereco;