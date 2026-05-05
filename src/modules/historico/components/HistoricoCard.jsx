import React from 'react';

const HistoricoCard = ({ historico, isAdmin }) => {
    const { 
        dataEvento, 
        descricao, 
        status, 
        pedidoId, 
        user, 
        pagamento
    } = historico;

    const valor = pagamento.valorPago;

    // Formatação de Data
    const formatarData = (dataArray) => {
        try {
            const data = new Date(dataArray);
            return data.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "Data inválida";
        }
    };

    
    const getStatusStyles = (status) => {
        const s = status?.toLowerCase() || 'pendente';
        const config = {
            pago: "border-green-500 bg-green-100 text-green-700",
            pendente: "border-yellow-500 bg-yellow-100 text-yellow-700",
            cancelado: "border-red-500 bg-red-100 text-red-700",
            default: "border-gray-300 bg-gray-100 text-gray-700"
        };
        return config[s] || config.default;
    };

    const statusStyle = getStatusStyles(status);

    return (
        <div className={`mb-4 p-5 rounded-xl border-l-8 shadow-md bg-white ${statusStyle.split(' ')[0]}`}>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">
                    {formatarData(dataEvento)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyle}`}>
                    {status || 'Pendente'}
                </span>
            </div>

            <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#001B44] leading-tight">
                    {descricao}
                </h4>
                
                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        <span className="font-bold">Pedido ID:</span> 
                        <span className="font-mono ml-1">
                            {pedidoId ? `${pedidoId.substring(0, 40)}` : 'N/A'}
                        </span>
                    </p>
                    
                    {isAdmin && user && (
                        <p><span className="font-bold">Cliente:</span> {user.nome}</p>
                    )}

            
                    {pagamento && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-[#001B44]">
                                <span className="font-bold">Valor:</span> 
                                {` R$ ${(pagamento.valorPago ?? 0).toFixed(2)}`}
                                <span className="ml-2 italic text-gray-400">
                                    ({pagamento.formaPagamento || 'Não informado'})
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-5 flex justify-end">
                <button 
                    onClick={() => window.location.href = `/pedidos/${pedidoId}`}
                    className="text-sm font-bold text-[#001B44] hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                    Ver Detalhes do Pedido →
                </button>
            </div>
        </div>
    );
};

export default HistoricoCard;