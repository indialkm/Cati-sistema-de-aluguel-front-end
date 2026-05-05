// src/modules/estoque/pages/CadastroEstoquePage.jsx
import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import EstoqueFormCadastro from '../components/EstoqueFormCadastro';
import useEstoque from '../hooks/useEstoque';
import Sidebar from '../../../components/Sidebar/Sidebar';

const CadastroEstoquePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Opcional: Se sua rota passar o item editando via state
    const itemEditando = location.state?.itemEditando;

    const { cadastrar, loading, erro } = useEstoque();

    const handleSubmit = async (formData) => {
        const sucesso = await cadastrar(formData);
        if (sucesso) {
            // Volta para a listagem
            navigate('/estoque-owner');
        }
    };

    return (
        <>
            <Sidebar />
            
            {/* Margem esquerda para o Sidebar fixo (ml-64) */}
            <div className="ml-64 min-h-screen bg-[#F9FAFB] p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* CABEÇALHO CLEAN */}
                    <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate(-1)}
                                className="bg-white p-3 rounded-full text-gray-500 hover:text-blue-600 shadow-sm border border-gray-100 hover:border-blue-100 transition-all"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                    {itemEditando ? 'Editar Produto' : 'Criar Produto'}
                                </h1>
                                <p className="text-gray-500 text-sm font-medium mt-1">Preencha os dados abaixo para cadastrar um novo item no estoque</p>
                            </div>
                        </div>
                    </header>

                    {/* ÁREA CENTRALIZADA DO FORMULÁRIO (Foco & Responsividade) */}
                    <main className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-center">
                        
                        {/* Container do Formulário (md:col-span-10 para centralizar mais em telas médias, md:col-start-2) */}
                        <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                                
                                <EstoqueFormCadastro 
                                    onSubmit={handleSubmit} 
                                    isLoading={loading}
                                    itemEditando={itemEditando}
                                />
                                
                            </div>
                        </div>
                    </main>

                    <footer className="mt-20 py-8 border-t border-gray-100 text-center">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                            Painel Administrativo • TCC 2026
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default CadastroEstoquePage;