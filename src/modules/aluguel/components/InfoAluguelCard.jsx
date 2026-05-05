import React from 'react';

const InfoAluguelCard = ({ aluguel }) => {
    
    const formatarData = (data) => data ? new Date(data).toLocaleDateString('pt-BR') : '---';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cabeçalho do Card com o Nome do Produto */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Detalhes do Item</h3>
                <span className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Cod: {aluguel?.produtoId || 'N/A'}
                </span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Seção do Produto */}
                <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Equipamento</h4>
                    <p className="text-xl font-semibold text-gray-900">{aluguel?.nomeProduto}</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Valor Diária:</span> R$ {aluguel?.valorDiaria?.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Valor Total:</span> R$ {aluguel?.valorTotal?.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Seção do Cliente & Local */}
                <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Logística e Cliente</h4>
                    <p className="text-sm text-gray-800"><span className="font-medium">Responsável:</span> {aluguel?.clienteNome}</p>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase mb-1">Endereço de Montagem</p>
                        <p className="text-sm text-gray-700">
                            {aluguel?.localizacao?.logradouro}, {aluguel?.localizacao?.numero}
                        </p>
                        <p className="text-sm text-gray-700">
                            {aluguel?.localizacao?.bairro} - {aluguel?.localizacao?.cidade}/{aluguel?.localizacao?.uf}
                        </p>
                    </div>
                </div>

                {/* Seção de Prazos */}
                <div className="md:col-span-2 border-t pt-6 flex justify-around text-center">
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Início do Aluguel</p>
                        <p className="text-lg font-bold text-blue-900">{formatarData(aluguel?.reserva?.dataInicial)}</p>
                    </div>
                    <div className="h-10 w-px bg-gray-200"></div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Previsão de Término</p>
                        <p className="text-lg font-bold text-blue-900">{formatarData(aluguel?.reserva?.dataFinal)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoAluguelCard;