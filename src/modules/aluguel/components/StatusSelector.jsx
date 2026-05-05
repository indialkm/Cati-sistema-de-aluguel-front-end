import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react'; // Sugestão: use lucide-react para ícones

const StatusSelector = ({ statusAtual, onStatusChange, loading }) => {
    
    const STATUS_CONFIG = {
        'EM_MONTAGEM': { label: 'Iniciar Montagem', acao: 'MONTAGEM', cor: 'bg-[#f27405]' },
        'CONFERENCIA': { label: 'Confirmar Entrega', acao: 'CONFERENCIA', cor: 'bg-[#007bff]' },
        'AVARIADO':    { label: 'Relatar Avaria', acao: 'AVARIADO', cor: 'bg-[#dc3545]' },
        'FINALIZADO':  { label: 'Finalizar Aluguel', acao: 'FINALIZADO', cor: 'bg-[#28a745]' }
    };

    const botoesAcao = Object.entries(STATUS_CONFIG).map(([valor, config]) => ({
        valor,
        ...config
    }));

    const handleMudarStatus = async (novoStatus) => {
    const sucesso = await alterarStatus(id, novoStatus);

    if (sucesso) {
        alert("Status atualizado com sucesso!");
        obterPorId(id); 
    }
};

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Gerenciar Fluxo</h3>
                {loading && <Loader2 className="animate-spin text-blue-500 w-5 h-5" />}
            </div>

            <div className="flex flex-col gap-4">
                {botoesAcao.map((item) => {
                    const isSelected = statusAtual === item.valor;
                    
                    return (
                        <button
                            key={item.valor}
                            disabled={loading || isSelected}
                            onClick={() => onStatusChange(item.acao)}
                            className={`
                                relative flex items-center justify-center p-4 rounded-xl font-bold text-white 
                                transition-all duration-200 transform
                                ${item.cor}
                                ${isSelected 
                                    ? 'ring-4 ring-offset-2 ring-gray-200 opacity-60 cursor-default' 
                                    : 'hover:scale-[1.02] hover:brightness-110 active:scale-95 shadow-lg cursor-pointer'}
                                ${loading ? 'opacity-50 pointer-events-none' : ''}
                            `}
                        >
                            {isSelected && <CheckCircle2 className="absolute left-4 w-5 h-5" />}
                            
                            <span className={isSelected ? 'ml-6' : ''}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 text-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Status do Sistema
                </span>
                <div className="mt-1 py-1 px-3 bg-gray-100 rounded-full inline-block">
                    <span className="text-sm font-black text-gray-700">
                        {statusAtual?.replace('_', ' ') || 'NÃO DEFINIDO'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatusSelector;