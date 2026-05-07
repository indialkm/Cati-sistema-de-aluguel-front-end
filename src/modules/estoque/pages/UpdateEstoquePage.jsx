import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import EstoqueFormCadastro from '../components/EstoqueFormCadastro';
import useEstoque from '../hooks/useEstoque';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';

const UpdateEstoquePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Pegamos os dados enviados pela página de listagem
    const itemEditando = location.state?.itemEditando;

    // Adicione o método 'editar' (que deve chamar o PATCH no seu hook)
    const { cadastrar, editar, loading } = useEstoque();

    const handleSubmit = async (formData) => {
        let sucesso;

        if (itemEditando) {
            // Se existe itemEditando, chamamos a atualização parcial (PATCH)
            // Passamos o ID e os dados do formulário
            sucesso = await editar(itemEditando.id, formData);
        } else {
            // Se não existe, é um cadastro novo (POST)
            sucesso = await cadastrar(formData);
        }

        if (sucesso) {
            navigate('/estoque-owner');
        }
    };

    return (
        <AdminLayout>
            {/* REPARE: Removi o ml-64 daqui também, pois o AdminLayout 
               que você me mostrou já tem o ml-64 no <main>.
            */}
            <div className="min-h-screen bg-[#F9FAFB]">
                <div className="max-w-7xl mx-auto">
                    
                    <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate(-1)}
                                className="bg-white p-3 rounded-full text-gray-500 hover:text-blue-600 shadow-sm border border-gray-100 transition-all"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                    {itemEditando ? 'Editar Produto' : 'Criar Produto'}
                                </h1>
                                <p className="text-gray-500 text-sm font-medium mt-1">
                                    {itemEditando 
                                        ? `Alterando informações de: ${itemEditando.nome}` 
                                        : 'Preencha os dados abaixo para cadastrar um novo item no estoque'}
                                </p>
                            </div>
                        </div>
                    </header>

                    <main className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-center">
                        <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                                
                                <EstoqueFormCadastro 
                                    onSubmit={handleSubmit} 
                                    isLoading={loading}
                                    itemEditando={itemEditando} // O formulário usará isso para popular os inputs
                                />
                                
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UpdateEstoquePage;