import { useState, useCallback } from 'react';
import { avaliacaoService } from '../service/avaliacaoService';

export function useAvaliacao() {
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [media, setMedia] = useState(0);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    const carregarDadosAvaliacao = useCallback(async (idEstoque) => {
        if (!idEstoque) return;
        setLoading(true);
        setErro(null);
        try {
            const [lista, notaMedia] = await Promise.all([
                avaliacaoService.listarPorEstoque(idEstoque),
                avaliacaoService.buscarMedia(idEstoque)
            ]);
            setAvaliacoes(lista.content || []);
            setMedia(notaMedia || 0);
        } catch (e) {
            setErro("Não foi possível carregar as avaliações.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const enviarAvaliacao = useCallback(async (idEstoque, nota, comentario) => {
        setLoading(true);
        try {
            const nova = await avaliacaoService.criar(idEstoque, { nota, comentario });
            setAvaliacoes(prev => [nova, ...prev]);
            return nova;
        } catch (e) {
            setErro("Erro ao enviar sua avaliação.");
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        avaliacoes,
        media,
        loading,
        erro,
        carregarDadosAvaliacao,
        enviarAvaliacao
    };
}

export default useAvaliacao;