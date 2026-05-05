import { useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LayoutDashboard } from 'lucide-react';
import EstoqueGrid from '../components/EstoqueGrid';
import useEstoque from '../hooks/useEstoque';
import Sidebar from '../../../components/Sidebar/Sidebar';


const EstoqueOwnerPage = () => {
    // Pegamos os dados e funções do seu Hook
    const { itens, loading, buscarTodos, excluirEstoque } = useEstoque();

    const handlerExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir todo este estoque?")) {
            const sucesso = await excluirEstoque(id);
            if (sucesso) {
                alert("Estoque excluído com sucesso!");
                buscarTodos(); 
            }
        }
    };

    useEffect(() => {
        buscarTodos();
    }, []);
    // Função para lidar com a edição (pode abrir um modal ou navegar)
    const handleEdit = (item) => {
        console.log("Editando:", item);
        navigate(`/estoque/editar/${item.id}`);
    };

    return (

        <>
        <Sidebar></Sidebar>

        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* CABEÇALHO DA PÁGINA */}
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Painel de Estoque</h1>
                            <p className="text-sm text-gray-600">Gerencie categorias e visualize equipamentos aninhados.</p>
                        </div>
                    </div>

                    {/* Botão de Cadastro (Caso queira navegar para a página de cadastro depois) */}
                    <Link
                        to="/cadastrar-estoque"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md no-underline"
                    >
                        <Plus size={18} />
                        Novo Tipo de Estoque
                    </Link>
                </header>

                {/* GRID DE GESTÃO */}
                <main>
                    <div className="flex items-center justify-between mb-6 border-b pb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Categorias Ativas</h2>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                            {itens?.length || 0} Itens
                        </span>
                    </div>

                    <EstoqueGrid
                        listaEstoque={itens}
                        loading={loading}
                        isManagement={true}
                        onDelete={handlerExcluir}
                        onEdit={handleEdit}
                        linkDestino={(id) => `/exibir-equipamento/${id}`}
                    />
                </main>

                <footer className="mt-20 py-6 border-t text-center text-gray-400 text-xs">
                    <p>Sistema de Gestão Interna - Acesso Restrito ao Proprietário</p>
                </footer>
            </div>
        </div>
        </>
    );
};

export default EstoqueOwnerPage;