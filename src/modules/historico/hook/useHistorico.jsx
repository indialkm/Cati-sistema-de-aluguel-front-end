import { useState, useCallback } from 'react';
import historicoService from '../service/historicoService';
import { useAuth } from '../../../context/AuthContext';

export const useHistorico = () => {
    const { user, hasRole } = useAuth();
    const [dados, setDados] = useState({ content: [], totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const carregarHistorico = useCallback(async (pagina = 0) => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            let resultado;
            if (hasRole('ROLE_OWNER')) {
                resultado = await historicoService.listarTodos(pagina);
            } else {
                resultado = await historicoService.listarMeuHistorico(user.id, pagina);
            }
            setDados(resultado);
        } catch (err) {
            setError("Erro ao carregar o histórico.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user, hasRole]); 

   

    return {
        dados,
        loading,
        error,
        carregarHistorico
    };
};